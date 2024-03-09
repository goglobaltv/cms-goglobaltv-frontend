import * as React from 'react';
import {Box, IconButton, ImageList, ImageListItem, ImageListItemBar, Pagination, Stack} from '@mui/material';
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
import api from '../../api/posts';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useVCAxios } from 'use-vc-axios'

// import { ref, listAll , getDownloadURL } from "firebase/storage";
// import {storage} from "../../firebase"

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
        label: "Title"
    },
    {
        id: "imageType",
        numeric: false,
        disablePadding: true,
        label: "Image Type"
    },
    {
        id: "uploadAt",
        numeric: false,
        disablePadding: true,
        label: "Upload At"
    },
    {
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

export default function TableMedia({ keyword , loading, setLoading, setAlert, setMessage, setcheckMessage }) {

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');

    const [limit,setLimit] = React.useState(10);
    const [page, setPage] = React.useState(1);    
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows,setRows] = React.useState([])

    const [showPage,setShowPage] = React.useState(null);
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
 
    const { data , refetch, error} = useVCAxios({
        axiosInstance: api,
        method: 'GET',
        url: `api/cms/media/get?page=${page}&limit=${limit}&keyword=${keyword}`,
    })

    React.useEffect( () => {
        refetch();
        setShowPage(page);
    },[page])

    React.useEffect( () => {
        refetch();
    },[loading])

    React.useEffect( () => {
        refetch();
    },[keyword])


    React.useEffect(  () => {       
        if(data){
            console.log(data ,"docs")            
            let rows = [];
            data?.docs?.forEach(element => {
                let allrows = {                                               
                    preview : element?.imageSrc,
                    title : element?.title,                    
                    imageType : element?.imageType ,
                    create_at : element?.createdAt,                  
                }                
                rows.push(allrows);            
            });
            setRows([...rows]);               
        }
        setLoading(false);
         
    },[data])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event) => {
        setPage(parseInt(event?.target?.textContent), 10);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

   
    // const listRef = ref(storage, 'files');  
    // React.useEffect( () => {
    //     let rows = [];
    //     listAll(listRef)
    //     .then((res) => {           
    //         res.items.forEach((itemRef) => {
    //             let pathName = itemRef?._location?.path_ ;
    //             let ImageName = pathName.split('files/')[1];

    //             getDownloadURL(itemRef)
    //             .then((url) => {
                                            
    //                 let allrows = {                                               
    //                     preview : url ,
    //                     title : ImageName,
    //                     dimensions : "12x215",
    //                     updated : "",
    //                     by :"Ratana",
    //                     status: "" ,
    //                     icon : "" , 
    //                     imageType : "" ,
    //                     path: pathName,
    //                 }                
    //                 rows.push(allrows);
    //                 setRows([...rows])
                    
    //             })
    //             setLoading(false)
    //         });
           
    //     }).catch((error) => {
    //         console.log(error);
    //     });

    // },[loading])    

    console.log(rows)

    if (loading) {
        return (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Box sx={{width: '100%'}}>
            <Paper  sx={{ width: '100%', mb: 2, borderRadius: 5 , height:"fit-content"}} >
                <TableContainer>
                    <Table aria-labelledby="tableTitle" size= 'medium' >
                        <EnhancedTableHead 
                            order={order}
                            orderBy={orderBy}
                            rowCount={rows.length}
                        />
                        <TableBody> 
                            {
                                rows?.map((row, index) => {
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
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* <TablePagination rowsPerPageOptions={
                        [5, 10, 25, 100]
                    }
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

