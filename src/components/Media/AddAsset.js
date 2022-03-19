import * as React from 'react';
import { Box, Grid, Button, Typography, Stack, TextField  } from '@mui/material';
import { withStyles, styled, makeStyles } from "@material-ui/styles";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import api from '../../api/posts';
import { useVCLazyAxios } from 'use-vc-axios'
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
// upload image
import {storage} from "../../../src/firebase"
import { getDownloadURL , ref  } from "@firebase/storage";
import { uploadBytesResumable } from "firebase/storage";
import { FormControlUnstyledContext } from '@mui/base';
import { v4 as uuidv4 } from 'uuid';
import imageCompression from 'browser-image-compression';
import moment from 'moment';

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
  
     // Upload Image
    const [imageFile, setImageFile] = React.useState(null);
    //call formik 
    const SupplySchema = Yup.object().shape({
        title: Yup.string(),
    });

    const { data, error, refetch, operation: uploadImg } = useVCLazyAxios({
        axiosInstance: api,
        url: `/api/cms/media/upload`,
        method: 'POST'
    })
    
    const newDate = moment(new Date()).format('MMdYYYY');
       
    // upload Image
    const uploadFiles = async ( file, newValue ) => {
        //
        if(!file) return;
        
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

        // const storageRef = ref(storage, `files/${newFile}`);
        console.log(newFile , "New File");

        // tO firbase
        const storageRef = ref(storage, `files/${newFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef , compressedFile);

        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            // setProgress(prog);
        }, (err) => console.log(err) , 
            () => {
            getDownloadURL(uploadTask.snapshot.ref).then( (url)=> 
                {                 
                    console.log(url)   
                    console.log("upload image successfully!")
                    handleClose(); 
                    // setTimeout( () => {
                        setLoading(true);
                        setcheckMessage('success');
                        setMessage("upload image successfully!");
                        setAlert(true);
                    // },3000)                 
                    
                })
            }
        );
        
    };

    React.useEffect( () => {
        console.log(data, error, 'res')
        if(data?.success){
            console.log(data?.message)
        }
        console.log(data, error, 'res')
    },[data])
  
    const formik = useFormik({
        initialValues: {
            // title: "",
            // imageType: "",
            // imageName: "",
            // imageSrc: "",
            // status: true,          
        },

        validationSchema: SupplySchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            console.log({ ...values});
             
            if(imageFile){
                uploadFiles(imageFile)
                return
            }

        }
    });

    const {
        errors,
        touched,
        values,
        isSubmitting,
        handleSubmit,
        getFieldProps,
        setFieldValue,
        resetForm,
    } = formik;

    return (
        <FormikProvider 
            value={formik} 
            sx={{ 
                alignSelf: 'center', 
                }} 
        >
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography id="modal-modal-title" variant="h4" component="h4"
                    sx={{ textAlign: 'center',  mb: 3 , color:'grey.700',fontWeight: 'bold', }}
                >
                    Add Media
                </Typography>
                 <Box style={boxStyle} sx={{ display:"flex" , flexDirection:"column" , justifyContent:"center"}} >
                    <Grid container spacing={1}>
                        <Grid item xs={12}
                            display="flex"
                            sx={{ justifyContent: 'center' }}
                        >
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
                                    <label for="image">
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
                                <label for="image">
                                  <FileUploadOutlinedIcon
                                    sx={{
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