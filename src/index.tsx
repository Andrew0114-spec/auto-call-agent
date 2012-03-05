import React from 'react';  
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'  
import App from './App';  
import Layout from './components/Layout';  
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';  

// Create a theme for Material-UI  
const theme = createTheme();  

const root = ReactDOM.createRoot(document.getElementById('root')); // Create root element using createRoot method  
root.render(  
  <ThemeProvider theme={theme}>  
    <CssBaseline />  
    {/* Uncomment Layout if you want to use it */}  
    {/* <Layout /> */}  
    <App />  
  </ThemeProvider>  
);