import * as React from 'react';
import {Box, IconButton, ImageList, ImageListItem, ImageListItemBar} from '@mui/material';
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
import CircularProgress from "@mui/material/CircularProgress";
import TableRowMedia from './TableRowMedia'
import { ref, listAll , getDownloadURL } from "firebase/storage";
import {storage} from "../../firebase"

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
        id: "icon",
        numeric: true,
        disablePadding: false,
        label: ""
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
                    }>
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
                                    {
                                    order === 'desc' ? 'sorted descending' : 'sorted ascending'
                                } </Box>
                            ) : null
                        } </TableSortLabel>
                    </TableCell>
                ))
            } </TableRow>
        </TableHead>
    );
}

export default function TableMedia({ loading, setLoading, setAlert, setMessage, setcheckMessage }) {

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows,setRows] = React.useState([])

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


    // Firebase Data 
    // Create a reference under which you want to list
    const listRef = ref(storage, 'files');   
    // Find all the prefixes and items.
    React.useEffect( () => {
        let rows = [];
        listAll(listRef)
        .then((res) => {           
            res.items.forEach((itemRef) => {
            
            //Get Name from File
                let pathName = itemRef?._location?.path_ ;
                let ImageName = pathName.split('files/')[1];
            // All the items under listRef.   
                getDownloadURL(itemRef)
                .then((url) => {
                    // Insert url into an <img> tag to "download"                        
                    let allrows = {                                               
                        preview : url ,
                        title : ImageName,
                        dimensions : "12x215",
                        updated : "",
                        by :"Ratana",
                        status: "" ,
                        icon : "" , 
                        imageType : "" ,
                        path: pathName,
                    }                
                    rows.push(allrows);
                    setRows([...rows])
                    // console.log(url)
                })
                setLoading(false)
            });
           
        }).catch((error) => {
            // Uh-oh, an error occurred!
        });

    },[loading])    

    if (loading) {
        return (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Box sx={{width: '100%'}}>
            <Paper 
                sx={{
                    width: '100%',
                    mb: 2,
                    borderRadius: 5
                }}
            >
               

                <TableContainer>
                    <Table 
                        sx={{minWidth: 750}}
                        aria-labelledby="tableTitle"
                        size= 'medium'
                    >
                        <EnhancedTableHead 
                            order={order}
                            orderBy={orderBy}
                            rowCount={rows.length}
                        />
                        <TableBody> {
                            stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                return (
                                    <TableRowMedia 
                                        row={row} 
                                        setLoading={setLoading} 
                                        setAlert={setAlert}
                                        setMessage={setMessage}
                                        setcheckMessage={setcheckMessage}  
                                    />
                                );
                            })
                        }
                            {
                            emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
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
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

            </Paper>

        </Box>
    );
}

