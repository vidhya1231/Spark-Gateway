import React, { useState } from 'react';
import { Navigate, Link, json } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './Login.css'
import {
  MDBContainer,
  MDBInputGroup,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBSpinner
} from 'mdb-react-ui-kit';
import { base_Url } from '../Base_Url/baseurl';
import Swal from 'sweetalert2';


const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState('');

  const handleLogin = async () => {
    setLoginSuccess('');
    const phoneRegex = /^[6-9]\d{9}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

    let isValid = true;
    if (!phoneNumber) {
      setPhoneError('Phone number is required');
      isValid = false;
    }
    // else if (!phoneRegex.test(phoneNumber)) {
    //   setPhoneError('Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9');
    //   isValid = false;
    // } else {
    //   setPhoneError('');
    // }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }
    // else if (!passwordRegex.test(password)) {
    //   setPasswordError('Password must contain at least one uppercase letter, one lowercase letter, and one number');
    //   isValid = false;
    // } else {
    //   setPasswordError('');
    // }

    // if (isValid) {
    //   setLoading(true);

    //   setTimeout(() => {
    //     setLoading(false);
    //     setLoginSuccess('Login successful!');
    //     window.location.href = '/Home';
    //     localStorage.setItem('phoneNumber', phoneNumber);
    //     localStorage.setItem('password', password);
    //     localStorage.setItem('roleType', "2");
    //   }, 2000);
    // }



    const response = await fetch(`${base_Url}login?mobile=${phoneNumber}&password=${password}`)
    const data = await response.json();
    console.log("response :", data);

    if (data.Response.Success == '1') {
      const token = data.Response.Result[0].token;
      const userData = data.Response.Result[0].userData;
      console.log(data.Response.Result[0].token)
      console.log(data.Response.Result[0].userData)
      const userDataString = encodeURIComponent(JSON.stringify(userData));
      localStorage.setItem('token', token);
      localStorage.setItem('userData', userDataString);

      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'You are being redirected...',
      }).then(() => {
        window.location.href = `/Home?userData=${userDataString}`;
      });
    } else {
  Swal.fire({
    icon: 'error',
    title: 'Login Failed',
    text: data.Response.Message || 'Invalid mobile number or password. Please try again.',
  });
}
  };

const handleRememberMeChange = () => {
  setRememberMe(!rememberMe);
};
// const [phoneNumber, setPhoneNumber] = useState('');
//validation phonenumber
const [errorMessage, setErrorMessage] = useState('');

const handlePhoneChange = (e) => {
  const input = e.target.value;

  if (/^[0-9]*$/.test(input) && input.length <= 10) {
    setPhoneNumber(input);
    setErrorMessage(''); // Clear the error message while typing
  }
};

const handlePhoneBlur = () => {
  if (!/^[6-9][0-9]{9}$/.test(phoneNumber)) {
    setErrorMessage(
      'Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9.'
    );
  }
};


return (
  <div className="login-background">
    <MDBContainer className="login-box">
      <div className="icon-container">
        <MDBIcon fas icon="user" size="1.9x" />
      </div>
      <h2 className="login-title">Login</h2>

      <MDBInputGroup className='mb-4'>
        <span className="input-group-text"><MDBIcon fas icon="phone" /></span>
        <MDBInput
          wrapperClass='w-100'
          label='Phone Number'
          id='form1'
          type='tel'
          value={phoneNumber}
          // onChange={(e) => setPhoneNumber(e.target.value)}

         
          onChange={handlePhoneChange}
          onBlur={handlePhoneBlur}
        />
      </MDBInputGroup>
      {errorMessage && (
        <p style={{ color: 'red', fontSize: '0.9rem', marginTop: '-10px' }}>
          {errorMessage}
        </p>
      )}

      {phoneError && <p className="error-text">{phoneError}</p>}

      <MDBInputGroup className='mb-4'>
        <span className="input-group-text"><MDBIcon fas icon="lock" /></span>
        <MDBInput
          wrapperClass='w-100'
          label='Password'
          id='form2'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </MDBInputGroup>

      {passwordError && <p className="error-text">{passwordError}</p>}

      <div className="d-flex justify-content-between mb-4">
        <MDBCheckbox
          name='flexCheck'
          value=''
          id='flexCheckDefault'
          label='Remember me'
          checked={rememberMe}
          onChange={handleRememberMeChange}
        />
        <a href="#!" className="forgot-password">Forgot password?</a>
      </div>

      <MDBBtn className="login-btn" onClick={handleLogin} disabled={loading}>
        {loading ? <MDBSpinner size="sm" role="status" tag="span" className="me-2" /> : null}
        Login
      </MDBBtn>

      {loginSuccess && <p className="success-text">{loginSuccess}</p>}

      <p className="signup-link">
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </MDBContainer>
  </div>
);
}

export default Login;
