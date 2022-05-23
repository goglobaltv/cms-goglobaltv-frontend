import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Divider, Button, Container, TextField, IconButton, Icon, Stack , Modal} from '@mui/material'
import { makeStyles } from "@mui/styles";
import { v4 as uuidv4 } from 'uuid';
import RemoveButton from "@mui/icons-material/Remove"
import TextareaAutosize from '@mui/material/TextareaAutosize';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CreateTool from "./CreateTool";
import { Markup } from "interweave";
import defualtImage from "../../image/news-default.jpeg"
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { useVCLazyAxios } from 'use-vc-axios'
import api from '../../api/posts';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FormControlUnstyledContext } from "@mui/base";
import { withStyles } from "@material-ui/styles";
import { fontWeight } from "@mui/system";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone';
import { ref, listAll , getDownloadURL } from "firebase/storage";
import {storage} from "../../firebase"
import ListImage from './ListImage';
import defaultImage from "../../image/news-default.jpeg"
import AlertMessageNews from './AlertMessageNews';
import { useVCAxios } from 'use-vc-axios';

// Style Component
const Input = styled('input')({
    display: 'none',
});

const CssTextField = withStyles({
    root: {
        "& .MuiSvgIcon-root": {
          color: "#fff",
        },
        "& .MuiOutlinedInput-input": {   
          padding:5,       
          fontFamily: "Khmer Os Siemreap",
          fontSize:"20px",
          fontWeight:"bold",
        },
        "& .MuiInputLabel-root": {
          color: "#fff",
        },
        "& label.Mui-focused": {
          color: "#fff",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "#fff",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#fff",
          },
          "&:hover fieldset": {
            borderColor: "#fff",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#fff",
          },
        },
      },
  })(TextField);

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
        ton: {
            margin: theme.spacing(1),
        },
    }    
}))

