import * as React from "react";
import { Box, Stack, Button, Grid, Typography } from "@mui/material";
import api from "../../api/posts";

const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
};

function CardAdsDelete({
    id, 
    handleCloseNews,
    setRefetch,  
    setcheckMessage,
    setMessage,
    setAlert  
}) {

    const DeleteAds = async () => {
        await api.delete(`/api/cms/adsData/${id}`)
        .then((res) => {
            
            handleCloseNews()
            setRefetch()
            // console.log(res?.data?.message, 'Delete Status')
            setcheckMessage('success')
            setMessage(res?.data?.message)
            setAlert(true)


        })
        .catch( (err) => {
            console.log(err)
        })
    };

    return (
        <Box sx={styleModal}>
            <Grid container spacing={2}>


                <Grid item xs={12} md={12}>
                    <Typography
                        variant="h5"
                        sx={{ textAlign: "center", color: "#5B5BF6", fontWeight: "bold" }}
                    >
                        DELETE Ads
                    </Typography>
                </Grid>


                <Grid item xs={12} md={12}>
                    <Typography
                        variant="h6"
                        sx={{ textAlign: "center" }}
                    >
                        Do you want to delete?
                    </Typography>
                </Grid>

                <Grid item xs={12} md={12} >
                    <Grid container spacing={1} >
                        <Grid item xs={6} sx={{ display: "flex", justifyContent: "right" }}>
                            <Button
                                variant="contained"
                                sx={{
                                    width: "20%",
                                    backgroundColor: "#5B5BF6",
                                    "&:hover": {
                                        backgroundColor: "#5B5BF6",
                                    }
                                }}
                                onClick={DeleteAds}
                            >
                                OKAY
                            </Button>

                        </Grid>

                        <Grid item xs={6} >
                            <Button
                                onClick={() => { handleCloseNews() }}
                                variant="contained"
                                sx={{
                                    width: "20%",
                                    backgroundColor: "#5B5BF6",
                                    "&:hover": {
                                        backgroundColor: "#5B5BF6",
                                    }
                                }}
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CardAdsDelete