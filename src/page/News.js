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
            width: '20ch',
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
    const [keyword, setKeyword] =  React.useState('');
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
        refetch()
    }, [keyword, category])

    React.useEffect(() => {
        if (data) {
            console.log(data.docs, "file News")
            setNews(data.docs)
        }
    }, [data])

    console.log(news , "page News")

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
                                        onClick={() => setCategory('622eef8095d605fd2f3c681a')}
                                        sx={{
                                            background: category === "622eef8095d605fd2f3c681a" ? '#3f50b5'  : '#FAFAFA',
                                            color: category === "622eef8095d605fd2f3c681a" ? '#fff'  : '#5B5BF6',
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
                                    <Button className={classes.root} onClick={() => setCategory('622020fdd0226f986ed9986b')}
                                     sx={{
                                        background: category === "622020fdd0226f986ed9986b" ? '#3f50b5'  : '#FAFAFA',
                                        color: category === "622020fdd0226f986ed9986b" ? '#fff'  : '#5B5BF6',
                                        "&:hover": {
                                            background: '#3f50b5',
                                            color: '#fff',
                                        },
                                    }}
                                    >Education</Button>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button className={classes.root} onClick={() => setCategory('622eef9295d605fd2f3c681d')} 
                                    sx={{
                                        background: category === "622eef9295d605fd2f3c681d" ? '#3f50b5'  : '#FAFAFA',
                                        color: category === "622eef9295d605fd2f3c681d" ? '#fff'  : '#5B5BF6',
                                        "&:hover": {
                                            background: '#3f50b5',
                                            color: '#fff',
                                        },
                                    }}
                                    >Enter..&Tourism</Button>
                                </Grid>
                           
                                <Grid item xs={1.5}>
                                    <Button className={classes.root} onClick={() => setCategory('622013bac24748a67ba9a43b')}
                                    sx={{
                                        background: category === "622013bac24748a67ba9a43b" ? '#3f50b5'  : '#FAFAFA',
                                        color: category === "622013bac24748a67ba9a43b" ? '#fff'  : '#5B5BF6',
                                        "&:hover": {
                                            background: '#3f50b5',
                                            color: '#fff',
                                        },
                                    }}
                                    >Business</Button>
                                </Grid>
                                <Grid item xs={1.5}>
                                    <Button className={classes.root} onClick={() => setCategory('622eefac95d605fd2f3c6824')}
                                    sx={{
                                        background: category === "622eefac95d605fd2f3c6824" ? '#3f50b5'  : '#FAFAFA',
                                        color: category === "622eefac95d605fd2f3c6824" ? '#fff'  : '#5B5BF6',
                                        "&:hover": {
                                            background: '#3f50b5',
                                            color: '#fff',
                                        },
                                    }}
                                    >National</Button>
                                </Grid>
                                <Grid item xs={1.8}>
                                    <Button className={classes.root} onClick={() => setCategory('622eefa295d605fd2f3c6821')}
                                    sx={{
                                        background: category === "622eefa295d605fd2f3c6821" ? '#3f50b5'  : '#FAFAFA',
                                        color: category === "622eefa295d605fd2f3c6821" ? '#fff'  : '#5B5BF6',
                                        "&:hover": {
                                            background: '#3f50b5',
                                            color: '#fff',
                                        },
                                    }}
                                    >International</Button>
                                </Grid>
                                <Grid item xs={1.5}>
                                    <Button className={classes.root} onClick={() => setCategory('622eefb595d605fd2f3c6827')}
                                    sx={{
                                        background: category === "622eefb595d605fd2f3c6827" ? '#3f50b5'  : '#FAFAFA',
                                        color: category === "622eefb595d605fd2f3c6827" ? '#fff'  : '#5B5BF6',
                                        "&:hover": {
                                            background: '#3f50b5',
                                            color: '#fff',
                                        },
                                    }}
                                    >Technology</Button>
                                </Grid>
                                
                            
                       
                                <Grid item xs={1.5}>
                                    <Button className={classes.root} onClick={() => setCategory('6233f1a096938296db02ad02')}
                                    sx={{
                                        background: category === "6233f1a096938296db02ad02" ? '#3f50b5'  : '#FAFAFA',
                                        color: category === "6233f1a096938296db02ad02" ? '#fff'  : '#5B5BF6',
                                        "&:hover": {
                                            background: '#3f50b5',
                                            color: '#fff',
                                        },
                                    }}
                                    >Health</Button>
                                </Grid>
                                <Grid item xs={1.5}>
                                    <Button className={classes.root} onClick={() => setCategory('6233f1bf96938296db02ad05')}
                                    sx={{
                                        background: category === "6233f1bf96938296db02ad05" ? '#3f50b5'  : '#FAFAFA',
                                        color: category === "6233f1bf96938296db02ad05" ? '#fff'  : '#5B5BF6',
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
                    <FormTable news={news} setRefetch={refetch} setLimit={setLimit}/>
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


