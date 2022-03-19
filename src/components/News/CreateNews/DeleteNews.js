import React from 'react'
import { Box, Stack, Button, Grid, Typography } from "@mui/material";
import api from "../../../api/posts";

export default function DeleteNews({ id , handleCloseDeleted , setRefetch , handleClose }) {
  const Deletenews = async () => {
    await api.delete(`/api/cms/news/${id}`).then((res) => {
        handleClose();
        handleCloseDeleted();
        setRefetch();
        console.log(res, 'Delete')
    });
};
// console.log(handleCloseDeleted,'Deleted');

  return (
    <Grid container spacing={2}>
     <Grid item xs={12}>
         <Typography
            variant="h5"
            sx={{ textAlign: "center", color: "#5B5BF6", fontWeight: "bold" }}
        >
            DELETE NEWS
        </Typography>
    </Grid>
     <Grid item xs={12}>
        <Typography
            variant="h6"
            sx={{ textAlign: "center" }}
        >
            Do you want to delete?
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
                    onClick={Deletenews}
                >
                    OKAY
                </Button>
            </Grid>
            <Grid item xs={6} sx={{ display: "flex", justifyContent: "left" }}>
                <Button
                    onClick={()=> {
                        handleCloseDeleted();
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
