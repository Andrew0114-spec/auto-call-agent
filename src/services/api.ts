import axios from 'axios';  

const API_URL = 'http://localhost:8000';  

export const signUp = async (username: string, password: string) => {  
  return await axios.post(`${API_URL}/auth/signup`, { username, password });  
};  

export const signIn = async (username: string, password: string) => {  
  return await axios.post(`${API_URL}/auth/signin`, { username, password });  
};  

export const createCustomer = async (customerData: object, token: string) => {
  const  response = await axios.post(`${API_URL}/customers/create`,customerData,{
    headers:{
      'Authorization':`Bearer ${token}`,
    }
  })
  console.log(response);
  return response;
}
export const loadCustomerData = async (userId:string, token:string) => {
  return await axios.post(`${API_URL}/customers/`,{userId},{
    headers:{
      'Authorization': `Bearer ${token}`
    }
  })  
};  

export const uploadPhoto = async (customerId: string, photo: File, token: string) => {  
  const formData = new FormData();  
  formData.append('photo', photo);  
  return await axios.post(`${API_URL}/customers/${customerId}/photo`, formData, {  
    headers: {  
      'Content-Type': 'multipart/form-data',  
      'Authorization': `Bearer ${token}`,  
    },  
  });  
};  

export const updateCustomer = async (customerData: object, token: string) => {  
  return await axios.post(`${API_URL}/customers/update`, customerData, {  
    headers: {  
      'Authorization': `Bearer ${token}`,  
    },  
  });  
};  
export const deleteCustomer = async (customerId: string, token: string) => {
  return await axios.post(`${API_URL}/customers/delete`, {customerId}, {
    headers:{
      'Authorization': `Bearer ${token}`,
    }
  })
}
export const scheduleCall = async (customerId: string, time: string, purpose: string, token: string) => {  
  return await axios.post(`${API_URL}/calls/schedule`, { customerId, time, purpose }, {  
    headers: {  
      'Authorization': `Bearer ${token}`,  
    },  
  });  
};

export const makeCall = async (customerId: string, conversationPurpose: string, token: string) =>{
  return await axios.post(`${API_URL}/calls/initiate`,{customerId, conversationPurpose}, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  })
}