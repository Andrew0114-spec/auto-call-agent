import React, { useState } from 'react';  
import { Container, TextField, Button, Typography, Box } from '@mui/material';  
import axios from 'axios';  

const ScheduleCall: React.FC = () => {  
  const [customerId, setCustomerId] = useState('');  
  const [time, setTime] = useState('');  
  const [purpose, setPurpose] = useState('');  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {  
    event.preventDefault();  
    const token = localStorage.getItem('token') || '';  
    try {  
      const response = await axios.post('http://localhost:3000/calls/schedule', { customerId, time, purpose }, {  
        headers: {  
          'Authorization': `Bearer ${token}`,  
        },  
      });  
      console.log(response.data);  
    } catch (error) {  
      console.error(error);  
    }  
  };  

  return (  
    <Container maxWidth="sm">  
      <Box sx={{ mt: 5 }}>  
        <Typography variant="h4" component="h1" gutterBottom>  
          Schedule a Call  
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
          <TextField   
            label="Time"   
            variant="outlined"   
            fullWidth   
            margin="normal"   
            type="datetime-local"  
            value={time}  
            onChange={(e) => setTime(e.target.value)}  
          />  
          <TextField   
            label="Purpose"   
            variant="outlined"   
            fullWidth   
            margin="normal"   
            value={purpose}  
            onChange={(e) => setPurpose(e.target.value)}  
          />  
          <Button type="submit" variant="contained" color="primary" fullWidth>  
            Schedule  
          </Button>  
        </form>  
      </Box>  
    </Container>  
  );  
};  

export default ScheduleCall;