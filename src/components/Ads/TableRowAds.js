import * as React from 'react';
import { IconButton} from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CardMedia from '@mui/material/CardMedia';
import Modal from '@mui/material/Modal';
import AddUpdateAds from '../Ads/AddUpdateAds'
import CardAdsDelete from './CardAdsDelete';
import moment from "moment";

function TableRowAds({row, setRefetch, setMessage, setAlert, setcheckMessage}) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);

    const [openNews, setOpenNews] = React.useState(false);
    const handleOpenNews = () => setOpenNews(true);
    const handleCloseNews = () => setOpenNews(false);

    // const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <TableRow hover
                tabIndex={-1}
                key={row.id} 
            >
                <TableCell align="center">
                    {/* {row.preview} */}
                    <CardMedia component="img" height="60px"
                        image={`${row.preview}`}
                        fontSize="10"
                    />
                </TableCell>
                <TableCell component="th" scope="row" padding="none">
                    {
                    row.title
                } </TableCell>
               
                <TableCell align="right">
                    {
                    row.type
                }</TableCell>
                <TableCell align="right">
                    {moment(row.updated).format("YYYY-MMMM-DD")}                   
                </TableCell>
                
                <TableCell align="right"
                    sx={
                        {
                            color: row.status === true ? "#0DE86A" : "#E8270D"
                        }
                }>
                    {
                    row.status === true ? "Publish" : "Draft"
                }
                </TableCell>
                <TableCell align="right">
                    <>
                        <div                     
                            onClick={handleMenu}
                        >
                            {row.icon} 
                        </div>
                        <Menu 
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                              }}
                            open={
                                Boolean(anchorEl)
                            }
                            onClose={handleClose}
                            >
                            <MenuItem onClick={handleOpen} sx={{color:'blue'}}>
                                <EditIcon
                                    sx={
                                        {
                                            fontSize: 20,
                                            mr: 1,
                                        }
                                    }
                                />
                                Edit
                            </MenuItem>
                            <Modal 
                                open={open}
                                onClose={handleCloseModal}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description">
                                <AddUpdateAds 
                                    editData={row}
                                    id={row._id}
                                    setRefetch={setRefetch}
                                    handleCloseModal={handleCloseModal}
                                    setAlert={setAlert}
                                    setMessage={setMessage}
                                    setcheckMessage={setcheckMessage}
                                    />

                            </Modal>
                            <MenuItem onClick={handleOpenNews} sx={{color:'blue'}}>
                                    <DeleteIcon sx={
                                        {
                                            fontSize: 20,
                                            mr: 1,
                                            color:'red'
                                        }
                                    }/>
                                    Delete
                            </MenuItem>
                            <Modal open={openNews}
                                onClose={handleCloseNews}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description">

                                <CardAdsDelete id={
                                        row._id
                                    }
                                    setRefetch={setRefetch}
                                    handleCloseNews={handleCloseNews}
                                    setcheckMessage={setcheckMessage}
                                    setMessage={setMessage}
                                    setAlert={setAlert} />
                            </Modal>
                        </Menu>
                    </>
                </TableCell> 
            </TableRow>
        </>
    )
}
export default TableRowAds
