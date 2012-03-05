import React, { useState } from 'react';  
import { Container, TextField, Button, Typography, Box, } from '@mui/material';  
import { signIn } from '../../services/api'; // Ensure this is your own sign-in function  
import { auth } from '../../firebase'; // Adjust the path as needed 
import { Link, useNavigate } from 'react-router-dom'; 
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';   

const SignIn: React.FC = () => {  
  const navigate = useNavigate();
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {  
    event.preventDefault();  
    try {  
      const response = await signIn(username, password);  
      const token = response.data.token;  
      localStorage.setItem('token', token);
      localStorage.setItem('userId',response.data.userId);  
      console.log(response.data);  
      navigate("/upload"); 
    } catch (error) {  
      console.error(error);  
    }  
  };  
  
  const handleGoogleSignIn = async () => {  
    const provider = new GoogleAuthProvider();  
    try {  
      const result = await signInWithPopup(auth, provider);  
      const user = result.user;  
      console.log('Google Sign-In successful:', user);  
      const response = await signIn(user.email, user.metadata.creationTime);  
      const token = response.data.token;  
      localStorage.setItem('userId',response.data.userId);  
      localStorage.setItem('token', token);  
      console.log(response.data);  
      navigate("/upload"); 
      // Store user information or token in local storage or state  
    } catch (error) {  
      console.error('Google Sign-In error:', error);  
    }  
  };  

  return (  
    <Container maxWidth="sm">  
      <Box sx={{ mt: 5 }}>  
        <Typography variant="h4" component="h1" gutterBottom>  
          Sign In  
        </Typography>  
        <form onSubmit={handleSubmit}>  
          <TextField   
            label="Username"   
            variant="outlined"   
            fullWidth   
            margin="normal"   
            value={username}  
            onChange={(e) => setUsername(e.target.value)}  
          />  
          <TextField   
            label="Password"   
            type="password"   
            variant="outlined"   
            fullWidth   
            margin="normal"   
            value={password}  
            onChange={(e) => setPassword(e.target.value)}  
          />  
          <Button type="submit" variant="contained" color="primary" fullWidth>  
            Sign In  
          </Button>  
        </form>  
        <Button   
          variant="contained"   
          color="secondary"   
          fullWidth   
          onClick={handleGoogleSignIn}   
          sx={{ mt: 2 }}  
        >  
          Sign In with Google  
        </Button>  
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          {"Don’t have an account yet?"}{" "}
          <Link
            to="/signup"
            className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </Box>  
    </Container>  
  );  
};  

export default SignIn;