export default function CreateNews() {
    // 
    const userName = window.localStorage.getItem("user");
    let navigate = useNavigate();
    //Alert Message
    const [alert, setAlert] = React.useState(false)
    const [message, setMessage] = React.useState("")
    const [checkMessage, setcheckMessage] = React.useState("")

    const classes = useStyles();
    const [itemNews, setItemNews] = useState([]);
    const [rows, setRows] = useState([]);
     
    // Modal Add THumnial
    const [imageUrl,setImageUrl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);   
    
    const [imageUrlSocial,setImageUrlSocial] = React.useState(null);
    const [openResource, setOpenResource] = React.useState(false);
    const handleOpenResource = () => setOpenResource(true);
    const handleCloseResource = () => setOpenResource(false); 
      
    const handleAddImageURL = (url) => { };

    // Disable Button Submit
    const [checkButton,setCheckButton] = useState(false);
   

    // Get Image 
    const [limit,setLimit] = React.useState(10);
    const [page, setPage] = React.useState(1); 
    const [keyword,setKeyword] = React.useState("");

    const { data: imageData , refetch } = useVCAxios({
        axiosInstance: api,
        method: 'GET',
        url: `api/cms/media/get?page=${page}&limit=${limit}&keyword=${keyword}`,
    })
    	
    
    // End Get Image 

    // Get IMage From FireBase
    const [rowsImage,setRowsImage] = React.useState();
    const listRef = ref(storage, 'files');   

    React.useEffect( () => {
        // console.log(imageData,"image")
        let rows = [];        
        imageData?.docs.forEach( element => {
            let allrows = {                                               
                preview: element?.imageSrc,
                title:  element?.title,                        
            }                
            rows.push(allrows);
            setRowsImage([...rows])
        })                      
               
    },[imageData])    
    
    React.useEffect( () => {
        refetch();       
    },[keyword])

    // ENd THumnial


    //getID Category
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [idCategory, setIdCategory] = useState(null);
    useEffect( async () => {
        await setIdCategory(params.get("id"));
    }, [location.search]);

       
    // Variable Tag HTML
    const [title,setTitle] = useState("");
    const [srcImage,setScrImage] = useState("https://firebasestorage.googleapis.com/v0/b/cms-tv-stroage.appspot.com/o/files%2F033202216e0be5c-4dbf-45d2-8183-2f1a7ca20411270038203_112347667977345_4056045083864308245_n.png?alt=media&token=c6e27435-1bc5-4d31-a94c-58769cccfd5e")

    // API Create News 
    const { data, error, operation:createNews } = useVCLazyAxios({
        axiosInstance: api,
        url: `/api/cms/news/createNews`,
        method: 'POST'
    })

    React.useEffect( async() => {            
        console.log(error)
        console.log(data,"after create")
        if(data?.success){
            console.log(data?.message)  
            setMessage(data?.message);
            setcheckMessage("success");
            setAlert(true);
            setTimeout(() => {
                navigate("/news"); 
            }, 2000);    
                      
        }      
        
    },[data])


    //call formik 
    const Schema = Yup.object().shape({
        title: Yup.string().required("Title is required"),              
    });

    const formik = useFormik({
        initialValues: {
            // title: "",            
        },

        validationSchema: Schema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
                
                // Set Acticle
                let article= "";
               
                if(itemNews){

                    // console.log(itemNews , "After itemNews");
                    let i = 0;
                    let rows = [];
                    itemNews?.forEach( (element) => {

                        let allRows ="";
                        if(element.check === "SubTitle"){
                           allRows += `<div class="Subtitle" ><h4>`+element.text+"</h4></div>";                            
                        }
                        if(element.check === "FontBold"){
                            allRows += `<span class="Subtitle">`+element.text+"</span>";                          
                        } 
                        if(element.check === "Description"){
                            allRows += "<span>"+element.text+"</span>";                          
                        }
                        if(element.check === "List"){
                            allRows += `<div class="ListStyle" ><ul>`+element.text.split('\n').map(t => (`<li>${t}</li>`)).join('')+"</ul></div>";                          
                        }
                        if(element.check === "ImageOneLayout"){
                            allRows += `<div class="ImageView"><img class="ImageStyle" src="`+element?.text+`" alt="preview" /></div>`;                          
                        }
                        if(element.check === "LinkResource"){
                            allRows += `<a href={`+element.text+`} target="_blank">`+element?.text+`</a>`;                          
                        }                        
                        if(element.check === "ImageTwoLayout"){
                            if(i%2 === 0) {
                                allRows += `<div class="ImageViewTwo"><img class="ImageStyleTwo" src="`+element?.text+`" alt="preview" />`;
                                i = i+1;
                            } else {
                                allRows += `<img class="ImageStyleTwo"  src="`+element?.text+`" alt="preview" /></div>`;
                                i = i+1;
                            }                                                      
                        }

                        rows.push(allRows);
                        setRows([...rows]);

                    })

                    console.log(rows, "After Acticle");
                    console.log(rows.join(""));
                    
                    article += rows.join("");
                }

                
                // End Set Article

                const newValue = {
                    newsCategory: idCategory,
                    status: "Draft",
                    author: userName,
                    title: "<h5>"+values?.title+"</h5>",
                    thumbnail: imageUrl,
                    socialMediaThumbnail: imageUrlSocial,
                    article: "<div>"+article+"</div>",
                    articleForCMS: itemNews,
                }     

                console.log(newValue)
                setCheckButton(true)

                createNews({ 
                    variables:newValue
                })               
            
        }

    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setFieldValue, resetForm } = formik;

    
    return (
        <Box>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Stack direction="row" spacing={2}>
                        <Link to="/news" style={{ textDecoration : "none"}} ><Typography variant='h4' >News</Typography></Link>
                        <Typography variant='h4' >/ Create New</Typography>
                    </Stack>
                    
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={0}>                        
                        <Grid item xs={4}>   
                            <Grid container spacing={5}>  
                                <Grid item xs={12}>
                                    <Typography
                                        variant='h5'
                                        sx={{
                                            textAlign: 'center',
                                            width: "70%",
                                            paddingBottom: 2,
                                            fontWeight: 'bold',
                                        }}>
                                        Thumbnail News
                                    </Typography>

                                    {/* Button Add Thumnal */}
                                    
                                        {imageUrl !== null ?
                                            <>   
                                            <Box sx={{width:"100%"}}>                                            
                                                <Button  onClick={() => handleOpen()}>
                                                    <label for="image">                                          
                                                        <img
                                                            src={`${imageUrl}`} 
                                                            style={{ width: "100%", height: "25vh" }}
                                                            alt="preview"
                                                        />                                                
                                                    </label>    
                                                </Button>
                                            </Box> 
                                            </>
                                        :
                                            <>
                                            <Box sx={{width:"100%"}}>
                                                <Button sx={{color: "Green"}}  onClick={() => handleOpen()} >                                        
                                                        <img
                                                            src={`${defaultImage}`} 
                                                            style={{ width: "100%", height: "25vh" }}
                                                            alt="preview"
                                                        />                                                
                                                    
                                                </Button>
                                            </Box>
                                            </>
                                            
                                        }          
                                        
                                        {/* <Button sx={{color: "Green"}} id="image" onClick={() => handleOpen()} >
                                            <AddPhotoAlternateTwoToneIcon />
                                        </Button> */}
                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >                                
                                                <ListImage 
                                                    setKeyword={setKeyword}
                                                    rows={rowsImage}                                                                                 
                                                    handleClose={handleClose}                                                     
                                                    setImageUrl={setImageUrl}
                                                    handleAddImageURL={handleAddImageURL}
                                                />                                
                                        </Modal>
                                    {/* End THumnail */}
                                </Grid>   

                                <Grid item xs={12}>
                                    <Typography
                                        variant='h5'
                                        sx={{
                                            textAlign: 'center',
                                            width: "70%",
                                            paddingBottom: 2,
                                            fontWeight: 'bold',
                                        }}>
                                        Social Thumbnail
                                    </Typography>

                                    {/* Button Add Social Thumnal */}
                                    
                                        {imageUrlSocial !== null ?
                                            <>   
                                            <Box sx={{width:"100%"}}>                                            
                                                <Button  onClick={() => handleOpenResource()}>
                                                    <label for="image">                                          
                                                        <img
                                                            src={`${imageUrlSocial}`} 
                                                            style={{ width: "100%", height: "25vh" }}
                                                            alt="preview"
                                                        />                                                
                                                    </label>    
                                                </Button>
                                            </Box> 
                                            </>
                                        :
                                            <>
                                            <Box sx={{width:"100%"}}>
                                                <Button sx={{color: "Green"}}  onClick={() => handleOpenResource()} >                                        
                                                        <img
                                                            src={`${defaultImage}`} 
                                                            style={{ width: "100%", height: "25vh" }}
                                                            alt="preview"
                                                        />                                               
                                                </Button>
                                            </Box>
                                            </>
                                            
                                        }          
                                        
                                        {/* <Button sx={{color: "Green"}} id="image" onClick={() => handleOpen()} >
                                            <AddPhotoAlternateTwoToneIcon />
                                        </Button> */}
                                        <Modal
                                            open={openResource}
                                            onClose={handleCloseResource}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >                                
                                                <ListImage 
                                                    setKeyword={setKeyword}
                                                    rows={rowsImage}                                                                                 
                                                    handleClose={handleCloseResource}                                                     
                                                    setImageUrl={setImageUrlSocial}
                                                    handleAddImageURL={handleAddImageURL}
                                                />                                
                                        </Modal>
                                    {/* End Social THumnail */}
                                </Grid> 


                                <Grid item xs={12}>
                                    <Typography
                                        variant='h5'
                                        sx={{
                                            textAlign: 'center',
                                            width: "70%",
                                            paddingBottom: 2,
                                            fontWeight: 'bold',
                                        }}>
                                        Create News Tool
                                    </Typography>
                                    {/* <TableCreater /> */}
                                    <CreateTool setItemNews={setItemNews} />
                                </Grid>

                            </Grid>
                        </Grid>
                        <Grid item xs={8}>
                            <Container>
                                <Card sx={{ maxWidth: "100%", p: 2 }}>

                                <FormikProvider value={formik} sx={{ alignSelf: 'center', }} >
                                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>                          

                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <CssTextField
                                                    multiline
                                                    fullWidth
                                                    // label="example@email.com"
                                                    {...getFieldProps("title")}
                                                    error={Boolean(touched.title && errors.title)}
                                                    helperText={touched.title && errors.title}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <Typography sx={{fontSize:"26px",fontWeight:"bold" , mt:-1}}>Title:</Typography>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                            {
                                                itemNews.map((i) => (

                                                    <span>                                                        
                                                        {i.check === "SubTitle" ?  <Markup content={`<div style="margin-top:10px;margin-bottom:10px;font-family:Khmer Os Siemreap " ><h4>${i.text}</h4></div>`} />  : <></> }
                                                        {i.check === "FontBold" ? <Markup content={`<span style="font-weight:bold;font-family:Khmer Os Siemreap">${i.text}</span>`} /> : <></>}
                                                        {i.check === "Description" ? <Markup content={`<span style="font-family:Khmer Os Siemreap">${i.text}</span>`} /> : <></>}
                                                        {i.check === "List" ?
                                                            <Markup content={`<div style="margin: 25px;"><ul >  
                                                            ${i.text.split('\n').map(t => (`<li style="margin:6px;font-family:Khmer Os Siemreap">${t}</li>`)).join('')}
                                                            </ul></div>`} /> : <></>
                                                        }

                                                        { i.img ?
                                                                <> 
                                                                    <div>                                                            
                                                                        <img
                                                                            src={URL.createObjectURL(i.img)} 
                                                                            style={{ width: "36vh", height: "25vh" }}
                                                                            alt="preview"
                                                                        /> 
                                                                    </div>   
                                                                </>
                                                            :
                                                            <></>
                                                        }
                                                        { i.check === "ImageOneLayout" ?
                                                                <>                                                                
                                                                    <img
                                                                        src={`${i.text}`} 
                                                                        style={{ width: "80vh", height: "auto" ,marginLeft: "15px" , marginTop: "25px" }}
                                                                        alt="preview"
                                                                    />  
                                                                </>
                                                            :
                                                            <></>
                                                        }

                                                        { i.check === "ImageTwoLayout" ?
                                                                <>  
                                                                                                                                                                                             
                                                                    <img
                                                                        src={`${i.text}`} 
                                                                        style={{ width: "40%", height: "auto" }}
                                                                        alt="preview"
                                                                    />                                                                          
                                                                     
                                                                </>
                                                            :
                                                            <></>
                                                        }

                                                        { i.check === "LinkResource" ?
                                                                <>  
                                                                    <a href={`${i.text}`} target="_blank">{i.text}</a>
                                                                </>
                                                            :
                                                            <></>
                                                        }

                                                    </span>
                                                ))
                                            }
                                            
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button            
                                                    disabled={ checkButton === false ? "" : "disabled"}                                                   
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                    endIcon={<Icon>send</Icon>}                                                
                                                >
                                                    POST
                                                </Button>
                                            </Grid>
                                        </Grid>

                                    </Form> 
                                </FormikProvider>                       
                                 

                                </Card>
                            </Container>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {/* <TableCreater /> */}
                </Grid>
            </Grid>

            <AlertMessageNews  alert={alert} setAlert={setAlert} message={message} checkMessage={checkMessage} />


        </Box>
    );
}
