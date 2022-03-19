import * as React from 'react';
import {Box, IconButton} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import {visuallyHidden} from '@mui/utils';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TableRowAds from '../Ads/TableRowAds';
import FilterListIcon from '@mui/icons-material/FilterList';
import CircularProgress from "@mui/material/CircularProgress";


function createData(_id, preview, title, dimensions, type, updated, by, status, icon , location ) {
    return {
        _id,
        preview,
        title,
        dimensions,
        type,
        updated,
        by,
        status,
        icon,
        location,
    };
}

const icon = <IconButton ><MoreVertIcon/></IconButton>

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => - descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: "preview",
        numeric: false,
        disablePadding: false,
        label: "Preview"
    },
    {
        id: "title",
        numeric: false,
        disablePadding: true,
        label: "title"
    },{
        id: "type",
        numeric: true,
        disablePadding: false,
        label: "Type"
    }, {
        id: "updated",
        numeric: true,
        disablePadding: false,
        label: "Updated"
    }, {
        id: "status",
        numeric: true,
        disablePadding: false,
        label: "Status"
    }, {
        id: "icon",
        numeric: true,
        disablePadding: false,
        label: (<FilterListIcon color="palette.grey.a700" sx={{mr: 1}} disabled/>)
    }
];


function EnhancedTableHead(props) {
    const {order, orderBy} = props;
    // const createSortHandler = (property) => (event) => {
    //     onRequestSort(event, property);
    // };

    return (
        <TableHead>
            <TableRow> {
                headCells.map((headCell) => (
                    <TableCell key={
                            headCell.id
                        }
                        align={
                            headCell.numeric ? 'right' : 'left'
                        }
                        padding={
                            headCell.disablePadding ? 'none' : 'normal'
                        }
                        sortDirection={
                            orderBy === headCell.id ? order : false
                        }
                            >
                        <TableSortLabel active={
                                orderBy === headCell.id
                            }
                            direction={
                                orderBy === headCell.id ? order : 'asc'
                        }>
                            {
                            headCell.label
                        }
                            {
                            orderBy === headCell.id ? (
                                <Box component="span"
                                    sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'} 
                                </Box>
                            ) : null
                        } </TableSortLabel>
                    </TableCell>
                ))
            } </TableRow>
        </TableHead>
    );
}

export default function TableAdverti({
    post,
    setRefetch,
    setMessage,
    setAlert,
    setcheckMessage
}) {

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    // const [auth, setAuth] = React.useState(true);

    React.useEffect(() => {
        if (post.length !== 0) {
            let rows = [];
            // console.log(post, "console post");
            post.forEach((element) => {
                let allRow = createData(
                    element ?. _id, 
                    element ?. imageSrc, 
                    element ?. title !== "" ?
                    element.title : element.imagetitle, 
                    "900x473", 'PNG', 
                    element ?. createdAt, 
                    'User',
                    element ?. status,
                    icon,
                    element?.location,
                );
                rows.push(allRow);
                setRows([... rows]);

            });
            setLoading(false)
        } else {
            setRows([]);
        }

    }, [post]);



    if (loading) {
        return (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <CircularProgress />
            </Box>
        )
    }



    return (
        <Box sx={
            {width: '100%'}
        }>
            <Paper 
                sx={{
                    width: '100%',
                    borderRadius: 5
                }}
                >
                <TableContainer>
                    <Table
                        aria-labelledby="tableTitle"
                        size='medium'>
                        <EnhancedTableHead // numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            rowCount={
                                rows.length
                            }/>
                        <TableBody> {
                            stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                return (
                                    <TableRowAds 
                                        row={row}
                                        setRefetch={setRefetch}
                                        setMessage={setMessage}
                                        setAlert={setAlert}
                                        setcheckMessage={setcheckMessage}
                                    />
                                );
                            })
                        }
                            {
                            emptyRows > 0 && (
                                <TableRow 
                                    style={{ height: 53 * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )
                        } </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination rowsPerPageOptions={
                        [5, 10, 25, 100]
                    }
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}/>
            </Paper>
        </Box>
    );
}
