import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from '../src/components/homepage'; 
import University from '../src/components/university'; 
import Courses from '../src/components/courses'; 
import Apply from '../src/components/homepage'; 
import Contact from '../src/components/contact'; 
import AdminPage from '../src/components/admin'; 
import Login from '../src/components/login';
import Institution from '../src/components/institution';




const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/universities" element={<University />} />
        <Route path="/institution" element={<Institution />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
