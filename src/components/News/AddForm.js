import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import SchoolIcon from '@mui/icons-material/School';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import PublicIcon from '@mui/icons-material/Public';
import FlagIcon from '@mui/icons-material/Flag';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import { Link } from 'react-router-dom';

const sizeIcon = {
    fontSize: 40
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    p: 5,
    textAlign: "center",
};

const alignBottom = {
    alignItems: 'center',
}

const SelectCategory = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? "#1A2027" : theme.palette.grey[100],
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    textAlign: 'center',
    borderRadius: 5,
    width: "100%",
}))

export default function AddForm() {
   
    return (
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" component="h4"
                    sx={{ textAlign: 'center',  mb: 3 , color:'grey.700',}}>
                Add News
            </Typography>
            <Grid container spacing={2} width="350px">
                <Grid item xs={6}>
                    <SelectCategory
                        component={Link}
                        to={`/CreateNews?id=622020fdd0226f986ed9986b&name="education"`}
                    >
                        <Box sx={alignBottom}>
                            <SchoolIcon sx={sizeIcon} />
                            <Typography id="modal-modal-description" sx={{ mt: 0 }}>
                                Education
                            </Typography>
                        </Box>
                    </SelectCategory>
                </Grid>
                <Grid item xs={6}>
                    <SelectCategory
                        component={Link}
                        to={`/CreateNews?id=622eef8095d605fd2f3c681a&name="agriculture"`}
                    >
                        <Box sx={alignBottom}>
                            <AgricultureIcon sx={sizeIcon} />
                            <Typography id="modal-modal-description" sx={{ mt: 0 }}>
                                Agriculture
                            </Typography>
                        </Box>
                    </SelectCategory>
                </Grid>
                <Grid item xs={6}>
                    <SelectCategory
                        component={Link}
                        to={`/CreateNews?id=622eef9295d605fd2f3c681d&name="entertainment"`}
                    >
                        <Box sx={alignBottom}>
                            <LiveTvIcon sx={sizeIcon} />
                            <Typography id="modal-modal-description" sx={{ mt: 0 }}>
                                Entertainment
                            </Typography>
                        </Box>
                    </SelectCategory>
                </Grid>
                <Grid item xs={6}>
                    <SelectCategory
                        component={Link}
                        to={`/CreateNews?id=622013bac24748a67ba9a43b&name="business"`}
                    >
                        <Box sx={alignBottom}>
                            <BusinessCenterIcon sx={sizeIcon} />
                            <Typography id="modal-modal-description" sx={{ mt: 0 }}>
                                Business
                            </Typography>
                        </Box>
                    </SelectCategory>
                </Grid>
                <Grid item xs={6}>
                    <SelectCategory
                        component={Link}
                        to={`/CreateNews?id=622eefa295d605fd2f3c6821&name="International"`}
                    >
                        <Box sx={alignBottom}>
                            <PublicIcon sx={sizeIcon} />
                            <Typography id="modal-modal-description" sx={{ mt: 0 }}>
                                International
                            </Typography>
                        </Box>
                    </SelectCategory>
                </Grid>
                <Grid item xs={6}>
                    <SelectCategory
                        component={Link}
                        to={`/CreateNews?id=622eefac95d605fd2f3c6824&name="national"`}
                    >
                        <Box sx={alignBottom}>
                            <FlagIcon sx={sizeIcon} />
                            <Typography id="modal-modal-description" sx={{ mt: 0 }}>
                                National
                            </Typography>
                        </Box>
                    </SelectCategory>
                </Grid>
                <Grid item xs={6}>
                    <SelectCategory
                        component={Link}
                        to={`/CreateNews?id=6233f1a096938296db02ad02&name="health"`}
                    >
                        <Box sx={alignBottom}>
                            <HealthAndSafetyIcon sx={sizeIcon} />
                            <Typography id="modal-modal-description" sx={{ mt: 0 }}>
                                Health
                            </Typography>
                        </Box>
                    </SelectCategory>
                </Grid>
                <Grid item xs={6}>
                    <SelectCategory
                        component={Link}
                        to={`/CreateNews?id=6233f1bf96938296db02ad05&name="sport"`}
                    >
                        <Box sx={alignBottom}>
                            <SportsBaseballIcon sx={sizeIcon} />
                            <Typography id="modal-modal-description" sx={{ mt: 0 }}>
                                Sport
                            </Typography>
                        </Box>
                    </SelectCategory>
                </Grid>
                <Grid item xs={12}>
                    <SelectCategory
                        width="200px"
                        component={Link}
                        to={`/CreateNews?id=622eefb595d605fd2f3c6827&name="technology"`}
                    >
                        <Box sx={alignBottom}>
                            <DesktopMacIcon sx={sizeIcon} />
                            <Typography id="modal-modal-description" sx={{ mt: 0 }}>
                                Technology
                            </Typography>
                        </Box>
                    </SelectCategory>
                </Grid>
            </Grid>
        </Box >
    );
}