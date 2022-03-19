import *as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Typography, Grid, Box, Button, Modal, Stack } from '@mui/material'
import { Divider } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { makeStyles } from '@mui/styles';
import Add_Ads from '../components/Ads/Add_Ads';
import TableAdverti from '../components/Ads/TableAdverti';
import { useVCAxios } from 'use-vc-axios'
import api from '../api/posts'
import AlertMessageAds from '../components/Ads/AlertMessageAds';


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
            width: '20ch',
        },
    },
}));

const gridStyle = {
    justifyContent: 'right',
    display: 'flex'

}

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
    cate: {
        width: "100%",
    },
});



export default function Ads() {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openNews, setOpenNews] = React.useState(false);
    const [page, setPage] = React.useState(1)
    const [limit, setLimit] = React.useState(10)
    const [keyword, setKeyword] = React.useState('')
    const [location, setLocation] = React.useState('')
    const [post, setPost] = React.useState([])

     //Alert Message
     const [alert, setAlert] = React.useState(false)
     const [message, setMessage] = React.useState("")
     const [checkMessage, setcheckMessage] = React.useState("")

    const handleOpenNews = () => setOpenNews(true);
    const handleCloseNews = () => setOpenNews(false);

    const { data, loading, refetch, error } = useVCAxios({
        axiosInstance: api,
        method: 'GET',
        url: `/api/cms/adsData/get?page=${page}&limit=${limit}&keyword=${keyword}&location=${location}`
    })

    React.useEffect(() => {
        refetch()
    }, [keyword, location])

    React.useEffect(() => {
        if (data) {
            console.log(data, "file Ads")
            setPost(data.docs)
        }
    }, [data])

    return (
        <Box>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Typography variant='h4' > Advertisement </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>

                <Grid item xs={6} >
                    <Search sx={{ borderRadius: 5 }} >
                        <SearchIconWrapper>
                            <SearchIcon sx={{ color: 'grey.400' }} />
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
                    <Button variant='contained' onClick={handleOpenNews}> + Add Ads</Button>
                    <Modal
                        open={openNews}
                        onClose={handleCloseNews}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            borderRadius: 7,
                            p: 3,
                        }}>
                            <Add_Ads 
                                setRefetch={refetch}  
                                handleCloseNews={handleCloseNews} 
                                setMessage={setMessage} 
                                setAlert={setAlert} 
                                setcheckMessage={setcheckMessage}  
                            />
                        </Box>
                    </Modal>
                </Grid>

                <Grid item xs={6} >
                    <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={3} >
                            <Button className={classes.root}
                                disableElevation
                                onClick={() => setLocation('')}
                                sx={{
                                    background: location === "" ? '#3f50b5'  : '#FAFAFA',
                                    color: location === "" ? '#fff'  : '#5B5BF6',
                                    "&:hover": {
                                        background: '#3f50b5',
                                        color: '#fff',
                                    },
                                }}
                                >
                                    All 
                                </Button>
                        </Grid>
                        <Grid item xs={3} >
                            <Button className={classes.root} onClick={() => setLocation('topBar')}
                            sx={{
                                background: location === "topBar" ? '#3f50b5'  : '#FAFAFA',
                                color: location === "topBar" ? '#fff'  : '#5B5BF6',
                                "&:hover": {
                                    background: '#3f50b5',
                                    color: '#fff',
                                },
                            }}
                            >
                                Top Bar
                            </Button>
                        </Grid>
                        <Grid item xs={3} >
                            <Button className={classes.root} onClick={() => setLocation('sideBar')}
                            sx={{
                                background: location === "sideBar" ? '#3f50b5'  : '#FAFAFA',
                                color: location === "sideBar" ? '#fff'  : '#5B5BF6',
                                "&:hover": {
                                    background: '#3f50b5',
                                    color: '#fff',
                                },
                            }}
                            >
                                Side Bar
                            </Button>
                        </Grid>
                        <Grid item xs={3} >
                            <Button className={classes.root} onClick={() => setLocation('body')}
                            sx={{
                                background: location === "body" ? '#3f50b5'  : '#FAFAFA',
                                color: location === "body" ? '#fff'  : '#5B5BF6',
                                "&:hover": {
                                    background: '#3f50b5',
                                    color: '#fff',
                                },
                            }}
                            >
                                Body
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TableAdverti 
                        post={post} 
                        setRefetch={refetch} 
                        setMessage={setMessage} 
                        setAlert={setAlert} 
                        setcheckMessage={setcheckMessage}
                    />
                </Grid>
            </Grid>
            <AlertMessageAds alert={alert} setAlert={setAlert} message={message} checkMessage={checkMessage}/>
        </Box >
    );
}
