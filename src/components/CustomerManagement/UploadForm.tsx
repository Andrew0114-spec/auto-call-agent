import React, { useState, useEffect } from 'react';  
import { loadCustomerData, createCustomer, uploadPhoto, updateCustomer, deleteCustomer, makeCall } from '../../services/api';  
import {   
  Box,   
  Container,   
  Grid,   
  Typography,   
  Paper,   
  Button,   
  Avatar,   
  TableContainer,   
  TableCell,   
  Table,   
  TableHead,   
  TableBody,   
  TableRow,   
  TextField,   
  Modal,   
  Select,   
  MenuItem,   
  IconButton,  
  Dialog,  
  DialogActions,  
  DialogContent,  
  DialogContentText,  
  DialogTitle  
} from '@mui/material'; 
import CloudUploadIcon from '@mui/icons-material/CloudUpload';  
import PhoneIcon from '@mui/icons-material/Phone';  
import EditIcon from '@mui/icons-material/Edit';  
import DeleteIcon from '@mui/icons-material/Delete'; 
import Papa from 'papaparse';  


const UploadForm: React.FC = () => {  
  const BASE_API ="http://localhost:8000" ;
  const token = localStorage.getItem('token');
  const [customers, setCustomers] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddAgentModalOpen, setIsAddAgentModalOpen] = useState(false);  
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);  
  const [customerIdToDelete, setCustomerIdToDelete] = useState(null);
  
  useEffect(() => {  
    loadCustomersData();  
  }, []);  
  
  const loadCustomersData = async () => {  
    setIsLoading(true);  
    try {  
      const response = await loadCustomerData(localStorage.getItem('userId'), token);
      setCustomers(response.data) ; 
      console.log(response.data);
    } catch (error) {  
      console.error('Failed to load agents:', error);  
    }  
    setIsLoading(false);  
  };  
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {  
    const file = event.target.files?.[0];  
    if (file) {  
      Papa.parse(file, {  
        complete: async (results) => {  
          const data = results.data as string[][];
          console.log(data);  
          try {  
            for (let i = 0; i < data.length; i++) {  
              const customerData = {  
                userId: localStorage.getItem("userId"),  
                personName: data[i][0],  
                personNumber: data[i][1],  
                companyName: data[i][2],  
                companyAddress: data[i][3],  
                imageUrl: data[i][4] || null,  
              };  
              await createCustomer(customerData, token);  
            }  
            const response = await loadCustomerData(localStorage.getItem("userId"), token); 
            setCustomers(response.data);
          } catch (error) {  
            console.error('Failed to register agents', error);  
          }  
        },  
        header: false,  
      });  
    }  
  };

  const handleEdit = (customer) => {  
    setSelectedCustomer(customer);  
    setIsModalOpen(true);  
  }; 
  const handleCall = async (customer) => { 
    if(customer.conversationPurpose==""||customer.personNumber==""){
      return false;
    } 
    else{
      try {  
        await makeCall(customer._id, customer.conversationPurpose, token);  
      } catch (error) {  
        console.error('Failed to update agent', error);  
      }  
    }
  }; 
  const handleDeleteClick = (customerId) => {  
    setCustomerIdToDelete(customerId);  
    setDeleteConfirmationOpen(true);  
  };  

  const handleDeleteConfirm = async () => {  
    setDeleteConfirmationOpen(false);  
    try {  
      await deleteCustomer(customerIdToDelete, token);
      loadCustomersData();
    } catch (error) {  
      console.error('Failed to delete agent', error);  
    }  
  };
  const handleDeleteCancel = () => {  
    setDeleteConfirmationOpen(false);  
    setCustomerIdToDelete(null);  
  };  
  const handleInputChange = (e) => {  
    const { name, value } = e.target;  
    setSelectedCustomer({ ...selectedCustomer, [name]: value });  
  };  
  const handleSave = async () => {  
    try {  
      await updateCustomer(selectedCustomer, localStorage.getItem('token'));  
      loadCustomersData();  
      setIsModalOpen(false);  
    } catch (error) {  
      console.error('Failed to update agent', error);  
    }  
  };
  const handleImageChange = async (e) => {  
    const file = e.target.files[0];  
    if (file) { 
      const token = localStorage.getItem('token') || '';  
      try {  
        const customerId = selectedCustomer._id;
        const response = await uploadPhoto(customerId, file, token);  
        console.log(response);  
        setSelectedCustomer({ ...selectedCustomer, image: response.data.image });  
      } catch (error) {  
        console.error(error);  
      }  
    }  
  };  
  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {  
  //   if (event.target.files) {  
  //     setFile(event.target.files[0]);  
  //   }  
  // };  

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {  
  //   event.preventDefault();  
  //   if (file) {  
  //     const token = localStorage.getItem('token') || '';  
  //     try {  
  //       const response = await loadCustomerList(file, token);  
  //       console.log(response.data);  
  //     } catch (error) {  
  //       console.error(error);  
  //     }  
  //   }  
  // };  
  const friendlinessOptions = [  
    "friendly",  
    "professional",  
    "sassy",  
    "innovative",  
    "humorous",  
    "mentor",  
    "cheerleader",  
    "calm",  
    "efficient",  
    "adventurous",  
    "sincere",  
    "resilient",  
    "seductive",  
  ];
  return (  
    <Container maxWidth="lg">
       <Grid container spacing={2}>  
        {/* CSV Upload Section */}  
        <Grid item xs={12}>  
          <Paper sx={{ p: 3 }}>  
            <Typography variant="h6" gutterBottom>CSV Upload Section</Typography>  
            <Box sx={{ border: '1px dashed grey', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>  
              <CloudUploadIcon fontSize="large" color="primary" />  
              <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>Drag & Drop or Click to Upload CSV</Typography>  
              <input  
                type="file"  
                accept=".csv"  
                onChange={handleFileUpload}  
                style={{ display: 'none' }}  
                id="csv-upload"  
              />  
              <label htmlFor="csv-upload">  
                <Button variant="contained" component="span" sx={{ mt: 2 }}>Upload CSV</Button>  
              </label>  
            </Box>  

            {/* Recently Uploaded Files Table */}  
            <Box sx={{ height: 400, mt: 4 }}>  
              {customers.length > 0 ? (  
                <TableContainer component={Paper} sx={{ mt: 3, maxHeight:400,overflowY: 'auto' }}>  
                  <Table>  
                    <TableHead>  
                      <TableRow>  
                        <TableCell>Image</TableCell>  
                        <TableCell>Person Name</TableCell>  
                        <TableCell>Person Number</TableCell>  
                        <TableCell>Company Name</TableCell>  
                        <TableCell>Company Address</TableCell>  
                        <TableCell>Conversation Purpose</TableCell>  
                        <TableCell>Actions</TableCell>  
                      </TableRow>  
                    </TableHead>  
                    <TableBody>  
                      {customers.map((customer) => (  
                        <TableRow key={customer._id}>  
                          <TableCell>   
                            {customer.image ? <img src={`${BASE_API}/${customer.image}`} alt="Customer" width="50" /> : 'No Image'}  
                          </TableCell>  
                          <TableCell>{customer.personName}</TableCell>  
                          <TableCell>{customer.personNumber}</TableCell>  
                          <TableCell>{customer.companyName}</TableCell>  
                          <TableCell>{customer.companyAddress}</TableCell>  
                          <TableCell>{customer.conversationPurpose}</TableCell>  
                          <TableCell>  
                            <IconButton color="primary" onClick = {() => handleCall(customer)}>  
                              <PhoneIcon />  
                            </IconButton>  
                            <IconButton color="secondary" onClick={() => handleEdit(customer)}>  
                              <EditIcon />  
                            </IconButton>  
                            <IconButton color="error" onClick={() => handleDeleteClick(customer._id)}>  
                              <DeleteIcon />  
                            </IconButton>  
                          </TableCell>  
                        </TableRow>  
                      ))}  
                    </TableBody>  
                  </Table>  
                </TableContainer>  
              ) : (  
                <Typography variant="body1" sx={{ mt: 3 }}>  
                  No customers found. Please upload a CSV file to see customer details.  
                </Typography>  
              )}  
            </Box>  
          </Paper>  
        </Grid>  
      </Grid>    
      {/* <Box sx={{ mt: 5 }}>  
        <Typography variant="h4" component="h1" gutterBottom>  
          Upload Customer List  
        </Typography>  
        <form onSubmit={handleSubmit}>  
          <input   
            type="file"   
            accept=".csv"  
            onChange={handleFileChange}  
            style={{ display: 'none' }}  
            id="upload-file"  
          />  
          <label htmlFor="upload-file">  
            <Button variant="contained" component="span">  
              Choose File  
            </Button>  
          </label>  
          {file && <Typography variant="body1">{file.name}</Typography>}  
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>  
            Upload  
          </Button>  
        </form>  
      </Box>   */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>  
        <Box sx={modalStyle}>  
          <Typography variant="h6" gutterBottom>Edit Customer</Typography>  
          {selectedCustomer && (  
            <Box component="form">  
              <Grid container spacing={2}>  
                <Grid item xs={12} md={6}>  
                  <TextField  
                    label="Person Name"  
                    name="personName"  
                    value={selectedCustomer.personName || ''}  
                    onChange={handleInputChange}  
                    fullWidth  
                  />  
                </Grid>  
                <Grid item xs={12} md={6}>  
                  <TextField  
                    label="Phone Number"  
                    name="personNumber"  
                    value={selectedCustomer.personNumber || ''}  
                    onChange={handleInputChange}  
                    fullWidth  
                  />  
                </Grid>  
                <Grid item xs={12} md={6}>  
                  <TextField  
                    label="Company Name"  
                    name="companyName"  
                    value={selectedCustomer.companyName || ''}  
                    onChange={handleInputChange}  
                    fullWidth  
                  />  
                </Grid>  
                <Grid item xs={12} md={6}>  
                  <TextField  
                    label="Company Address"  
                    name="companyAddress"  
                    value={selectedCustomer.companyAddress || ''}  
                    onChange={handleInputChange}  
                    fullWidth  
                  />  
                </Grid>  
                <Grid item xs={12} md={6}>  
                  <Select  
                    label="Agent Personality"  
                    name="friendliness"  
                    value={selectedCustomer.friendliness || ''}  
                    onChange={handleInputChange}  
                    fullWidth  
                  >  
                    {friendlinessOptions.map((option) => (  
                      <MenuItem key={option} value={option}>  
                        {option}  
                      </MenuItem>  
                    ))}  
                  </Select>  
                </Grid>  
                <Grid item xs={12} md={6}>  
                  <TextField  
                    label="Conversation Purpose"  
                    name="conversationPurpose"  
                    value={selectedCustomer.conversationPurpose || ''}  
                    onChange={handleInputChange}  
                    fullWidth  
                  />  
                </Grid>  
                <Grid item xs={12} md={6}>  
                  <TextField  
                    label="Agent Number"  
                    name="agentNumber"  
                    value={selectedCustomer.agentNumber || ''}  
                    onChange={handleInputChange}  
                    fullWidth  
                  />  
                </Grid>   
                <Grid item xs={12} md={6}>  
                  <input  
                    accept="image/*"  
                    type="file"  
                    onChange={handleImageChange}  
                    style={{ display: 'none' }}  
                    id="image-upload"  
                  />  
                  <label htmlFor="image-upload">  
                    <Button variant="contained" component="span">Upload Image</Button>  
                  </label>  
                </Grid>  
                <Grid item xs={12}>  
                  {selectedCustomer.image && (  
                    <img src={`${BASE_API}/${selectedCustomer.image}`} alt="Customer" width="100" />  
                  )}  
                </Grid>  
              </Grid>  
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>  
                <Button variant="outlined" onClick={() => setIsModalOpen(false)} sx={{ mr: 2 }}>Cancel</Button>  
                <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>  
              </Box>  
            </Box>  
          )}  
        </Box>  
      </Modal> 
      <Dialog  
        open={deleteConfirmationOpen}  
        onClose={handleDeleteCancel}  
      >  
        <DialogTitle>Confirm Delete</DialogTitle>  
        <DialogContent>  
          <DialogContentText>  
            Are you sure you want to delete this customer?  
          </DialogContentText>  
        </DialogContent>  
        <DialogActions>  
          <Button onClick={handleDeleteCancel} color="primary">  
            Cancel  
          </Button>  
          <Button onClick={handleDeleteConfirm} color="primary" autoFocus>  
            Confirm  
          </Button>  
        </DialogActions>  
      </Dialog>   
    </Container>  
  );  
};  
const modalStyle = {  
  position: 'absolute' as 'absolute',  
  top: '50%',  
  left: '50%',  
  transform: 'translate(-50%, -50%)',  
  width: '80%',  
  bgcolor: 'background.paper',  
  border: '2px solid #000',  
  boxShadow: 24,  
  p: 4,  
};  
export default UploadForm;