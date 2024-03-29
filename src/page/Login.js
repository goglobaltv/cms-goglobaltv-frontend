import React, { useState ,useEffect} from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
    Grid,
    Box,
    Button,
    Link,
    Typography,
    TextField,
} from '@mui/material';
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import api from '../api/posts'
import { useNavigate } from "react-router-dom";
import SetAlertMessage from '../components/Login/SetAlertMessage';

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputBase from '@material-ui/core/InputBase';
import { FormHelperText } from '@mui/material';

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import logoTV from "../image/TV Logo-02-02.svg"
 


function Login() {
    //Alert Message
    const [alert, setAlert] = useState(false)
    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Show and hide password
    const [showPassword, setShowPassord] = useState(false)
    const handleShowPassword = () => {
        setShowPassord(!showPassword)
    }

    const paperStyle = {
        padding: 40,
        // width: "25%",
        // height: '100%',
        borderRadius: 30,
        margin: 7,
        backgroundImage: `linear-gradient(to top, #4838eb, #5334e4, #5c31de, #642dd7, #6a29d1)`,

    }

    const SupplySchema = Yup.object().shape({
        email: Yup.string().required("email is required!"),
        password: Yup.string().required("password is required!"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: SupplySchema,

        onSubmit: async (values, { setSubmitting, resetForm }) => {
            console.log(values , "submit login");
            
            await api.post(`/api/cms/users/login`, values).then(res => {
                console.log(res?.data?.data, "after login")

                if (res?.data?.data?.token) {
                    window.localStorage.setItem("token", res?.data?.data?.token);
                    window.localStorage.setItem("user", res?.data?.data?.userName);
                    setMessage(res.data.data.message);
                    setErrorMessage("success");
                    setAlert(true);
                    setTimeout(() => {
                        // navigate("/");
                        window.location.reload();
                    }, 500)

                } else {
                    window.localStorage.removeItem("token");
                    window.location.reload();
                    // navigate("/");
                }
            })
            .catch((err) => {
                console.error(err.response.data.message);
                setMessage(err.response.data.message);
                setErrorMessage("error");
                setAlert(true)
            })
        },
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
             
       
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Box
                    className="p-0 background-image"
                    fluid={true}
                    sx={{
                        w: "100%",
                        height: "100vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                        <Grid 
                            container
                            spacing={1}
                            display="flex"
                            sx={{ justifyContent: "center" }}
                        >
                            <Grid item xs={9} sm={5.5} md={4} lg={2.8} xl={2.3} style={paperStyle}>
                                
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} >
                                            <Box sx={{ justifyContent: 'center', display: 'flex' }}>
                                                <img src="/TV Logo-02-02.svg" width={"100"} />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sx={{ justifyContent: 'center', display: 'flex' }} >
                                            <Typography variant='subtitle2' sx={{ color: 'white' }} >
                                                LOGIN TO GLOBAL TV
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} align="left">
                                            <Typography sx={{ color: 'white' }}>
                                                email
                                            </Typography>
                                            <FormControl
                                                sx={{ width: "100%" , mt: 1,}}
                                                variant="outlined"
                                            >
                                                <OutlinedInput
                                                    id="outlined-adornment-email"
                                                    sx={{
                                                        backgroundColor: "#e8f0fe",
                                                        borderRadius: 6
                                                    }}
                                                    placeholder='Enter Email'
                                                    {...getFieldProps("email")}                                                   
                                                    error={Boolean(touched.email && errors.email)}
                                                    helperText={touched.email && errors.email} 
                                                                                            
                                                />
                                                {!!errors.email && (
                                                    <FormHelperText error id="outlined-adornment-email">
                                                        {errors.email}
                                                    </FormHelperText>
                                                )}  
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}  >
                                            <Typography sx={{ color: 'white' }} align="left" >
                                                Password
                                            </Typography>

                                            <FormControl
                                                sx={{ width: "100%" , mt: 1,}}
                                                variant="outlined"
                                            >
                                                <OutlinedInput
                                                    sx={{
                                                        backgroundColor: "#e8f0fe",
                                                        borderRadius: 6
                                                    }}
                                                    id="outlined-adornment-password"
                                                    // label="Password"
                                                    type={showPassword ? "text" : "password"}
                                                    {...getFieldProps("password")}
                                                    placeholder='Enter Password'
                                                    error={Boolean(touched.password && errors.password)}
                                                    helperText={touched.password && errors.password}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleShowPassword}
                                                                edge="end"
                                                                sx={{ 
                                                                    color: "#472CC9",
                                                             }}
                                                            >
                                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                />
                                                {/*show request error*/}
                                                {!!errors.password && (
                                                    <FormHelperText error id="outlined-adornment-password">
                                                        {errors.password}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} >
                                            <Typography variant='subtitle2' sx={{ display: 'flex', justifyContent: 'right' }}>
                                                <Link href="#" sx={{ color: 'white' }} >
                                                    You forgot password?
                                                </Link>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                type="submit"
                                                variant='contained'
                                                sx={{
                                                    fontWeight: 'bold',
                                                    color: '#4838eb',
                                                    borderRadius: 7,
                                                    backgroundColor: '#fff',
                                                    padding: 1,
                                                    '&:hover': {
                                                        backgroundColor: '#d6d5ff',
                                                    },
                                                    flexGrow: 2
                                                }}
                                                fullWidth
                                            >
                                                <Typography
                                                    sx={{
                                                        color: '#4838eb',
                                                        flexGrow: 1,
                                                        fontWeight: 'bold',
                                                        textAlign: 'left',
                                                        fontSize: '12px',
                                                        ml: 1,
                                                    }}>
                                                    Log In
                                                </Typography>
                                                <ArrowForwardIcon />
                                            </Button>
                                        </Grid>
                                    </Grid>
                                 
                            </Grid>
                            
                        </Grid>
                     
                    </ Box >
                    <Grid container spacing={5} 
                                sx={{display:"flex", justifyContent: "center" }}>
                                <Grid xs={8} md={12} lg={12} display="flex" flexDirection="column" justifyContent="buttom">
                                    <Typography variant="subtitle2" align="center" color="#4838eb" mt={1}>
                                    @COPYRIGHT GO GLOBAL TV | IT DEPARTMENT
                                    </Typography>
                                </Grid>
                        </Grid>

                </Form>
            </FormikProvider>
             
            <SetAlertMessage alert={alert} setAlert={setAlert} message={message} errorMessage={errorMessage} />
        </>
    )
}

export default Login