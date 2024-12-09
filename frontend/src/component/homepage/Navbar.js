import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import ExploreIcon from '@mui/icons-material/Explore';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Sparklogo from '../assets/sparkLogo.png';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, TextField,  } from '@mui/material';
import { base_Url } from '../Base_Url/baseurl';




const roleType = localStorage.getItem('roleType');
const explorePath = roleType === '1' ? '/explore' : '/ExploreAsTutor';

const pages = [
  { name: 'Home', icon: <HomeIcon />, path: '/Home' },
  { name: 'Chat', icon: <ChatIcon />, path: '/chat' },
  { name: 'Explore', icon: <ExploreIcon />, path: explorePath },
];

const settings = [
  { name: 'Profile', path: '/ProfilePage' },
  { name: 'Dashboard', path: '/Home' },
  { name: 'Logout', action: 'logout' },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  









  const [userResult, setUserResult] = useState([])
  const [userData, setuserData] = useState([])




  useEffect(() => {
    const encodedUserData = localStorage.getItem('userData');
    if (encodedUserData) {
      try {
        const decodedUserData = decodeURIComponent(encodedUserData);
        const parsedUserData = JSON.parse(decodedUserData);
        setuserData(parsedUserData);
      } catch (error) {
        console.error("Error decoding or parsing userData:", error);
      }
    } else {
      console.log("No userData found in localStorage.");
    }
  }, []);



  useEffect(()=> {
    const handleUsertGet = async () => {
      const response = await fetch(`${base_Url}userGet?id=${userData?.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      console.log("response data from nav bar :", data);


      if (data.Response.Success == "1") {
        setUserResult(data.Response.Result[0])
        console.log("userResult :", data?.Response.Result);
      } else {
        console.log("user get failed");
      }
    }
    handleUsertGet()
  },[userData])




console.log("user data from nav bar :", userResult);










  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingClick = (setting) => {
    if (setting.action === 'logout') {
      handleLogout();
    } else if (setting.path) {
      navigate(setting.path);
    }
    handleCloseUserMenu();
  };

  const handleLogout = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Alert',
      text: 'Are you sure you want to logout?',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'No, stay logged in',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        window.location.href = '/Login';
      }
    });
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#0f0f0f' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <img src={Sparklogo} alt="Spark Logo" style={{ width: '150px', height: '60px', marginRight: '10px' }} />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, marginLeft: '-30px' }}>
            <IconButton size="large" aria-label="open navigation menu" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left' }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {page.icon}
                    <Link to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                    </Link>
                  </Box>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 12 }}>
            <img src={Sparklogo} alt="Spark Logo" style={{ width: '170px', height: '40px', marginRight: '10px' }} />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 20 }}>
            {pages.map((page) => (
              <Link key={page.name} to={page.path} className="nav-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {page.icon}
                  <Typography sx={{ my: 2 }}>{page.name}</Typography>
                </Box>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <Button>
                {/* <img src={} alt="" /> */}
              </Button>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={userResult?.profile_image} />
              </IconButton>
            </Tooltip>
            <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={() => handleSettingClick(setting)}>
                  <Typography sx={{ textAlign: 'center' }}>{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
