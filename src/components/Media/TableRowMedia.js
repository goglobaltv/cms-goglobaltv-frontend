import * as React from 'react';
import {Box, IconButton} from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import CardMedia from '@mui/material/CardMedia';
import Modal from '@mui/material/Modal';
import DeleteMedia from './DeleteMedia'
 
function TableRowMedia({row , setLoading, setAlert, setMessage, setcheckMessage  }) {

    const [openNews, setOpenNews] = React.useState(false);
    const handleOpenNews = () => setOpenNews(true);
    const handleCloseNews = () => setOpenNews(false);

    return (
        <>
            <TableRow 
                hover
                tabIndex={-1}
                key={row.id}
            >
                <TableCell align="left" width="25%">
                    <img src={`${row.preview}`} alt={`${row.title}`} height="120px"/>
                    {/* <CardMedia 
                        component="img" height="100" fontSize="10"
                        image={`${row.preview}`}
                    /> */}
                </TableCell>
                <TableCell 
                    component="th" scope="row" padding="none" width="30%"
                >
                    {row?.title} 
                </TableCell>
                <TableCell 
                    component="th" scope="row" padding="none"
                >
                    {row?.imageType} 
                </TableCell>
                <TableCell 
                    component="th" scope="row" padding="none"
                >
                    {row?.create_at} 
                </TableCell>
                
                <TableCell align="right">
                    <IconButton onClick={handleOpenNews} sx={{color:"red"}}>
                        <DeleteIcon 
                            sx={{ fontSize: 20,}} 
                        />
                    </IconButton>
                    <Modal 
                        open={openNews}
                        onClose={handleCloseNews}
                    >
                        <DeleteMedia 
                            setLoading={setLoading}
                            path={row.path}                                    
                            handleCloseNews={handleCloseNews}
                            setAlert={setAlert}
                            setMessage={setMessage}
                            setcheckMessage={setcheckMessage}
                        />
                    </Modal>
                </TableCell>
            </TableRow>
        </>
    )
}

export default TableRowMedia
