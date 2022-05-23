import * as React from "react"
import { Divider } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { Typography, Grid, Box, Button, Modal } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import TableMedia from '../components/Media/TableMedia';
import AddAsset from '../components/Media/AddAsset';
import AlertMessageMedia from '../components/Media/AlertMessageMedia';
// import { reach } from 'yup';

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

export default function Media() {

    const [open, setOpen] = React.useState(false);
    const [loading,setLoading] = React.useState(true);
    const [alert, setAlert] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [checkMessage, setcheckMessage] = React.useState("");

    const [keyword,setKeyword] = React.useState("")

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Typography variant='h4' > Media </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={6} >
                    <Search 
                        sx={{
                            borderRadius: 7,
                            justifyContent: 'left',
                            display: 'flex'
                        }} 
                    >
                        <SearchIconWrapper>
                            <SearchIcon sx={{ color: 'grey.400' }} />
                        </SearchIconWrapper>
                        <StyledInputBase
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </Grid>
                <Grid item xs={6} style={gridStyle} >
                    <Button variant='contained' onClick={handleOpen}>Add Asset+</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                    >
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'background.paper',
                            borderRadius: 7,
                            width: 450,
                            p: 5,
                        }}>
                            <AddAsset 
                                handleClose={handleClose} 
                                setLoading={setLoading}
                                setAlert={setAlert}
                                setMessage={setMessage}
                                setcheckMessage={setcheckMessage}
                            />
                        </Box>
                    </Modal>
                </Grid>
                <Grid item xs={12}>
                    <TableMedia 
                        keyword={keyword}
                        loading={loading} 
                        setLoading={setLoading}
                        setAlert={setAlert}
                        setMessage={setMessage}
                        setcheckMessage={setcheckMessage} 
                    />
                </Grid>
            </Grid>

            <AlertMessageMedia alert={alert} setAlert={setAlert} message={message} checkMessage={checkMessage}/>
        </Box>
    )
}
