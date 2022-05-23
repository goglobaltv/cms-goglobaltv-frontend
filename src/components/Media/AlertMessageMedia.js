import React from 'react'
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return (
        <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
    )
});

function AlertMessageMedia({ alert, message, setAlert, checkMessage }) {

    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (alert) {
            setOpen(true);
        }
        setTimeout(() => {
            setOpen(false);
            setAlert(false);
        },1200)

    }, [alert])


    const handleClose = (event, reason) => {
        if (reason === 'clickway') {
            return;
        }
        setOpen(false);
    }

    return (
        <>
            { checkMessage === "success" ?
                <>                   
                    <Stack sx={{ width: '100%' }}>                    
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                            <Alert onClose={handleClose} severity="success" >{message}</Alert>
                        </Snackbar>
                    </Stack>
                </> 
            : 
                null
            }          

            { checkMessage === "error" ?
                <>                   
                    <Stack sx={{ width: '100%' }}>                    
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                            <Alert onClose={handleClose} severity="error" >{message}</Alert>
                        </Snackbar>
                    </Stack>
                </> 
            : 
                null
            }   

        </>
    )
}

export default AlertMessageMedia
