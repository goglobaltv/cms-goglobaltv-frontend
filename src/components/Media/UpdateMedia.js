import * as React from 'react';
import {
    Box,
    Grid,
    Button,
    Typography,
    InputLabel,
    Stack,
} from '@mui/material';
import { withStyles, styled } from "@material-ui/styles";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import TextField from '@mui/material/TextField';
import { makeStyles } from "@material-ui/core/styles";
import api from '../../api/posts';
import { useVCLazyAxios } from 'use-vc-axios'
// upload image
import { storage } from "../../../src/firebase"
import { getDownloadURL, ref } from "@firebase/storage";
import { uploadBytesResumable } from "firebase/storage";
import pic from "../../image/news-default.jpeg"


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
const Input = styled('input')({
    display: 'none',
});

const fTitle = { xs: '24px', sm: '12px', md: '12px', lg: '24px', xl: '24px' }
const Title = styled(Typography)(() => ({
    color: '#797E7F',
    marginTop: 5,
    fontSize: fTitle,
}))

const useStyles = makeStyles({
    root: {
        // background: '#FAFAFA',
        width: "100%",
        height: 50,
        borderRadius: 10,
        // color: 'black',
        marginTop: 5,
        p: 2
    },
    cate: {
        width: "100%",
    },
});


export default function UpdateMedia({ id, editData, handleCloseModal , setRefetch }) {

    console.log(editData)

    // Upload Image
    const [imageFile, setImageFile] = React.useState(null);

    const [page, setPage] = React.useState(1)
    const [limit, setLimit] = React.useState(10)
    const [keyword, setKeyword] = React.useState('')
    const [location, setLocation] = React.useState('')
    const [imageType, setImageType] = React.useState('')
    const classes = useStyles();

    //call formik 
    const SupplySchema = Yup.object().shape({
        title: Yup.string().required("title is required!"),

    });
    const { data, error, operation: putAds } = useVCLazyAxios({
        axiosInstance: api,
        url: `/api/cms/adsData/${id}`,
        method: 'PUT'
    })


    // upload Image
    const uploadFiles = (file, newValue) => {
        //
        if (!file) return;
        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            // setProgress(prog);
        }, (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    putAds({
                        variables: {
                            ...newValue,
                            imageName: file?.name,
                            imageSrc: url,
                        }
                    })
                })
            }
        );

    };


    // console.log(data, error)
    const formik = useFormik({
        initialValues: {
            ...editData,
        },

        validationSchema: SupplySchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {

            // console.log( values, location , "console before update" );
            const newValue = {
                ...values,
                location: location,
            }

            if (imageFile) {
                uploadFiles(imageFile, { ...newValue });
                return
            }

            console.log(newValue , "newValue");
            putAds({ 
                variables: {
                    newValue,                  
                }
            })

        }

    });

    React.useEffect(() => {
        
        if(data?.success){
            
            handleCloseModal();
            console.log(data?.message, error, 'response')
            setRefetch();
            
        }
        
    }, [data])



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




    React.useEffect(async () => {
        await api.get(`/api/cms/adsData/get?page=${page}&limit=${limit}&keyword=${keyword}&location=${location}`).then((res) => {
            console.log(res?.data, "AddUp")

        })
    }, [])

    console.log(imageType);

    return (
        <FormikProvider value={formik} sx={{ alignSelf: 'center', }} >
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Box sx={{
                     position: 'absolute',
                     top: '50%',
                     left: '50%',
                     transform: 'translate(-50%, -50%)',
                     bgcolor: 'background.paper',
                     boxShadow: 24,
                     borderRadius: 7,
                     p: 3
                }}>
                <Title
                    sx={{ fontSize: fTitle, textAlign: 'center' }}
                >
                    Update Ads
                </Title>
                <Box style={boxStyle} sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}
                            display="flex"
                            sx={{ justifyContent: 'center' }}
                        >
                            {imageFile ?
                                <>
                                    {
                                        editData.preview === "" ?
                                            <>
                                                <Stack
                                                    sx={{ alignItems: "center", display: imageFile ? "block" : "none", }}
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
                                            :
                                            <>
                                                <Stack
                                                    sx={{ alignItems: "center", display: imageFile ? "block" : "none", }}
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
                                    }

                                </>

                                :

                                <>
                                    {
                                        editData.preview != "" ?
                                            <>
                                                <Stack sx={{ alignItems: "center", }}  >
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
                                                                src={`${editData?.preview}`}
                                                                style={{ width: "36vh", height: "25vh" }}
                                                                alt="preview"
                                                            />
                                                        </label>
                                                    </Button>
                                                </Stack>
                                            </>
                                            :
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
                                                        <img
                                                            src={pic}
                                                            style={{ width: "36vh", height: "25vh" }}
                                                            alt="preview"
                                                        />
                                                    </label>
                                                </Stack>
                                            </>
                                    }
                                </>
                            }

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

                    
                    <Grid item xs={12} >
                     
                        <Grid container spacing={1}  >                            
                            <Grid item xs={5}>                                    
                                    
                                    {editData?.imageType ?
                                        <>
                                            { imageType ?
                                                    <>
                                                        <Button 
                                                            className={classes.root} 
                                                            sx={{
                                                                background:  imageType === 'thumbnail'  ? '#3f50b5'  : '#FAFAFA',
                                                                color:  imageType === 'thumbnail' ? '#fff'  : '#5B5BF6',
                                                                "&:hover": {
                                                                    background: '#3f50b5',
                                                                    color: '#fff',
                                                                },
                                                            }}
                                                            onClick={() => setImageType('thumbnail')}
                                                        >Thumbnail</Button>
                                                    </>
                                                :
                                                    <>
                                                       <Button 
                                                            className={classes.root} 
                                                            sx={{
                                                                background:  editData?.imageType === "thumbnail"  ? '#3f50b5'  : '#FAFAFA',
                                                                color:  editData?.imageType === "thumbnail" ? '#fff'  : '#5B5BF6',
                                                                "&:hover": {
                                                                    background: '#3f50b5',
                                                                    color: '#fff',
                                                                },
                                                            }}
                                                            onClick={() => setImageType('thumbnail')}
                                                        >Thumbnail</Button>
                                                    </>
                                            }
                                            
                                        </>
                                    :
                                        <>
                                             <Button 
                                                className={classes.root} 
                                                sx={{
                                                    background: imageType === "thumbnail"  ? '#3f50b5'  : '#FAFAFA',
                                                    color: imageType === "thumbnail" ? '#fff'  : '#5B5BF6',
                                                    "&:hover": {
                                                        background: '#3f50b5',
                                                        color: '#fff',
                                                    },
                                                }}
                                                onClick={() => setImageType('thumbnail')}
                                            >Thumbnail</Button>
                                        </>
                                    }
                                        
                            </Grid>
                            <Grid item xs={5}>

                                {editData?.imageType ?
                                        <>
                                            {
                                                imageType ?
                                                    <>
                                                        <Button 
                                                            className={classes.root} 
                                                            sx={{
                                                                background: imageType === "feature image"  ? '#3f50b5'  : '#FAFAFA',
                                                                color: imageType === "feature image" ? '#fff'  : '#5B5BF6',
                                                                "&:hover": {
                                                                    background: '#3f50b5',
                                                                    color: '#fff',
                                                                },
                                                            }}
                                                            onClick={() => setImageType('feature image')}
                                                        >
                                                            Feature image
                                                        </Button>
                                                    </>
                                                :
                                                    <>
                                                        <Button 
                                                            className={classes.root} 
                                                            sx={{
                                                                background:  editData?.imageType === "feature image"  ? '#3f50b5'  : '#FAFAFA',
                                                                color:  editData?.imageType === "feature image" ? '#fff'  : '#5B5BF6',
                                                                "&:hover": {
                                                                    background: '#3f50b5',
                                                                    color: '#fff',
                                                                },
                                                            }}
                                                            onClick={() => setImageType('thumbnail')}
                                                        >Feature image</Button>
                                                    </>                                                    
                                            }                                            
                                        </>
                                    :
                                        <>
                                            <Button 
                                                className={classes.root} 
                                                sx={{
                                                    background: imageType === "feature image"  ? '#3f50b5'  : '#FAFAFA',
                                                    color: imageType === "feature image" ? '#fff'  : '#5B5BF6',
                                                    "&:hover": {
                                                        background: '#3f50b5',
                                                        color: '#fff',
                                                    },
                                                }}
                                                onClick={() => setImageType('feature image')}
                                            >
                                                Feature image
                                            </Button>
                                        </>
                                }

                                
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid xs={12} md={12}>
                    <Grid container spacing={1} >
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
                                onClick={() => {
                                    console.log("close Update");
                                    handleCloseModal()
                                }}
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

            </Box>
            </Form>
        </FormikProvider>
    );
}