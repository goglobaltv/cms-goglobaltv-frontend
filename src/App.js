import './App.css';
import { BrowserRouter as Routers } from 'react-router-dom';
import Router from './Router';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';
import { useState, useEffect } from 'react';
import api from './api/posts'

const theme = createTheme({
  palette: {
    primary: {
      light: '#FAFAFA',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    background: {
      default: "#E7E8FC"
    },
    grey: {
      100: "#f5f5f5",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#ced4da",
      a700: "#616161",
    }
  },
})


function App() {


  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get('/api/cms/users/getUser?page=1&limit=3');
  //       setPosts(response.data);
  //       console.log(response.data)
  //     } catch (err) {
  //       if (err.response) {

  //         console.log(err.response.data);
  //       } else {
  //         console.log(`Error: ${err.message}`);
  //       }
  //     }
  //   }
  //   fetchPosts();
  // }, [])

  return (
    <ThemeProvider theme={theme} >
      <Routers>
        <Router />
      </Routers>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
