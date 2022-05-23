import * as React from 'react';
import {
    Box,
    Grid,
    Button,
    Typography,
    InputLabel,
    
} from '@mui/material';
import { withStyles, styled } from "@material-ui/styles";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import TextField from '@mui/material/TextField';
import { makeStyles } from "@material-ui/core/styles";
import api from '../../api/posts';
import { useVCLazyAxios } from 'use-vc-axios'

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
        background: '#FAFAFA',
        width: "100%",
        height: 50,
        borderRadius: 10,
        color: 'black',
        marginTop: 5,
        p: 2
    },
    cate: {
        width: "100%",
    },
});


export default function AddUpdateMedai({id , row}) {
     // Upload Image
    const [imageFile, setImageFile] = React.useState(null);

    const [page, setPage] = React.useState(1)
    const [limit, setLimit] = React.useState(10)
    const [keyword, setKeyword] = React.useState('')
    const [location, setLocation] = React.useState('')
    const classes = useStyles();
     

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    
    //call formik 
    const SupplySchema = Yup.object().shape({
        title: Yup.string().required("title is required!"),

    });
    const { data, error,  operation: putAds } = useVCLazyAxios({
        axiosInstance: api,
        url: `/api/cms/adsData/${id}`,
        method: 'PUT'
    })
// console.log(data, error)
    const formik = useFormik({
        initialValues: {
            title: "",
            imageName: "",
            imageSrc: "",
            status: true,
            location: "",
        },

        validationSchema: SupplySchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {  
            
            console.log( values, location , "console before update" );
            putAds({
                variables: {
                    ...values, 
                    location: location,
                }
            }) 
        } 
          
    });

    console.log(data, error, 'res')
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

            // setFieldValue("title", res?.data.title)
            // setFieldValue("imageName", res?.data.imageName)
            // setFieldValue("imageSrc", res?.data.imageSrc)
            // setFieldValue("status", res?.data.status)
            // setFieldValue("location", res?.data.location)

           
        })
    }, [])

    
    return (
        <FormikProvider value={formik} sx={{ alignSelf: 'center', }} >
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Title
                    sx={{ fontSize: fTitle, textAlign: 'center' }}
                >
                   Update Ads
                </Title>
                <Box style={boxStyle}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}
                            display="flex"
                            sx={{ justifyContent: 'center' }}>
                             <TextField
                                  sx={{ display: "none" }}
                                  fullWidth
                                  type="file"
                                  id="image"
                               
                                />   
                                <Button>
                                  <label for="image">
                                      <img
                                        // src={URL.createObjectURL(imageFile)} 
                                        style={{ width: "36vh", height: "25vh" }}
                                        alt="preview"
                                      />                           
                                  </label>
                                </Button>
                        </Grid>
                        <Grid item xs={12} display="flex" sx={{ justifyContent: 'center' }}>
                            <InputLabel>
                                Update Ads
                            </InputLabel>
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
                            <Grid item xs={4}>
                                <Button className={classes.root} onClick={() => setLocation('topBar')}>Top Bar</Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button className={classes.root} onClick={() => setLocation('sideBar')}>Slide Bar</Button>
                            </Grid>
                            <Grid item xs={4} >
                                <Button className={classes.root} onClick={() => setLocation('body')}>Body</Button>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item xs={12}
                    sx={{
                        display: 'flex'
                    }}>
                    <Grid container alignItems='center'  >
                        <Grid item xs={6}>
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

                        <Grid item xs={6} >
                            <Box sx={{ textAlign: 'center', mt: 5 }}>
                                <Button onClick={handleClose}
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
    );
}