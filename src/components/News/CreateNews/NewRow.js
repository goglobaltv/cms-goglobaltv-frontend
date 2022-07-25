import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Menu, MenuItem, Box, Modal, Typography, TextField, FormControl, InputLabel, Select, Button } from '@mui/material';
import { Markup } from 'interweave';
import moment from "moment";
import DeleteNews from './DeleteNews';
import PublishUnpuplish from './PublishUnpuplish';
import { Link } from 'react-router-dom';
import PublishedWithChangesRoundedIcon from '@mui/icons-material/PublishedWithChangesRounded';
import UnpublishedRoundedIcon from '@mui/icons-material/UnpublishedRounded';

const style = {
    position: 'absolute',
    backgroundColor: 'background.paper',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    borderRadius: 5,
    width: 400,
    p: 4,
    textAlign: 'center',
}

function RedBar() {
    return (
      <Box
        sx={{
          height: 15,
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? '#fff'
              : 'rgba(255, 0, 0, 0.1)',
        }}
      />
    );
  }
export default function NewRow({ row  , setRefetch }) {

        
    // console.log(row)
    const [openEdit, setOpenEdit] = React.useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const [deleted, setDeleted] = React.useState(false);
    const handleOpenDeleted = () => setDeleted(true);
    const handleCloseDeleted = () => setDeleted(false);

    const [checkPub, setCheckPub] = React.useState(false);
    const handleOpenCheckPub = () => setCheckPub(true);
    const handleCloseCheckPub = () => setCheckPub(false);

    const [checkUnPub, setCheckUnPub] = React.useState(false);
    const handleOpenCheckUnPub = () => setCheckUnPub(true);
    const handleCloseCheckUnPub = () => setCheckUnPub(false);


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

   
    const [selector, setSelector] = React.useState('');    
    const handleChangeSelector = (event) => setSelector(event.target.value);
   

    return (
        <TableRow
            hover
            key={row._id}
        >
            <TableCell
                component="th"
                scope="row"
                padding="true"
                width={"30%"}
                sx={{fontFamily:"Khmer OS Siemreap" , fontSize:"18px" }}
            >
                <Markup content={row.title.replace(/<\/?(?!a)(?!p)(?!img)\w*\b[^>]*>/ig, '')} />

            </TableCell>
            <TableCell align="right">{row?.newsCategory?.name}</TableCell>
            <TableCell align="right">{row.view}</TableCell>
            <TableCell align="right">{row.like}</TableCell>
            <TableCell align="right">{moment(row.updatedAt).format("YYYY-MMMM-DD")}</TableCell>
            <TableCell align="right">{row.author}</TableCell>
            <TableCell 
                align="right"
                sx={{
                    color: row.status === "Published" ? "#0DE86A" : "#E8270D"
                }}
            >
                {row.status}
            </TableCell>
            <TableCell padding="checkbox">
                <>
                    <IconButton
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <MoreVertIcon
                            color="palette.grey.a700"
                        />
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                          }}
                    >
                        {
                            row.status === "Published" ? 
                            <>
                                <MenuItem onClick={handleOpenCheckUnPub} sx={{ color: 'orange'}}>
                                        <UnpublishedRoundedIcon sx={{ fontSize: 20, mr: 1, color: 'orange'}} />Draft
                                </MenuItem>
                            </>
                        :
                            <>
                                <MenuItem onClick={handleOpenCheckPub} sx={{ color: 'green'}}>
                                        <PublishedWithChangesRoundedIcon sx={{ fontSize: 20, mr: 1, color: 'green'}} />Published
                                </MenuItem>
                            </>
                        }                                                

                        <Link to={`/updateNews?id=${row._id}`}  style={{ textDecoration : "none"}} >
                            <MenuItem sx={{ color: 'blue'}} >                              
                                <EditIcon sx={{ fontSize: 20, mr: 1 }} />edit                           
                            </MenuItem>
                        </Link>
                        <MenuItem onClick={handleOpenDeleted} sx={{ color: 'blue'}}>
                                <DeleteIcon sx={{ fontSize: 20, mr: 1, color: 'red'}} />delete
                        </MenuItem>
                        
                    </Menu>

                    {/* Edit */}
                    <Modal
                        open={openEdit}
                        onClose={handleCloseEdit}
                    >
                        <Box sx={style}>
                            <Typography 
                                variant='h4' 
                                component='p'
                                sx={{ 
                                    fontWeight: 'bold'
                                }}
                                    >
                                EDIT NEWS
                            </Typography>                            
                             
                        </Box>
                    </Modal>
                    {/* End Edit */}

                    {/* Delete */}
                    <Modal
                    open={deleted}
                    onClose={handleCloseDeleted}
                    >
                        <Box sx={style}>
                            <DeleteNews 
                                handleClose={handleClose}
                                setRefetch={setRefetch}
                                id={row._id}
                                handleCloseDeleted={handleCloseDeleted}
                            />
                        </Box>
                    </Modal>    
                    {/* Delete */}       

                    {/* CheckPub */}
                    <Modal
                    open={checkPub}
                    onClose={handleCloseCheckPub}
                    >
                        <Box sx={style}>
                            <PublishUnpuplish 
                                handleClose={handleClose}
                                setRefetch={setRefetch}
                                UpStatus="Published"
                                id={row._id}
                                handleCloseCheckPub={handleCloseCheckPub}
                            />
                        </Box>
                    </Modal>    
                    {/* CheckPub */}  

                    {/* CheckPub */}
                    <Modal
                    open={checkUnPub}
                    onClose={handleCloseCheckUnPub}
                    >
                        <Box sx={style}>
                            <PublishUnpuplish 
                                handleClose={handleClose}
                                setRefetch={setRefetch}
                                UpStatus="Draft"
                                id={row._id}
                                handleCloseCheckPub={handleCloseCheckUnPub}
                            />
                        </Box>
                    </Modal>    
                    {/* CheckPub */} 


                </>
            </TableCell>

        </TableRow>

    );
}
