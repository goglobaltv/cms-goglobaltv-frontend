import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { RiLogoutCircleRLine } from "react-icons/ri"

const style = {
    component: "Paper",
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    // bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 5,
    pb: 5,
    borderRadius: 10,
    textAlign: 'center',
    justifyConten: 'center',
    display: 'flex',
    flexDirection: 'column',
    color: "#fff",
    backgroundImage: `linear-gradient(to top, #4838eb, #5334e4, #5c31de, #642dd7, #6a29d1)`,
}
export default function Logout() {
    return (
        <Box
            sx={style}
        >
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Do you want to logout ?
            </Typography>
            <Box sx={{ alignContent: 'center' }}>
                <Button href="/" sx={{ fontSize: 40, color: '#fff', width: 20, borderRadius: '45%' }}
                    onClick={() => {
                        window.localStorage.removeItem("token");
                        window.localStorage.removeItem("user");
                    }}
                >
                    <RiLogoutCircleRLine />
                </Button>
            </Box>

        </Box>
    );
}
