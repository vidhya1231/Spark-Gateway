import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './component/homepage/Navbar';
import { Home } from './component/homepage/Home';
import Chat from './component/homepage/Chat';
import Explore from './component/homepage/Explore';
import ExploreAsTutor from './component/homepage/ExploreAsTutor';
import Login from './component/register/Login';
import Register from './component/register/Register';
import ProfilePage from './component/homepage/ProfilePage';
import Detailsofcourse from './component/homepage/Detailsofcourse'; // Adjust this line as necessary

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Login" replace />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/detailsofcourse" element={<Detailsofcourse />} />

        <Route path="/Home" element={
          <>
            <Navbar />
            <Home />
          </>
        } />
        <Route path="/chat" element={
          <>
            <Navbar />
            <Chat />
          </>
        } />
        <Route path="/explore" element={
          <>
            <Navbar />
            <Explore />
          </>
        } />
        <Route path="/ExploreAsTutor" element={
          <>
            <Navbar />
            <ExploreAsTutor />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
