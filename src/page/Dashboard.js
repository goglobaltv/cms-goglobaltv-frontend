import * as React from 'react';
import { Typography, Box, Grid, Divider } from '@mui/material';
import ChartBar from '../components/Dashboard/ChartBar';
import Boxing from '../components/Dashboard/Boxing'

export default function Dashboard() {
    
    return (
        <Box>
            <Grid container spacing={5}>
                <Grid item xs={12} >
                    <Typography variant='h4'>
                        Dashboard
                    </Typography>
                </Grid>
                <Grid item xs={12} >
                    <Divider />
                </Grid>
                <Grid item xs={12} >
                    <ChartBar />
                </Grid>
                <Grid item xs={12} >
                    <Boxing />
                </Grid>
            </Grid>
        </Box >
    );
}