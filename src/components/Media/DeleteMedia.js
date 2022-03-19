import * as React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { storage } from "../../firebase";
import { ref , deleteObject  } from "@firebase/storage";

const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
};

function DeleteMedia({ path, handleCloseNews , setLoading, setAlert, setMessage, setcheckMessage }) {

    const DeleteAds = () => {
        // Create a reference to the file to delete
        const desertRef = ref(storage, `${path}`);
        // Delete the file
        deleteObject(desertRef).then(() => {
            // File deleted successfully
            // console.log("delete image successfully ******")
            // handleCloseNews();
            setLoading(true);
            setcheckMessage('success');
            setMessage('delete image successfully');
            setAlert(true);
            
        }).catch((error) => {
            // Uh-oh, an error occurred!
        });
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
                    <Grid container spacing={6} >
                        <Grid item xs={6} sx={{display:"flex" , justifyContent:"right"}} >
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
                        <Grid item xs={6} sx={{display:"flex" , justifyContent:"left"}} >
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

export default DeleteMedia