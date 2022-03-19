import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { ListItemText, ListItem, Grid, Button, Modal, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { Link, useLocation } from 'react-router-dom';
import FeedIcon from '@mui/icons-material/Feed';
import InfoIcon from '@mui/icons-material/Info';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import CampaignIcon from '@mui/icons-material/Campaign';
import Logout from '../../Logout';
import { deepOrange, deepPurple } from '@mui/material/colors';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

// 
export default function DrawerMenu() {
    // 
    const userName = window.localStorage.getItem("user");

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // action Menu
    const location = useLocation()
    // console.log(location.pathname)

    return (
        <Box
            sx={{
                m: 2,
                height: '100%',
                backgroundImage: `linear-gradient(to top, #4838eb, #5334e4, #5c31de, #642dd7, #6a29d1)`,
                borderRadius: 10,
                padding: 3,
            }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Box sx={{ justifyContent: 'center', display: 'flex' }}>
                        <img src="/LogoWhite.svg" width={100} />
                    </Box>
                </Grid>
                <Grid item xs={12} sx={{ justifyContent: 'center', display: 'flex' }}>
                    <Box sx={{ border: '1px solid #fff', width: '90%', background: '#fff' }} />
                </Grid>
                <Grid item xs={12}>
                    <List component="nav" aria-label="main mailbox folders" >
                        <ListItem
                            style={{ color: '#ffff' }}
                        >
                            <ListItemText
                                primary="MENU"
                                primaryTypographyProps={{
                                    fontWeight: 'bold'
                                }} />
                        </ListItem>
                        <Link to='/' style={{ textDecoration: 'none' }}>
                            <ListItemButton
                            >
                                <ListItemIcon>
                                    <AnalyticsIcon sx={{ color: '#fff' }} />
                                </ListItemIcon>
                                <ListItemText sx={{ color: '#fff' }} >Dashboard</ListItemText>
                                <KeyboardDoubleArrowLeftIcon sx={{ display: location.pathname === '/dashboard' ? 'block' : 'none', color: '#fff' }} />
                            </ListItemButton>
                        </Link>
                        <Link to='/media' style={{ color: '#ffff', textDecoration: 'none', }}>
                            <ListItemButton
                            >
                                <ListItemIcon>
                                    <PermMediaIcon sx={{ color: '#fff' }} />
                                </ListItemIcon>
                                <ListItemText primary="Media" />
                                <KeyboardDoubleArrowLeftIcon sx={{ display: location.pathname === '/media' ? 'block' : 'none', color: '#fff' }} />
                            </ListItemButton>
                        </Link>
                        <Link to='/news' style={{ color: '#ffff', textDecoration: 'none', }}>
                            <ListItemButton
                            >
                                <ListItemIcon>
                                    <FeedIcon sx={{ color: '#fff' }} />
                                </ListItemIcon>
                                <ListItemText primary="News" />
                                <KeyboardDoubleArrowLeftIcon sx={{ display: location.pathname === '/news' ? 'block' : 'none', color: '#fff' }} />
                            </ListItemButton>
                        </Link>
                        <Link to='/footer' style={{ color: '#ffff', textDecoration: 'none' }}>
                            <ListItemButton
                            >
                                <ListItemIcon>
                                    <InfoIcon sx={{ color: '#fff' }} />
                                </ListItemIcon>
                                <ListItemText primary="Footer" />
                                <KeyboardDoubleArrowLeftIcon sx={{ display: location.pathname === '/footer' ? 'block' : 'none', color: '#fff' }} />
                            </ListItemButton>
                        </Link>
                        <Link to='/ads' style={{ color: '#fff', textDecoration: 'none' }}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <CampaignIcon style={{ color: '#fff' }} />
                                </ListItemIcon>
                                <ListItemText primary="Ads" />
                                <KeyboardDoubleArrowLeftIcon sx={{ display: location.pathname === '/ads' ? 'block' : 'none', color: '#fff' }} />
                            </ListItemButton>
                        </Link>
                    </List >
                </Grid>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            width: "100%",
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                        }}>
                        <Box sx={{ justifyContent: 'center', display: 'flex' }} >
                            {/* <Avatar alt="Remy Sharp" src="/Theang Ratana2.jpg" sx={{ height: '60px', width: '60px' }} /> */}                            
                            <Avatar sx={{ height: '70px', width: '70px' , bgcolor: "#fff" }}>
                                <AccountCircleOutlinedIcon sx={{fontSize:50 , color:"#3f50b5" }}/>                        
                            </Avatar>
                        </Box >
                        {/* <ListItem>
                            <ListItemText
                                primary=""
                                primaryTypographyProps={{
                                    color: '#fff',
                                    variant: 'h6',
                                    component: 'p',
                                    textAlign: 'center',
                                    fontWeight: 'bold'
                                }}
                            />
                        </ListItem> */}
                        <ListItem>
                            <ListItemText>
                                <Typography 
                                    sx={{
                                        color: '#fff',
                                        variant: 'caption',
                                        textAlign: 'center',
                                        mt: -1,
                                        mb:2
                                    }}
                                >
                                    {userName}                                    
                                </Typography>
                            </ListItemText>                            
                        </ListItem>
                        <Box sx={{ justifyContent: 'center', display: 'flex', mt: -2, mb: 3 }} >
                            <Button variant="text" sx={{ color: '#fff' ,  }} onClick={handleOpen}>
                                Logout
                            </Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                }}>

                                    <Logout />

                                </Box>
                            </Modal>
                        </Box >
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}