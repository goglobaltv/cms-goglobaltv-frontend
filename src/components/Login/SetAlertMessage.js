import React from 'react'
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function SetAlertMessage({ alert, message, setAlert, errorMessage }) {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {

        if (alert) {
            setOpen(alert);
        }
        setAlert(false);
    }, [alert])


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <Stack spacing={2} sx={{ width: '100%' }}>
                {errorMessage === "success" ?
                    <>
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
                            <Alert onClose={handleClose} severity="success">You're Login Successful</Alert>
                        </Snackbar>
                    </> : <>
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
                            <Alert onClose={handleClose} severity="error">{message}</Alert>
                        </Snackbar>
                    </>
                }
            </Stack>
        </>
    )
}

export default SetAlertMessage