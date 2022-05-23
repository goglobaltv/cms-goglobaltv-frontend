import * as React from 'react';
import {
    Box,
    Grid,
    Button,
    Typography,
    InputLabel,
    Stack,

} from '@mui/material';
import IosShareIcon from '@mui/icons-material/IosShare';
import IconButton from '@mui/material/IconButton';
import { withStyles, styled } from "@material-ui/styles";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import TextField from '@mui/material/TextField';
import { makeStyles } from "@material-ui/core/styles";
import api from '../../api/posts';
import { useVCLazyAxios } from 'use-vc-axios'
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
// upload image
import {storage} from "../../../src/firebase"
import { getDownloadURL , ref  } from "@firebase/storage";
import { uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import imageCompression from 'browser-image-compression';
import moment from 'moment';
import axios from 'axios';


const CssTextField = withStyles({
    root: {
        "& .MuiInputLabel-root": {
            color: "black",
        },
        "& label.Mui-focused": {
            color: "#e0e0e0",
        },
        "& .MuiFilledInput-root": {
            backgroundColor: '#e0e0e0',
            borderColor: "#e0e0e0",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "#e0e0e0",
                borderRadius: 15,
            },
            "&:hover fieldset": {
                borderColor: "black",

            },
            "&.Mui-focused fieldset": {
                borderColor: "#424242",
            },
        },
        p: 3
    },
})(TextField);

//dash border
const boxStyle = {
    border: '2px dashed #797E7F',
    direction: "column",
    alignItems: "center",
    justify: "center",
    borderRadius: 15,
    height: "30vh",
    // p: 6
}

const useStyles = makeStyles({
    root: {
        // background: '#FAFAFA',
        width: "100%",
        height: 50,
        "&:hover": {
            background: '#3f50b5',
            color: '#fff',
        },
        borderRadius: 10,
        // color: 'black',
        marginTop: 5,
        p: 2
    },
    cate: {
        width: "100%",
    },
})





export default function Add_Ads({setRefetch , handleCloseNews , setMessage ,setcheckMessage , setAlert }) {

    const classes = useStyles();
    const newDate = moment(new Date()).format('MMdYYYY');
    const [page, setPage] = React.useState(1)
    const [limit, setLimit] = React.useState(10)
    const [keyword, setKeyword] = React.useState('')
    const [location, setLocation] = React.useState('')   

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [progress, setProgress] = React.useState(0);    
    const [imageFile,setImageFile] = React.useState(null) 
    
   


    const { data, error, refetch, operation: createAds } = useVCLazyAxios({
        axiosInstance: api,
        url: `/api/cms/adsData/create`,
        method: 'POST'
    })

    React.useEffect( async() => {
            
        if(data?.success){
            console.log(data , "when success")
            handleCloseNews();
            setRefetch();
            setcheckMessage('success');
            setMessage(data?.message)
            setAlert(true);    
            window.location.replace("/ads");    
        }

    },[data])

    // upload Image
    const uploadFiles = async (file,newValue) => {
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

                createAds({ 
                    variables: {
                        ...newValue,
                        imageName: newFile?.name,
                        imageSrc:`https://storage.go-globalschool.com/api${response?.data}`,
                    }
                })
                
            })
        
    };

    

    //call formik 
    const SupplySchema = Yup.object().shape({
        title: Yup.string().required("title is required!"),        
        imageName: Yup.string() ,
        imageSrc: Yup.string(),
        status: Yup.boolean(),
        location:  Yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            title: "",
            imageName: "",
            imageSrc : "",
            status: true,
            location: ""
        },

        validationSchema: SupplySchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {

            const newValue = {
                ...values,
                location: location,
            }

            if (imageFile) {
                uploadFiles(imageFile,{...newValue});
                return
            }   

            createAds({ 
                variables: newValue
            })
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
        <>
        <FormikProvider value={formik} sx={{ alignSelf: 'center', }} >
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography id="modal-modal-title" variant="h4" component="h4"
                    sx={{ textAlign: 'center',  mb: 3 , color:'grey.700',fontWeight: 'bold', }}
                >
                    Add Ads
                </Typography>
                <Box style={boxStyle} sx={{display:"flex" , justifyContent:"center" , flexDirection:"column"}}>
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

                <Grid container >
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box sx={{ mt: 2, }}>
                            <InputLabel>
                                Company's Name
                            </InputLabel>

                            <CssTextField
                                placeholder='Title:'
                                fullWidth
                                {...getFieldProps("title")}
                                error={Boolean(
                                    touched.title && errors.title
                                )}
                                helperText={touched.title && errors.title}

                            />
                        </Box>
                        <InputLabel sx={{ mt: 2 }}>
                            Choose Category
                        </InputLabel>
                    </Grid>
                    
                    <Grid item xs={12}
                        sx={{
                            display: 'flex',
                        }}>
                        <Grid container spacing={1}  >
                            <Grid item xs={4} >
                                <Button                                     
                                    className={classes.root} 
                                    sx={{
                                        background: location === "topBar" ? '#3f50b5'  : '#FAFAFA',
                                        color: location === "topBar" ? '#fff'  : '#5B5BF6',
                                        "&:hover": {
                                            background: '#3f50b5',
                                            color: '#fff',
                                        },
                                    }}
                                    
                                    onClick={() => setLocation('topBar')} 
                                >
                                    Top Bar
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button 
                                className={classes.root} 
                                sx={{
                                    background: location === "sideBar" ? '#3f50b5'  : '#FAFAFA',
                                    color: location === "sideBar" ? '#fff'  : '#5B5BF6',
                                    "&:hover": {
                                        background: '#3f50b5',
                                        color: '#fff',
                                    },
                                }}
                                onClick={() => setLocation('sideBar')}>Slide Bar</Button>
                            </Grid>
                            <Grid item xs={4} >
                                <Button className={classes.root} 
                                sx={{
                                    background: location === "body" ? '#3f50b5'  : '#FAFAFA',
                                    color: location === "body" ? '#fff'  : '#5B5BF6',
                                    "&:hover": {
                                        background: '#3f50b5',
                                        color: '#fff',
                                    },
                                }}
                                onClick={() => setLocation('body')}>Body</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                </Grid>

                <Grid xs={12} >
                    <Grid container alignItems='center' spacing={1}  >
                        <Grid item xs={6} sx={{ display: "flex", justifyContent: "right" }}>
                            <Box sx={{ textAlign: 'center', mt: 5 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        backgroundColor: "#5B5BF6",

                                        "&:hover": {
                                            backgroundColor: "#5B5BF6",
                                        },
                                        borderRadius: 2,
                                        fontSize: 18,
                                        width: 120
                                    }}
                                >
                                    SAVE
                                </Button>
                            </Box>
                        </Grid>

                        <Grid item xs={6} sx={{ display: "flex", justifyContent: "left" }}>
                            <Box sx={{ textAlign: 'center', mt: 5 }}>
                                <Button 
                                    onClick={handleCloseNews}
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        backgroundColor: "#5B5BF6",

                                        "&:hover": {
                                            backgroundColor: "#5B5BF6",
                                        },
                                        borderRadius: 2,
                                        fontSize: 18,
                                        width: 120
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

                                   
        
        </>
    );
}