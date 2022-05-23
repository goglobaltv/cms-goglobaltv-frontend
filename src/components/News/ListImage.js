import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { Box, Button, FormControlLabel, Stack } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { connectStorageEmulator } from 'firebase/storage';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(0),
        width: 'auto',
        backgroundColor: '#f5f5f5',
        borderRadius: 7,
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '30ch',
        },
    },
}));

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


export default function ListImage({ setKeyword , rows , handleClose , setImageUrl , handleAddImageURL }){
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
                
                <Stack direction="row" spacing={5} sx={{ mb:"25px" , mr:"10px" }}>
                        <Search  sx={{ borderRadius: 7, justifyContent: 'left', display: 'flex' }} >
                            <SearchIconWrapper>
                                <SearchIcon sx={{ color: 'grey.400' }} />
                            </SearchIconWrapper>
                            <StyledInputBase
                                onChange={(e) => setKeyword(e.target.value) }
                                placeholder="Search"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        <Box sx={{flexGrow: 1}}></Box>
                        <Box  sx={{width:"10%" , display:"flex" , justifyContent:"right"}}>
                                <Button 
                                    sx={{background:"#F5F5F5"}}
                                    onClick={handleClose}
                                >
                                        <CloseOutlinedIcon sx={{color:"red" , fontSize:"25px" , fontWeight:"40px"}}/>
                                </Button>
                        </Box>
                </Stack>
                
                <ImageList sx={{ height: 450 }} cols={3} gap={8}>

                    
                    
                    {rows?.map((item,index) => (
                            <ImageListItem key={item.index} >
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