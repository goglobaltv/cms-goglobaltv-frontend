import React from 'react'
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return (
        <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
    )
});

function AlertMessage({ alert, message, setAlert, typeMessage }) {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {

        if (alert) {
            setOpen(alert);
        }
        setAlert(false);
    }, [alert])


    const handleClose = (event, reason) => {
        if (reason === 'clickway') {
            return;
        }
        setOpen(false);
    }

    return (
        <>
            <Stack sx={{ width: '100%' }}>
                {typeMessage === "success" ?
                    <>
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                            <Alert onClose={handleClose} severity="success" >{message}</Alert>
                        </Snackbar>
                    </> : <> </>}
            </Stack>
        </>
    )
}

export default AlertMessage