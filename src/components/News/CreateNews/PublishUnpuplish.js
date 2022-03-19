import React from 'react'
import { Box, Stack, Button, Grid, Typography } from "@mui/material";
import api from "../../../api/posts";

export default function PublishUnpuplish({ id , handleCloseCheckPub , setRefetch , handleClose , UpStatus }) {
  const UpdateStatus = async () => {

        // console.log(UpStatus , id )      
        await api.put(`/api/cms/news/${id}`,{status:UpStatus}).then( (res) => {
            handleClose();
            handleCloseCheckPub();
            setRefetch();
            console.log(res?.data?.message)
        })
};
// console.log(handleCloseDeleted,'Deleted');

  return (
    <Grid container spacing={2}>
     <Grid item xs={12}>
         <Typography
            variant="h5"
            sx={{ textAlign: "center", color: "#5B5BF6", fontWeight: "bold" }}
        >
            UPDATE STATUS
        </Typography>
    </Grid>
     <Grid item xs={12}>
        <Typography
            variant="h6"
            sx={{ textAlign: "center" }}
        >
            Do you want to {UpStatus}?
        </Typography>
    </Grid>
   <Grid item xs={12}>
         <Grid container spacing={5} >
            <Grid item xs={6} sx={{ display: "flex", justifyContent: "right" }}>
                <Button
                variant="contained"
                    sx={{
                        width: "50%",
                        backgroundColor: "#5B5BF6",
                        "&:hover": {
                            backgroundColor: "#5B5BF6",
                        }
                    }}
                    onClick={UpdateStatus}
                >
                    OKAY
                </Button>
            </Grid>
            <Grid item xs={6} sx={{ display: "flex", justifyContent: "left" }}>
                <Button
                    onClick={()=> {
                        handleCloseCheckPub();
                        handleClose();
                    }}
                    variant="contained"
                    sx={{
                        width: "50%",
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
  )
}
