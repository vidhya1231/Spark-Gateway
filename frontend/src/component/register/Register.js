import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './Register.css'
import {
  MDBContainer,
  MDBInputGroup,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBSpinner
} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import { base_Url } from '../Base_Url/baseurl';
import { Login } from '@mui/icons-material';


const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(''); // Added phone number state
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState(''); // Added phone error state
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: ''
  });


  const [responseMessage, setResponseMessage] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  // const handleSubmit = async (e) => {

  //   e.preventDefault();

  //   try {
  //     const response = await fetch(`${base_Url}register`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(formData)
  //     });

  //     const result = await response.json();

  //     if (result.Response.Success === '1') {
  //       setResponseMessage({ text: result.Response.Message, color: 'green' });
  //     } else {
  //       setResponseMessage({ text: result.Response.Message, color: 'red' });
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     setResponseMessage({ text: 'An error occurred. Please try again later.', color: 'red' });
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    const phoneRegex = /^[6-9]\d{9}$/;
  
    // Form data values
    const { firstName, lastName, email, mobile: phoneNumber, password } = formData;
  
    // Validations
    if (!phoneNumber) {
      Swal.fire('Error', 'Phone number is required', 'error');
      return;
    } else if (!phoneRegex.test(phoneNumber)) {
      Swal.fire('Error', 'Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9', 'error');
      return;
    }
  
    if (!firstName) {
      Swal.fire('Error', 'First name is required', 'error');
      return;
    }
  
    if (!lastName) {
      Swal.fire('Error', 'Last name is required', 'error');
      return;
    }
  
    if (!email) {
      Swal.fire('Error', 'Email is required', 'error');
      return;
    } else if (!emailRegex.test(email)) {
      Swal.fire('Error', 'Please enter a valid email address', 'error');
      return;
    }
  
    if (!password) {
      Swal.fire('Error', 'Password is required', 'error');
      return;
    } else if (!passwordRegex.test(password)) {
      Swal.fire('Error', 'Password must contain at least one uppercase letter, one lowercase letter, and one number', 'error');
      return;
    }

  
    if (!agreeToTerms) {
      Swal.fire('Error', 'You must agree to the terms and conditions', 'error');
      return;
    }
  
    // Proceed to API call
    try {
      setLoading(true);
      const response = await fetch(`${base_Url}register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (result.Response.Success == '1') {
        setResponseMessage({ text: result.Response.Message, color: 'green' });

        setTimeout(() => {
          setLoading(false);
          Swal.fire({
            icon: 'success',
            title: 'Registered Successful',
            text: 'You are being redirected...',
          }).then(() => {
            window.location.href = `/Login`;
          });
          setRegisterSuccess('Registration successful!');
        }, 1000);

      } else {
        setLoading(false);
        Swal.fire('Error', result.Response.Message, 'error');
        setResponseMessage({ text: result.Response.Message, color: 'red' });
      }
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      Swal.fire('Error', 'An error occurred. Please try again later.', 'error');
      setResponseMessage({ text: 'An error occurred. Please try again later.', color: 'red' });
    }
  };

  // const handleRegister = async () => {
  //   setRegisterSuccess('');
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  //   const phoneRegex = /^[6-9]\d{9}$/;

  //   if (!phoneNumber) {
  //     Swal.fire('Error', 'Phone number is required', 'error');
  //     return;
  //   } else if (!phoneRegex.test(phoneNumber)) {
  //     Swal.fire('Error', 'Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9', 'error');
  //     return;
  //   }

  //   if (!firstName) {
  //     Swal.fire('Error', 'First name is required', 'error');
  //     return;
  //   }

  //   if (!lastName) {
  //     Swal.fire('Error', 'Last name is required', 'error');
  //     return;
  //   }

  //   if (!email) {
  //     Swal.fire('Error', 'Email is required', 'error');
  //     return;
  //   } else if (!emailRegex.test(email)) {
  //     Swal.fire('Error', 'Please enter a valid email address', 'error');
  //     return;
  //   }

  //   if (!password) {
  //     Swal.fire('Error', 'Password is required', 'error');
  //     return;
  //   } else if (!passwordRegex.test(password)) {
  //     Swal.fire('Error', 'Password must contain at least one uppercase letter, one lowercase letter, and one number', 'error');
  //     return;
  //   }

  //   if (!confirmPassword) {
  //     Swal.fire('Error', 'Please confirm your password', 'error');
  //     return;
  //   } else if (password !== confirmPassword) {
  //     Swal.fire('Error', 'Passwords do not match', 'error');
  //     return;
  //   }

  //   if (!agreeToTerms) {
  //     Swal.fire('Error', 'You must agree to the terms and conditions', 'error');
  //     return;
  //   }

  //   console.log("firstName :", firstName)
  //   console.log("lastName :", lastName)
  //   console.log("email :", email)
  //   console.log("phoneNumber :", phoneNumber)
  //   console.log("password :", password)
  //   console.log("confirmPassword :", confirmPassword)
  //   console.log("agreeToTerms :", agreeToTerms)

  //   const formData = new FormData ();
  //   formData.append('mobile', phoneNumber)
  //   formData.append('password', password)
  //   formData.append('firstName', firstName)
  //   formData.append('lastName', lastName)
  //   formData.append('email', email)



  //   try {
  //     // setLoading(true)
  //     const response = await fetch(`${base_Url}register`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'  // Ensure you're sending JSON data
  //       },
  //       body: JSON.stringify(formData)
  //     });

  //     const data = await response.json();

  //     console.log(" response data ::::>>>", data.Response)

  //     if (data.Response.Success == "1") {
        // setTimeout(() => {
        //   setLoading(false);
        //   Swal.fire({
        //     icon: 'success',
        //     title: 'Registered Successful',
        //     text: 'You are being redirected...',
        //   }).then(() => {
        //     window.location.href = `/Login`;
        //   });
        //   setRegisterSuccess('Registration successful!');
        // }, 2000);
  //     } else {

  //     }
  //   } catch (error) {

  //   }
  // };


  const handleAgreeToTermsChange = () => {
    setAgreeToTerms(!agreeToTerms);
  };
  const handlePhoneInput = (e) => {
    const input = e.target.value;
    const onlyNumbers = input.replace(/\D/g, ''); // Remove non-numeric characters
    if (onlyNumbers.length <= 10) {
      setPhoneNumber(onlyNumbers); // Set state if it's within the 10-digit limit
    }
  };

  // If validations pass


  return (

    <div className="background-container">
      <div className="registration-form">
        <MDBContainer className="register-box">
          <div className="icon-container">
            <MDBIcon fas icon="user-plus" size="1x" />
          </div>
          <h2 className="register-title">Register</h2>

          <form onSubmit={handleSubmit}>
            <MDBInputGroup className='mb-4'>
              <span className="input-group-text"><MDBIcon fas icon="user" /></span>
              <MDBInput
                wrapperClass='w-100'
                label='First Name'
                type='text'
                // value={firstName}
                // onChange={(e) => setFirstName(e.target.value)}
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
              />
            </MDBInputGroup>
            {firstNameError && <p className="error-text">{firstNameError}</p>}

            <MDBInputGroup className='mb-4'>
              <span className="input-group-text"><MDBIcon fas icon="user" /></span>
              <MDBInput
                wrapperClass='w-100'
                label='Last Name'
                type='text'
                // value={lastName}
                // onChange={(e) => setLastName(e.target.value)}
                name='lastName'
                value={formData.lastName}
                        onChange={handleChange}
              />
            </MDBInputGroup>
            {lastNameError && <p className="error-text">{lastNameError}</p>}

            <MDBInputGroup className='mb-4'>
              <span className="input-group-text"><MDBIcon fas icon="envelope" /></span>
              <MDBInput
                wrapperClass='w-100'
                label='Email Address'
                type='email'
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                 name='email'
                value={formData.email}
                        onChange={handleChange}
              />
            </MDBInputGroup>
            {emailError && <p className="error-text">{emailError}</p>}

            <MDBInputGroup className='mb-4'>
              <span className="input-group-text"><MDBIcon fas icon="phone" /></span>
              <MDBInput
                wrapperClass="w-100"
                label="Phone Number"
                type="tel"
                // value={phoneNumber}
                // onChange={handlePhoneInput}
                name='mobile' 
                value={formData.mobile}
                        onChange={handleChange}
              />
            </MDBInputGroup>
            {phoneError && <p className="error-text">{phoneError}</p>}

            <MDBInputGroup className='mb-4'>
              <span className="input-group-text"><MDBIcon fas icon="lock" /></span>
              <MDBInput
                wrapperClass='w-100'
                label='Password'
                type='password'
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                name='password' 
                value={formData.password}
                        onChange={handleChange}
              />
            </MDBInputGroup>
            {passwordError && <p className="error-text">{passwordError}</p>}

            {/* <MDBInputGroup className='mb-4'>
              <span className="input-group-text"><MDBIcon fas icon="key" /></span>
              <MDBInput
                wrapperClass='w-100'
                label='Confirm Password'
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </MDBInputGroup>
            {confirmPasswordError && <p className="error-text">{confirmPasswordError}</p>} */}

            <div className="d-flex justify-content-between mb-4">
              <MDBCheckbox
                name='flexCheck'
                label='Agree to terms and conditions'
                checked={agreeToTerms}
                onChange={handleAgreeToTermsChange}
              />
            </div>

            <MDBBtn className="register-btn"
              // onClick={handleRegister}
              disabled={loading}>
              {loading ? <MDBSpinner size="sm" role="status" tag="span" className="me-2" /> : null}
              Register
            </MDBBtn>
          </form>


          {registerSuccess && <p className="success-text">{registerSuccess}</p>}

          <p className="login-link">
            Already have an account? <Link to="/" style={{ color: '#4e54c8' }}>Login</Link>
          </p>
        </MDBContainer>
      </div>
    </div>
  )
};

export default Register;
