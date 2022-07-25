import * as React from 'react';
import { Box, Grid, Button, Typography, Stack, TextField, FormControl, InputLabel, Select, MenuItem, IconButton  } from '@mui/material';
import { withStyles, styled, makeStyles } from "@material-ui/styles";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import api from '../../api/posts';
import axios from 'axios';
import { useVCLazyAxios } from 'use-vc-axios';
// upload image
import {storage} from "../../../src/firebase"
import { getDownloadURL , ref  } from "@firebase/storage";
import { uploadBytesResumable } from "firebase/storage";
import { FormControlUnstyledContext } from '@mui/base';
import { v4 as uuidv4 } from 'uuid';
import imageCompression from 'browser-image-compression';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';


//dash border
const boxStyle = {
    border: '2px dashed #797E7F',
    direction: "column",
    alignItems: "center",
    justify: "center",
    borderRadius: 15,
    height: "40vh",
}


export default function Add_Ads({handleClose , setLoading, setAlert, setMessage, setcheckMessage }) {
  
    //
    const navigate = useNavigate();
    
    // Upload Image
    const [imageFile, setImageFile] = React.useState(null);
    const [title,setTitle] = React.useState("");
    const [imageType,setImageType] = React.useState("");
   
    // upload Image    
    const newDate = moment(new Date()).format('MMdYYYY');       
    const uploadFiles = async ( file ) => {
        //
        if(!file) return;
        const formData = new FormData();        
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        }
        const compressedFile = await imageCompression(file, options)

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        
        let newName = `${uuidv4()}${newDate}${file.name.split('.').pop()}`;        
        var newFile = new File([compressedFile], `${newName}.png`, { type: 'image/png' });        
        // console.log(newFile , "New File");        
        formData.append("image", newFile);

        await axios
            .post(`${process.env.React_App_UPLOAD_URL}api/tv/upload`, formData , config)
            .then( async function (response) {
                // console.log(response?.data);
                console.log(`https://storage.go-globalschool.com/api${response?.data}` , "link");

                const newValue = {
                    title: title,
                    imageType: imageType,
                    imageName: newFile?.name,
                    imageSrc: `https://storage.go-globalschool.com/api${response?.data}`,
                }
                // console.log(newValue);

                await api.post(`/api/cms/media/upload`, newValue)
                    .then( res => {
                        console.log(res?.data?.message)
                        setAlert(true);
                        setMessage(res?.data?.message);
                        handleClose();
                        setLoading(true);
                        setcheckMessage("success");
                        window.location.replace("/media");
                    })               
                    .catch(function (error) {
                        setAlert(true);
                        setMessage(error);
                        setcheckMessage("error");
                        console.log(error);
                    });

                // handleClose();
            })   
        
        
    };


    //call formik 
    const SupplySchema = Yup.object().shape({
        title: Yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            // title: "",
        },

        validationSchema: SupplySchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            // console.log(values);

            if(imageFile){
                uploadFiles(imageFile)
                return
            }

        }
    });

    const {  errors, touched, values, isSubmitting , handleSubmit , getFieldProps , setFieldValue, resetForm, } = formik;

    return (
        <FormikProvider value={formik}  sx={{  alignSelf: 'center', }} >
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography id="modal-modal-title" variant="h5"  
                    sx={{ textAlign: 'center',  mb: 3 , color:'grey.700',fontWeight: 'bold', }}
                >
                    Add Media
                </Typography>
                <Box style={boxStyle} sx={{ display:"flex" , flexDirection:"column" , justifyContent:"center"}} >
                    <Grid container spacing={1}>
                        <Grid item xs={12} display="flex" sx={{ justifyContent: 'center' }} >
                        { imageFile ? (
                            <>
                                <Stack 
                                    sx={{ alignItems: "center",  display: imageFile ? "block" : "none",}} 
                                >     
                                    <TextField
                                        sx={{ display: "none" }}
                                        fullWidth
                                        type="file"
                                        id="image"
                                        onChange={(e) => setImageFile(e.target.files[0])}
                                    />   
                                    <Button>
                                    <label htmlFor="image">
                                        <img
                                            src={URL.createObjectURL(imageFile)} 
                                            style={{ width: "36vh", height: "25vh" }}
                                            alt="preview"
                                        />                           
                                    </label>
                                    </Button>
                                </Stack>
                            </>
                          ) : (
                            <>                            
                              <Stack sx={{ alignItems: "center" }}>
                                <TextField
                                  sx={{ display: "none" }}
                                  fullWidth
                                  type="file"
                                  id="image"
                                  onChange={(e) => setImageFile(e.target.files[0])}
                                />
                                <label htmlFor="image">
                                  <FileUploadOutlinedIcon sx={{
                                      color: "#5B5BF6",
                                      width: "40px",
                                      height: "40px",
                                      cursor: "pointer",
                                    }}
                                  />
                                </label>
                                <Typography
                                  sx={{
                                    textAlign: "center",
                                    fontSize: 15,
                                    color: "#5B5BF6",
                                  }}
                                >
                                  Add Profile Image
                                </Typography>
                              </Stack>
                            </>
                          )}   
                           
                        </Grid>
                        
                </Grid>
                </Box> 

                <Grid item xs={12} sx={{mt:3}}>    
                    <Grid container spacing={2} >     
                        <Grid item xs={7}> 
                            <TextField label="Title" fullWidth size="small" onChange={(e) => setTitle(e.target.value)}/>
                        </Grid>
                        <Grid item xs={5}> 
                            {/* <TextField label="Title" fullWidth size="small" onChange={(e) => setImageType(e.target.value)}/> */}
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label" sx={{mt:-0.5}}>Image Type</InputLabel>
                                <Select
                                    size='small'                                                    
                                    label="Image Type"
                                    onChange={(e) => setImageType(e.target.value) }
                                >                                    
                                    <MenuItem value="thumbnail">Thumbnail</MenuItem>
                                    <MenuItem value="feature image">Feature Image</MenuItem>
                                    <MenuItem value="social media">Social Media</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>                

                <Grid item xs={12}>
                    <Grid container alignItems='center'spacing={6} >
                        <Grid item xs={6} sx={{display:'flex', justifyContent:'right'}}>
                            <Box sx={{ textAlign: 'center', mt: 5 }}>                                                             
                                <Button
                                    type="submit"
                                    variant="contained"                                    
                                    sx={{                                       
                                        width: "20%",
                                        backgroundColor: "#5B5BF6",
                                        "&:hover": {
                                            backgroundColor: "#5B5BF6",
                                        }
                                    }}
                                >
                                    Upload
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={6} sx={{display:'flex', justifyContent:'left'}}>
                            <Box sx={{ textAlign: 'center', mt: 5 }}>
                               
                                <Button
                                    onClick={() => { handleClose() }}
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

                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Form>
        </FormikProvider>
    );
}