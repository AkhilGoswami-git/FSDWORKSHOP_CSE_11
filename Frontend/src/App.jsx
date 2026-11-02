import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import User from './pages/User.jsx'; // Assuming your file path
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/SMS.app/" element={<Home />} />
        <Route path="/SMS.app/user" element={<FetchDataGrid />} />
        <Route path="/SMS.app/products" element={<BookComponent />} />
        <Route path="/SMS.app/about" element={<AboutUs />} />
        <Route path="/SMS.app/contact" element={<ContactUs />} />
        <Route path="/SMS.app/addstudents" element={<AddStudent />} />
        <Route path="/SMS.app/update" element={<UpdateStudent />} />
      
       
      </Routes>
      <footerComponent />
    </BrowserRouter>
  );
}

export default App;
