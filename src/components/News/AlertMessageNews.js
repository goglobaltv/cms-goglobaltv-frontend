import React from 'react'
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6}
        ref={ref}
        variant="filled"
        {...props}/>;
});


function AlertMessageNews({alert, message, setAlert, checkMessage}) {
    // 
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
        // console.log(alert, "testing ####.....................................")
        if (alert) {
            setOpen(alert);
        }
       setAlert (false);
    }, [alert])


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    // console.log(message, 'message')
    return (
        <>
            <Stack spacing={2}>
              {checkMessage==='success' ?  
              <>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
                    <Alert onClose={handleClose} severity="success">{message}</Alert>                        
                </Snackbar> 
             </> : <></>
              
             }

            { checkMessage === 'error'?  
              <>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
                    <Alert onClose={handleClose} severity="error">{message}</Alert>                        
                </Snackbar> 
             </> : <></>
              
             }


            </Stack>
        </>
    )
}

export default AlertMessageNews
