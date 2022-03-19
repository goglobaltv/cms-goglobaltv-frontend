import * as React from 'react';
import { styled, useTheme, makeStyles } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Drawer, Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';
import DrawerMenu from '../components/menu/DrawerMenu';
//Menu

const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);


export default function LayoutDashboard() {

    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    // const handleDrawerOpen = () => {
    //     setOpen(true);
    // };

    // const handleDrawerClose = () => {
    //     setOpen(false);
    // };

    return (
        <Box
            sx={{
                display: 'flex',
            }}
        >
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        background: 'none',
                        border: 'none',
                    },
                    ...(!open && { display: 'none' }),
                    '&.MuiDrawer-docked': {
                        variant: 'permanent',
                    }
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerMenu />
            </Drawer>
            <Main open={open} sx={{ marginLeft: 0 }} >
                <Outlet />
            </Main>
        </Box >
    );
}