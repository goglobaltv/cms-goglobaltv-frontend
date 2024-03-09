import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { visuallyHidden } from '@mui/utils';
import FilterListIcon from '@mui/icons-material/FilterList';
import Tooltip from '@mui/material/Tooltip';
import NewRow from './CreateNews/NewRow';
import { Pagination, Stack } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function createData(
    _id,
    title,
    newsCategory,
    view,
    like,
    updatedAt,
    author,
    status) {
    return {
        _id,
        title,
        newsCategory,
        view,
        like,
        updatedAt,
        author,
        status
    };
}

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
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
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
        id: 'title',
        numeric: false,
        disablePadding: false,
        label: 'News\' title',
    },
    {
        id: 'category',
        numeric: true,
        disablePadding: false,
        label: 'Category',
    },
    {
        id: 'views',
        numeric: true,
        disablePadding: false,
        label: 'Views',
    },
    {
        id: 'likes',
        numeric: true,
        disablePadding: false,
        label: 'Likes',
    },
    {
        id: 'updated',
        numeric: true,
        disablePadding: false,
        label: 'Updated',
    },
    {
        id: 'author',
        numeric: true,
        disablePadding: false,
        label: 'Author',
    },
    {
        id: 'status',
        numeric: true,
        disablePadding: false,
        label: 'Status',
    },
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell padding="checkbox">
                    <Tooltip title="Error">
                        <IconButton disabled>
                            <FilterListIcon
                                color="palette.grey.a700"
                            />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

export default function EnhancedTable({  page , data , setPage , news , setRefetch , setLimit }) {
    //
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');   
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = useState([]);

    const [showPage,setShowPage] = React.useState(null);

    React.useEffect( () => {        
        setShowPage(page);
    },[page])

    useEffect( () => {
        async function fetchData() {
            // You can await here
            await setLimit(rowsPerPage)
            // ...
        }
        fetchData();
       
    },[rowsPerPage])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(parseInt(event?.target?.textContent), 10);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    
    useEffect( () => {
        if(news.length !== 0 ){
            let rows = [];
            news.forEach((element) => {
                let allRow = createData(
                    element?._id,
                    element?.title,
                    element?.newsCategory,
                    element?.view,
                    element?.like,
                    element?.updatedAt,
                    element?.author,
                    element?.status
                );
                rows.push(allRow);
                setRows([...rows]);
            });
        } else {
            setRows([]);
        }
            
    }, [news])

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 1, borderRadius: "20px" }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {
                                rows.map((row, index) => {
                                    return (
                                        <NewRow row={row} setRefetch={setRefetch}/>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                /> */}

                <Stack direction="row" spacing={2} justifyContent="center" sx={{padding:1}}>
                    <IconButton
                        disabled={ data?.prevPage === null ? true : false}
                        onClick={()=> setPage(data?.prevPage)}
                    >
                        <ArrowBackIosNewIcon sx={{width:20}}/>
                    </IconButton>
                    <Stack direction="column" spacing={2} justifyContent="center">
                        <Pagination 
                            variant="outlined"
                            color="primary"
                            page={showPage}
                            count={data?.totalPages} 
                            hideNextButton="false"
                            hidePrevButton="false"
                            onChange={(e) => handleChangePage(e)}
                        />
                    </Stack>                        
                    <IconButton  
                        disabled={ data?.nextPage === null ? true : false}
                        onClick={()=> setPage(data?.nextPage)} 
                    >
                        <ArrowForwardIosIcon sx={{width:20}}/>
                    </IconButton>
                </Stack> 

            </Paper>
            
        </Box>
    );
}
