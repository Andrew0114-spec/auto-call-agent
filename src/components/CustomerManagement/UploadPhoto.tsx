import React, { useState } from 'react';  
import { Container, Button, Typography, Box, TextField } from '@mui/material';  
import { uploadPhoto } from '../../services/api';  

const UploadPhoto: React.FC = () => {  
  const [customerId, setCustomerId] = useState('');  
  const [photo, setPhoto] = useState<File | null>(null);  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {  
    if (event.target.files) {  
      setPhoto(event.target.files[0]);  
    }  
  };  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {  
    event.preventDefault();  
    if (photo) {  
      const token = localStorage.getItem('token') || '';  
      try {  
        const response = await uploadPhoto(customerId, photo, token);  
        console.log(response.data);  
      } catch (error) {  
        console.error(error);  
      }  
    }  
  };  

  return (  
    <Container maxWidth="sm">  
      <Box sx={{ mt: 5 }}>  
        <Typography variant="h4" component="h1" gutterBottom>  
          Upload Customer Photo  
        </Typography>  
        <form onSubmit={handleSubmit}>  
          <TextField   
            label="Customer ID"   
            variant="outlined"   
            fullWidth   
            margin="normal"   
            value={customerId}  
            onChange={(e) => setCustomerId(e.target.value)}  
          />  
          <input   
            type="file"   
            accept="image/*"  
            onChange={handleFileChange}  
            style={{ display: 'none' }}  
            id="upload-photo"  
          />  
          <label htmlFor="upload-photo">  
            <Button variant="contained" component="span">  
              Choose Photo  
            </Button>  
          </label>  
          {photo && <Typography variant="body1">{photo.name}</Typography>}  
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>  
            Upload  
          </Button>  
        </form>  
      </Box>  
    </Container>  
  );  
};  

export default UploadPhoto;