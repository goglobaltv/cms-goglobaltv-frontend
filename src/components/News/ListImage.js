import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { Box, Button, FormControlLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';


// Style Component
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 950,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 5,
    p: 4,
    borderRadius: 5,
  };


export default function ListImage({rows , handleClose , setImageUrl , handleAddImageURL }){
    //
    const [url,setURL]= React.useState("");

    const handleCheck = (e , url) => {
        if(e === true ){
            setURL(url);
        }
    }


    const  handleAddUrl= () => {
        handleClose();
        setImageUrl(url);
        handleAddImageURL(url)
    }

    return (
        <>
        
            <Box sx={style}>
                

                <Box  sx={{width:"100%" , mb:"25px" , mr:"10px" , display:"flex" , justifyContent:"right"}}>
                        <Button 
                            sx={{background:"#F5F5F5"}}
                            onClick={handleClose}
                        >
                                <CloseOutlinedIcon sx={{color:"red" , fontSize:"25px" , fontWeight:"40px"}}/>
                        </Button>
                </Box>
                <ImageList sx={{ height: 450 }} cols={3} gap={8}>

                    
                    
                    {rows?.map((item) => (
                            <ImageListItem key={item.preview} >
                                    <img
                                        src={`${item.preview}?w=248&fit=crop&auto=format`}
                                        srcSet={`${item.preview}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                    <ImageListItemBar
                                        title={item.title}
                                        // subtitle={item.author}
                                        actionIcon={
                                            <IconButton
                                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                aria-label={`info about ${item.title}`}
                                            >
                                                {/* CheckBox */}
                                                
                                                <Checkbox
                                                    sx={{color:"#fff"}}
                                                    onChange={ e => {
                                                        handleCheck(e.target.checked, item.preview)                                                   
                                                    }} 
                                                />
                                                                                                
                                                {/* End CheckBox */}

                                            </IconButton>
                                        }
                                    />
                            </ImageListItem>
                    ))}
                </ImageList>                
                                        
                <Box  sx={{width:"100%" , mt:"25px" , mr:"10px" }} >
                        <Button variant="contained" onClick={handleAddUrl} >ADD</Button>
                </Box>


               
            </Box>

        </>
    )
}