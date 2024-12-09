import React from 'react';
import { FaUser, FaUserFriends, FaSave, FaUsers, FaVideo, FaCalendarAlt, FaComment, FaCog } from 'react-icons/fa';
import './Sidebar.css';

function Sidebar() {
    return (
        <div className="sidebar d-flex flex-column p-3 bg-light" style={{ width: '250px', height: '', }}>
            <img
                src="https://marketplace.canva.com/EAFqNrAJpQs/1/0/1600w/canva-neutral-pink-modern-circle-shape-linkedin-profile-picture-WAhofEY5L1U.jpg" // Replace with your profile image URL
                alt="Profile"
                className="rounded-circle me-2"
                style={{ width: '60%', height: '20%', borderRadius: '90px' }}
            />
            <ul className="nav nav-pills " style={{ display: 'flex', flexDirection: 'column', }}>
                <li className="nav-item mb-3" >
                    <a href="" className=" text-dark  " style={{fontWeight:'900', paddingRight:'40px',textDecoration:'none', fontFamily:'Lucida Handwriting,cursive'}} >
                        
                        SPARK
                        
                    </a>

                </li>
                <li className="nav-item mb-3">
                    <a href="#friends" className="nav-link text-dark " style={{ gap: '20px', marginTop:'-10%' }} >
                        <FaUserFriends className="me-3" /> Friends
                    </a>
                </li>
                <li className="nav-item mb-2">
                    <a href="#save" className="nav-link text-dark " style={{ gap: '20px',marginTop:'-10%' }} >
                        <FaSave className="me-3" /> Save
                    </a>
                </li>
                <li className="nav-item mb-2">
                    <a href="#groups" className="nav-link text-dark " style={{ gap: '20px',marginTop:'-10%' }}>
                        <FaUsers className="me-3" /> Group
                    </a>
                </li>
                <li className="nav-item mb-2">
                    <a href="#videos" className="nav-link text-dark " style={{ gap: '20px',marginTop:'-10%' }} >
                        <FaVideo className="me-3" /> Videos
                    </a>
                </li>
                <li className="nav-item mb-2">
                    <a href="#events" className="nav-link text-dark " style={{ gap: '20px',marginTop:'-10%' }} >
                        <FaCalendarAlt className="me-3" /> Events
                    </a>
                </li>
                <li className="nav-item mb-2">
                    <a href="#chats" className="nav-link text-dark d-flex " style={{ gap: '20px',marginTop:'-10%' }}>
                        <FaComment className="me-3" /> Chats
                    </a>
                </li>
                <li className="nav-item mb-2">
                    <a href="#settings" className="nav-link text-dark d-flex " style={{ gap: '20px',marginTop:'-10%' }} >
                        <FaCog className="me-3" /> Settings
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
