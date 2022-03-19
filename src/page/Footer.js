import * as React from 'react'
import { Typography, Grid, Box, Button, Stack, InputLabel, Container } from '@mui/material'
import Divider from '@mui/material/Divider';
import { withStyles, styled } from "@material-ui/styles";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import TextField from '@mui/material/TextField';
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from '@mui/material/InputAdornment';
import AlertMessage from '../components/Footer/AlertMessage';
import api from '../api/posts'

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
    },
})(TextField);

const CssAboutText = withStyles({
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
                borderRadius: 15,
                border: "2px dashed #e0e0e0",

            },
            "&:hover fieldset": {
                borderColor: "black",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#424242",
            },
        },
    },
})(TextField);

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiFilledInput-root": {
            backgroundColor: '#e0e0e0'
        }
    },
    body: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 20,
    }
}));

export default function Footer() {
    
    const classes = useStyles();
    const [alert, setAlert] = React.useState(false)
    const [message, setMessage] = React.useState("")
    const [typeMessage, setTypeMessage] = React.useState("")

    const SupplySchema = Yup.object().shape({
        email: Yup.string().required("email is required!"),
        tell: Yup.string().required("tell is required!"),
        address: Yup.string().required("address is required!"),
        aboutUs: Yup.string().required("aboutUs is required!"),
        facebook: Yup.string(),
        instagram: Yup.string(),
        telegrame: Yup.string(),
        youtube: Yup.string(),
        tiktok: Yup.string()
    });

    const formik = useFormik({
        initialValues: {},
        validationSchema: SupplySchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            console.log(values);
            await api.put('/api/cms/footer/editFooter', values).then((res) => {
                console.log(res.data.message)
                setMessage(res.data.message)
                setTypeMessage('success')
                setAlert(true)
            })
        },
    });

    const {
        values,
        errors,
        touched,
        dirty,
        isSubmitting,
        handleSubmit,
        getFieldProps,
        setFieldValue,
        resetForm,
    } = formik;

    React.useEffect(async () => {
        await api.get('/api/cms/footer/getFooter').then((res) => {
            console.log(res?.data[0], "footer")
            setFieldValue("email", res?.data[0].email)
            setFieldValue("tell", res?.data[0].tell)
            setFieldValue("address", res?.data[0].address)
            setFieldValue("aboutUs", res?.data[0].aboutUs)
            setFieldValue("facebook", res?.data[0].facebook)
            setFieldValue("instagram", res?.data[0].instagram)
            setFieldValue("telegrame", res?.data[0].telegrame)
            setFieldValue("youtube", res?.data[0].youtube)
            setFieldValue("tiktok", res?.data[0].tiktok)
        })
    }, [])

    return (
            <Box >
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Typography variant='h4'> Footer </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Box className={classes.body}>
                        <Grid container>
                            <Grid item xs={8} sx={{ px: 0, py: 3 }}>
                                <Container sx={{ alignItems: 'center'}}>
                                    <Box sx={{ textAlign: "center", mb: 2}}>
                                        <Typography variant="h4" component="h3" sx={{ fontWeight: 'bold' }}>
                                            Contact Us
                                        </Typography>
                                        <Typography sx={{ fontSize: 12 }}>
                                            Anyone question or marks? Just writeus a message
                                        </Typography>
                                    </Box>
                                    <FormikProvider value={formik} sx={{ alignSelf: 'center', }} >
                                        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={6}>
                                                    <Box>
                                                        <InputLabel>
                                                            Email
                                                        </InputLabel>
                                                        <CssTextField
                                                            fullWidth
                                                            {...getFieldProps("email")}
                                                            error={Boolean(
                                                                touched.email && errors.email
                                                            )}
                                                            helperText={touched.email && errors.email}
                                                        />
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Box>
                                                        <InputLabel>
                                                            Phone Number
                                                        </InputLabel>
                                                        <CssTextField
                                                            fullWidth
                                                            {...getFieldProps("tell")}
                                                            error={Boolean(
                                                                touched.tell && errors.tell
                                                            )}
                                                            helperText={touched.tell && errors.tell}
                                                        />
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                            <Box sx={{ mt: 2 }}>
                                                <InputLabel>
                                                    Address
                                                </InputLabel>
                                                <CssTextField
                                                    fullWidth
                                                    {...getFieldProps("address")}
                                                    error={Boolean(
                                                        touched.address && errors.address
                                                    )}
                                                    helperText={touched.address && errors.address}
                                                />
                                            </Box>
                                        </Form>
                                    </FormikProvider>
                                    <Box sx={{ textAlign: "center", mt: 3, mb: 5 }}>
                                        <Typography variant="h4" component="h3" sx={{ fontWeight: 'bold' }}>
                                            Contact Us
                                        </Typography>
                                        <Typography sx={{ fontSize: 12, }}>
                                            Anyone question or marks? Just writeus a message
                                        </Typography>
                                    </Box>
                                    <Box sx={{ height: 100 }}>
                                        <CssAboutText
                                            rows={8}
                                            multiline
                                            fullWidth
                                            {...getFieldProps("aboutUs")}
                                            error={Boolean(
                                                touched.aboutUs && errors.aboutUs
                                            )}
                                            helperText={touched.aboutUs && errors.aboutUs}
                                        />
                                    </Box>
                                </Container>
                            </Grid>
                            <Grid item xs={4} sx={{ pr: 0, py: 3 }}>
                                <Container>
                                    <Box sx={{ marginBottom: 1 }}>
                                        <Typography variant="h4" component="h3" sx={{ fontWeight: 'bold' }}>
                                            FollowUs
                                        </Typography>
                                        <Typography sx={{ fontSize: 12 }}>
                                            Anyone question or marks?
                                        </Typography>
                                    </Box>
                                    <FormikProvider value={formik} sx={{ alignSelf: 'center' }} >
                                        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                                            <Box sx={{ mt: 1 }}>
                                                <InputLabel>
                                                    Facebook Link
                                                </InputLabel>
                                                <CssTextField
                                                    placeholder='https:'
                                                    fullWidth
                                                    {...getFieldProps("facebook")}
                                                    error={Boolean(
                                                        touched.facebook && errors.facebook
                                                    )}
                                                    helperText={touched.facebook && errors.facebook}
                                                />
                                            </Box>
                                            <Box sx={{ mt: 1 }}>
                                                <InputLabel>
                                                    Instagram Link
                                                </InputLabel>
                                                <CssTextField
                                                    placeholder='https:'
                                                    fullWidth
                                                    {...getFieldProps("instagram")}
                                                    error={Boolean(
                                                        touched.instagram && errors.instagram
                                                    )}
                                                    helperText={touched.instagram && errors.instagram}
                                                />
                                            </Box>
                                            <Box sx={{ mt: 1 }}>
                                                <InputLabel>
                                                    Telegram Link
                                                </InputLabel>
                                                <CssTextField
                                                    placeholder='https:'
                                                    fullWidth
                                                    {...getFieldProps("telegrame")}
                                                    error={Boolean(
                                                        touched.telegrame && errors.telegrame
                                                    )}
                                                    helperText={touched.telegrame && errors.telegrame}

                                                />
                                            </Box>
                                            <Box sx={{ mt: 1 }}>
                                                <InputLabel>
                                                    Youtube Link
                                                </InputLabel>
                                                <CssTextField
                                                    placeholder='https:'
                                                    fullWidth
                                                    {...getFieldProps("youtube")}
                                                    error={Boolean(
                                                        touched.youtube && errors.youtube
                                                    )}
                                                    helperText={touched.youtube && errors.youtube}

                                                />
                                            </Box>
                                            <Box sx={{ mt: 1 }}>
                                                <InputLabel>
                                                    Tik Tok Link
                                                </InputLabel>
                                                <CssTextField
                                                    fullWidth
                                                    placeholder='https:'
                                                    {...getFieldProps("tiktok")}
                                                    error={Boolean(
                                                        touched.tiktok && errors.tiktok
                                                    )}
                                                    helperText={touched.tiktok && errors.tiktok}

                                                />
                                            </Box>
                                            <Box sx={{ textAlign: 'center', mt: 4 }}>
                                                <Button
                                                    type="submit"
                                                    size="large"
                                                    variant="contained"
                                                    disabled={isSubmitting}
                                                    sx={{
                                                        backgroundColor: "#5B5BF6",
                                                        "&:hover": {
                                                            backgroundColor: "#5B5BF6",
                                                        },
                                                    }}
                                                >
                                                    SAVE ALL
                                                </Button>
                                                <Typography sx={{ fontSize: 12, mt: 2, textAlign: 'center' }}>
                                                    This is for saving all of contact, about and follow us!
                                                </Typography>
                                            </Box>
                                        </Form>
                                    </FormikProvider>
                                </Container>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            <AlertMessage alert={alert} setAlert={setAlert} message={message} typeMessage={typeMessage} />
        </Box>
    )
}

