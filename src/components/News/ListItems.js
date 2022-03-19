import * as React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FlipMove from 'react-flip-move';
import { TextField , Modal, Button } from '@mui/material';
import Card from '@mui/material/Card';
import { Input, Typography, Stack, CardHeader, CardContent } from '@mui/material';
import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone';
//Firebase
import { ref, listAll , getDownloadURL } from "firebase/storage";
import {storage} from "../../firebase"
import ListImage from './ListImage';
import defaultImage from "../../image/news-default.jpeg"


function ListItems(props) {
    //
    const [imageUrl,setImageUrl] = React.useState(null);
    // const [imageFile,setImageFile] = React.useState();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [key,setKey] = React.useState("");

    const handleAddImageURL = (url) => {        
        console.log(url, key , "Image")
        props.setUpdate(url, key)
    }

    // Get IMage From FireBase
    const [rows,setRows] = React.useState();
    // Create a reference under which you want to list
    const listRef = ref(storage, 'files');   
    // Find all the prefixes and items.
    React.useEffect( () => {
        let rows = [];
        listAll(listRef)
        .then((res) => {           
            res?.items.forEach((itemRef) => {
            
            //Get Name from File
                let pathName = itemRef?._location?.path_ ;
                let ImageName = pathName.split('files/')[1];
            // All the items under listRef.   
                getDownloadURL(itemRef)
                .then((url) => {
                    // Insert url into an <img> tag to "download"                        
                    let allrows = {                                               
                        preview : url ,
                        title : ImageName,                        
                    }                
                    rows.push(allrows);
                    setRows([...rows])
                    // console.log(url)
                })
            });
           
        }).catch((error) => {
            // Uh-oh, an error occurred!
        });

    },[])    
    // console.log(rows, "ListItem")
    // End Get

    const items = props.items;
    const listItems = items?.map(item => {

        // Add Text
        if (item?.Fieldtype === "input") {
            return <Card className="list" key={item?.key} sx={{ width: "100%", mt: 2, }}>
                <CardHeader
                    title={`${item?.check}`}
                />
                <CardContent>
                    <Stack direction="row" spacing={1} >
                        <Input
                            multiline
                            sx={{ width: "90%" ,fontFamily:"Khmer Os Siemreap"}}
                            type="text"
                            id={item?.key}
                            value={item?.text}
                            onChange={(e) => {
                                props.setUpdate(e.target.value, item?.key)
                            }}
                        />

                        <Typography sx={{ mt: 2, display: "flex", flexDirection: "column", justifyContent: "center", color: "red" }}>
                            <DeleteOutlineIcon onClick={() => {
                                props.deleteItem(item?.key)
                            }} icon="trash" />
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        } 
        // End Add Text

        // Update Image By File
        if(item?.check === "Image") {
            return <Card className="list" key={item?.key} sx={{ width: "100%", mt: 2, }}>
                <CardHeader
                    title={`${item?.check}`}
                />
                <CardContent>                    
                    <Stack direction="row" spacing={1} >
                       
                        <TextField                            
                            fullWidth
                            type="file"
                            id="image"
                            // onChange={(e) => setImageFile(e.target.files[0])}
                            onChange={(e) => {
                                props.setUpdateImage(e.target.files[0], item?.key)
                            }} 
                        /> 

                        <Typography sx={{ mt: 2, display: "flex", flexDirection: "column", justifyContent: "center", color: "red" }}>
                            <DeleteOutlineIcon onClick={() => {
                                props.deleteItem(item.key)
                            }} icon="trash" />
                        </Typography>
                    </Stack>

                </CardContent>
            </Card>
        }
        // End Upload

        // Select Image From Firebase
        if(item?.Fieldtype === "inputImage"){
            return <Card className="list" key={item?.key} sx={{ width: "100%", mt: 2, }}>
                <CardHeader
                    title={`${item?.check}`}
                />
                <CardContent>
                    <Stack direction="row" spacing={-1} >
                        {/* <Input                            
                            multiline
                            sx={{ width: "80%" }}
                            type="hidden"
                            id={item.key}
                            value={imageUrl}
                            onChange={(e) => {
                                console.log(imageUrl);
                                props.setUpdate(imageUrl, item.key)
                            }}
                        /> */}
                        {imageUrl ?
                            <>
                                <img
                                    src={`${imageUrl}`} 
                                    style={{ width: "30vh", height: "auto" }}
                                    alt="preview"
                                /> 
                            </>
                        :
                            <>
                                <img
                                    src={`${defaultImage}`} 
                                    style={{ width: "30vh", height: "auto" }}
                                    alt="preview"
                                /> 
                            </>
                        }
                            
                        {/* Button Add Image */}
                        <Typography sx={{ mt: 2, display: "flex", flexDirection: "column", justifyContent: "center", }}>
                            <Button sx={{color: "Green"}}>
                                <AddPhotoAlternateTwoToneIcon onClick={() => { 
                                    handleOpen();   
                                    setKey(item?.key)                                  
                                }} 
                                icon="add" />
                            </Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >                                
                                    <ListImage 
                                        rows={rows}                                                                                 
                                        handleClose={handleClose} 
                                        handleAddImageURL={handleAddImageURL}
                                        setImageUrl={setImageUrl}
                                    />                                
                            </Modal>

                        </Typography>
                        {/* End Button Add Image */}


                        <Typography sx={{ mt: 2, display: "flex", flexDirection: "column", justifyContent: "center",  }}>
                            <Button sx={{color: "red"}}>
                                <DeleteOutlineIcon onClick={() => {
                                    props.deleteItem(item?.key)
                                }} icon="trash" />
                            </Button>
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        }
        // End Selected

    })
    return (
        <>

            <FlipMove duration={300} easing="ease-in-out">
                {listItems}
            </FlipMove>


        </>
    );
}

export default ListItems;