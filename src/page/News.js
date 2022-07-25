import React, { useState, useEffect } from 'react'
import { styled, alpha } from '@mui/material/styles';
import { Typography, Grid, Box, Button, Modal } from '@mui/material'
import { Divider } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import FormTable from '../components/News/FormTable';
import { makeStyles } from '@mui/styles';
import AddForm from '../components/News/AddForm';
import api from '../api/posts'
import { useVCAxios } from 'use-vc-axios'


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    color: '#797E7F',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.30),
        color: 'black'
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(0),
        width: 'auto',
        backgroundColor: '#fff',
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
    Input: { color: "inherit" },
    "&:hover": {
        input: {
            color: 'black'
        },
        label: {
            color: 'black'
        }
    },
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '60ch',
        },
    },
}));

const gridStyle = {
    justifyContent: 'right',
    display: 'flex'

}

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    cate: {
        width: "100%",
    },

}));

export default function News() {

    const classes = useStyles();
    const [openNews, setOpenNews] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    const [keyword, setKeyword] =  React.useState("");
    const [category,setCategory] = React.useState('');
    const [news, setNews] = React.useState([])

    
    const handleOpenNews = () => setOpenNews(true);
    const handleCloseNews = () => setOpenNews(false);

    const { data, loading, refetch, error} = useVCAxios({
        axiosInstance: api,
        method: 'GET',
        url: `/api/cms/news/getNews?page=${page}&limit=${limit}&keyword=${keyword}&category=${category}`
    })

    

    React.useEffect(() => {
        console.log(data, "datafile News")
        if (data) {
            // console.log(data.docs, "file News")
            setNews(data.docs)
        }
    }, [data])

    React.useEffect(() => {
        refetch()
    }, [category])

    React.useEffect(() => {
        refetch()
    }, [keyword])

    React.useEffect( () => {
        refetch()
    },[page])

    // console.log(news , "page News")

    return (
        <Box>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Typography variant='h4' > News </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={6} >
                    <Search sx={{ borderRadius: 5 }} >
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search"
                            onChange={(e) => setKeyword(e.target.value)}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </Grid>
                <Grid item xs={6}
                    style={gridStyle}>
                    <Button variant='contained' onClick={handleOpenNews}>Add News</Button>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        
                                <Grid item xs={1.5}>
                                    <Button 
                                        className={classes.cate} 
                                        onClick={() => setCategory('')}
                                        sx={{
                                            background: category === "" ? '#3f50b5'  : '#FAFAFA',
                                            color: category === "" ? '#fff'  : '#5B5BF6',
                                            "&:hover": {
                                                background: '#3f50b5',
                                                color: '#fff',
                                            },
                                        }}
                                    >
                                        All
                                    </Button>
                                </Grid>
                                <Grid item xs={1.5}>
                                    <Button 
                                        className={classes.root} 
                                        onClick={() => setCategory('62de5094cd8db89a82055cc5')}
                                        sx={{
                                            background: category === "62de5094cd8db89a82055cc5" ? '#3f50b5'  : '#FAFAFA',
                                            color: category === "62de5094cd8db89a82055cc5" ? '#fff'  : '#5B5BF6',
                                            "&:hover": {
                                                background: '#3f50b5',
                                                color: '#fff',
                                            },
                                        }}
                                    >
                                            Agriculture
                                            </Button>
                                </Grid>
                                <Grid item xs={1.5}>
                                    <Button className={classes.root} onClick={() => setCategory('62de4ffacd8db89a82055cc2')}
                                     sx={{
                                        background: category === "62de4ffacd8db89a82055cc2" ? '#3f50b5'  : '#FAFAFA',
                                        color: category === "62de4ffacd8db89a82055cc2" ? '#fff'  : '#5B5BF6',
                                        "&:hover": {
                                            background: '#3f50b5',
                                            color: '#fff',
                                        },
                                    }}
                                    >Education</Button>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button className={classes.root} onClick={() => setCategory('62de50a2cd8db89a82055cc8')} 
                                    sx={{
                                        background: category === "62de50a2cd8db89a82055cc8" ? '#3f50b5'  : '#FAFAFA',
                                        color: category === "62de50a2cd8db89a82055cc8" ? '#fff'  : '#5B5BF6',
                                        "&:hover": {
                                            background: '#3f50b5',
                                            color: '#fff',
                                        },
                                    }}
                                    >Enter..&Tourism</Button>
                                </Grid>
                           
                                <Grid item xs={1.5}>
                                    <Button className={classes.root} onClick={() => setCategory('62de50accd8db89a82055ccb')}
                                    sx={{
                                        background: category === "62de50accd8db89a82055ccb" ? '#3f50b5'  : '#FAFAFA',
                                        color: category === "62de50accd8db89a82055ccb" ? '#fff'  : '#5B5BF6',
                                        "&:hover": {
                                            background: '#3f50b5',
                                            color: '#fff',
                                        },
                                    }}
                                    >Business</Button>
                                </Grid>
                                <Grid item xs={1.5}>
                                    <Button className={classes.root} onClick={() => setCategory('62de50c6cd8db89a82055cd1')}
                                    sx={{
                                        background: category === "62de50c6cd8db89a82055cd1" ? '#3f50b5'  : '#FAFAFA',
                                        color: category === "62de50c6cd8db89a82055cd1" ? '#fff'  : '#5B5BF6',
                                        "&:hover": {
                                            background: '#3f50b5',
                                            color: '#fff',
                                        },
                                    }}
                                    >National</Button>
                                </Grid>
                                <Grid item xs={1.8}>
                                    <Button className={classes.root} onClick={() => setCategory('62de50bbcd8db89a82055cce')}
                                    sx={{
                                        background: category === "62de50bbcd8db89a82055cce" ? '#3f50b5'  : '#FAFAFA',
                                        color: category === "62de50bbcd8db89a82055cce" ? '#fff'  : '#5B5BF6',
                                        "&:hover": {
                                            background: '#3f50b5',
                                            color: '#fff',
                                        },
                                    }}
                                    >International</Button>
                                </Grid>
                                <Grid item xs={1.5}>
                                    <Button className={classes.root} onClick={() => setCategory('62de50e4cd8db89a82055cda')}
                                    sx={{
                                        background: category === "62de50e4cd8db89a82055cda" ? '#3f50b5'  : '#FAFAFA',
                                        color: category === "62de50e4cd8db89a82055cda" ? '#fff'  : '#5B5BF6',
                                        "&:hover": {
                                            background: '#3f50b5',
                                            color: '#fff',
                                        },
                                    }}
                                    >Technology</Button>
                                </Grid>
                                
                            
                       
                                <Grid item xs={1.5}>
                                    <Button className={classes.root} onClick={() => setCategory('62de50cfcd8db89a82055cd4')}
                                    sx={{
                                        background: category === "62de50cfcd8db89a82055cd4" ? '#3f50b5'  : '#FAFAFA',
                                        color: category === "62de50cfcd8db89a82055cd4" ? '#fff'  : '#5B5BF6',
                                        "&:hover": {
                                            background: '#3f50b5',
                                            color: '#fff',
                                        },
                                    }}
                                    >Health</Button>
                                </Grid>
                                <Grid item xs={1.5}>
                                    <Button className={classes.root} onClick={() => setCategory('62de50d6cd8db89a82055cd7')}
                                    sx={{
                                        background: category === "62de50d6cd8db89a82055cd7" ? '#3f50b5'  : '#FAFAFA',
                                        color: category === "62de50d6cd8db89a82055cd7" ? '#fff'  : '#5B5BF6',
                                        "&:hover": {
                                            background: '#3f50b5',
                                            color: '#fff',
                                        },
                                    }}
                                    >Sport</Button>
                                </Grid>                          

                    </Grid>
                </Grid>
                {/*call table */}
                <Grid item xs={12} >
                    <FormTable 
                        page={page}
                        setPage={setPage}
                        news={news} 
                        setRefetch={refetch} 
                        setLimit={setLimit}
                        data={data}
                    />
                </Grid>

            </Grid>


            <Modal
                open={openNews}
                onClose={handleCloseNews}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <AddForm handleOpenNews={handleOpenNews} />
            </Modal>

            
        </Box >

    );

}


