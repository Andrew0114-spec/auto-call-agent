import React from 'react';  
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import SignUp from './components/Auth/SignUp';  
import SignIn from './components/Auth/SignIn';  
import UploadForm from './components/CustomerManagement/UploadForm';  
import UploadPhoto from './components/CustomerManagement/UploadPhoto';  
// import UpdateCustomerSettings from './components/CustomerManagement/UpdateCustomerSettings';  
import ScheduleCall from './components/CallScheduler/ScheduleCall';  
import SideBar from './components/Layout';
const App: React.FC = () => {  
  return (  
    <Router>  
      <Routes>
        <Route path="/" element={<SignIn />}/>  
        <Route path="/signup" element={<SignUp />} />  
        <Route path="/signin" element={<SignIn />} />
        <Route element= {<SideBar />} >
          {/* <Route path='/home' element={<Home />} /> */}
          <Route path="/upload" element={<UploadForm />} />  
          <Route path="/photo/upload" element={<UploadPhoto />} />  
          {/* <Route path="/settings" element={<UpdateCustomerSettings />} />   */}
          <Route path="/schedule" element={<ScheduleCall />} />  
        </Route>  
      </Routes>  
    </Router>  
  );  
};  

export default App;