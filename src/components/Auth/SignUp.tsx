import React, { useState } from 'react';  
import { Container, TextField, Button, Typography, Box } from '@mui/material';  
import { signUp } from '../../services/api';  
import { auth } from '../../firebase'; // Import your Firebase initialization  
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; 
import { useNavigate } from "react-router-dom";  

const SignUp: React.FC = () => {  
  const navigate = useNavigate();
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {  
    event.preventDefault();  
    try {  
      const response = await signUp(username, password);  
      console.log(response.data);
      navigate("/signin");  
      // Handle successful sign up, e.g., redirect to login  
    } catch (error) {  
      console.error(error);  
    }  
  };  

  const handleGoogleSignUp = async () => {  
    const provider = new GoogleAuthProvider();  
    try {  
      const result = await signInWithPopup(auth, provider);  
      const user = result.user; // User info from Google  
      console.log("Google User: ", user);
      const response = await signUp(user.email, user.metadata.creationTime);
      navigate("/signin");  
      // Handle successful Google Sign Up, e.g., save user info to your backend  
    } catch (error) {  
      console.error("Google Sign-In Error: ", error);  
    }  
  };  

  return (  
    <Container maxWidth="sm">  
      <Box sx={{ mt: 5 }}>  
        <Typography variant="h4" component="h1" gutterBottom>  
          Sign Up  
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
            Sign Up  
          </Button>  
        </form>  

        {/* Google Sign-Up Button */}  
        <Button  
          variant="contained"  
          color="secondary"  
          fullWidth  
          sx={{ mt: 2 }}  
          onClick={handleGoogleSignUp}  
        >  
          Sign Up with Google  
        </Button>  
      </Box>  
    </Container>  
  );  
};  

export default SignUp;