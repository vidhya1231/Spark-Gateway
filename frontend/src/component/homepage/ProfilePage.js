import React, { useState, useRef, useEffect } from 'react';
import { Button, TextField, Typography, Card, CardContent, Grid } from '@mui/material';
import Navbar from './Navbar';
import './ProfilePage.css';
import { faL } from '@fortawesome/free-solid-svg-icons';
import EditIcon from '@mui/icons-material/Edit';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBIcon,
  MDBCardText,
  MDBInput,
  MDBBtn,
  MDBListGroup,
  MDBListGroupItem,
} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2'
import { base_Url } from '../Base_Url/baseurl';
import Box from '@mui/material/Box';

// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SendIcon from '@mui/icons-material/Send';







const settings = ['Save', 'Block this user', 'Dont recommend this post', 'Report'];





const ProfilePage = () => {
  useEffect(() => {
    const tokenName = localStorage.getItem('token');
    if (tokenName != "") {
      setIsToken(true)
    }

    const fetchData = async () => {
      const response = await fetch(`${base_Url}check_token`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${tokenName}`,
          'Content-Type': 'application/json',
        }
      })
      const data = await response.json();
      console.log(data);
      if (data.Response.Success == '1') {
        console.log("you are autherized");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: data.Response.Message || 'Invalid mobile number or password. Please try again.',
        }).then(() => {
          localStorage.clear('token');
          localStorage.clear('userData');
          window.location.href = '/Login';
        });
      }
    }

    fetchData();
  }, [])






  const [userData, setuserData] = useState({})

  useEffect(() => {
    const encodedUserData = localStorage.getItem('userData');
    if (encodedUserData) {
      try {
        const decodedUserData = decodeURIComponent(encodedUserData);
        const parsedUserData = JSON.parse(decodedUserData);
        setuserData(parsedUserData);
        console.log("user data from async :", parsedUserData);

      } catch (error) {
        console.error("Error decoding or parsing userData:", error);
      }
    } else {
      console.log("No userData found in localStorage.");
    }
  }, []);



  const handleDobChange = (event) => {
    const selectedDate = event.target.value; // Format will already be YYYY-MM-DD
    setDob(selectedDate);
    console.log("Selected DOB:", selectedDate);

  };






  useEffect(() => {
    handleUsertGet();
    handlePostGet();
  }, [userData.id]);


  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [postText, setPostText] = useState('');
  const fileInputRef = useRef(null);
  const [isToken, setIsToken] = useState(false)
  const [postImage, setPostImage] = useState(null)
  const [result, setResult] = useState([])
  const [userResult, setUserResult] = useState({})
  const [isCommentBoxVisible, setIsCommentBoxVisible] = useState(false);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [dob, setDob] = useState("")
  const [education, setEducation] = useState('')
  const [email, setEmail] = useState('')
  const [street, setStreet] = useState('')
  const [area, setArea] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [profileImage, setProfileImage] = useState();
  // const [firstName, setFirstName] = useState(userResult?.first_name || '');
  // const [lastName, setLastName] = useState(userResult?.last_name || '');
  // const [dob, setDob] = useState(userResult?.dob || '');
  // const [email, setEmail] = useState(userResult?.email || '');
  // const [age, setAge] = useState(userResult?.age || '');
  // const [education, setEducation] = useState(userResult?.education || '');
  // const [street, setStreet] = useState(userResult?.street || '');
  // const [area, setArea] = useState(userResult?.area || '');
  // const [city, setCity] = useState(userResult?.city || '');
  // const [state, setState] = useState(userResult?.state || '');
  // const [country, setCountry] = useState(userResult?.country || '');




  const toggleCommentBox = () => {
    setIsCommentBoxVisible(!isCommentBoxVisible);
  };

  // //comment

  const [commentData, setCommentData] = useState({});  // For storing individual comment data
  // Function to handle adding a comment
  const handleAddComment = async (postId) => {
    const userId = userData?.id;  // Ensure user is logged in

    if (!userId) {
      console.error("User ID is not available.");
      return;
    }

    const commentText = commentData[postId];  // Get comment for the specific post

    if (!commentText) {
      console.error("Comment is empty. Cannot post an empty comment.");
      return;
    }

    try {
      const response = await fetch(`${base_Url}addcomment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, postId, commentText }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.Response.Success === "1") {
        const newComment = data.Response.Data[0];  // Extract new comment from API response

        // Update comments in the result array for the specific post
        setResult((prevState) =>
          prevState.map((post) => {
            if (post.post_id === postId) {
              let comments = post.commentS ? JSON.parse(post.commentS) : [];  // Parse existing comments
              comments.push(newComment);  // Add the new comment
              return { ...post, commentS: JSON.stringify(comments) };  // Return updated post
            }
            return post;  // Return unchanged post
          })
        );

        setCommentData((prev) => ({ ...prev, [postId]: "" }));  // Clear the input field
      } else {
        console.error("Failed to add comment:", data.Response.Message);
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };
  //comment


  // like
  const [likesData, setLikesData] = useState({}); // Assuming you are using React state for likes data

  const handleLikePost = async (postId) => {
    console.log("postId:", postId);

    const userId = userData?.id; // Ensure userData exists and has an id

    if (!userId) {
      console.error("User ID is not available.");
      return;
    }

    try {
      const response = await fetch(`${base_Url}likepost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, postId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.Response.Success === "1") {
        console.log("Like action successful...");

        // Update the `likes` field in the `setResult` data
        setResult((prevState) =>
          prevState.map((post) => {
            if (post.post_id === postId) {
              let likes = post.likes ? JSON.parse(post.likes) : [];

              // Check if the user has already liked the post
              const userAlreadyLiked = likes.some((like) => like.id === userId);

              if (userAlreadyLiked) {
                likes = likes.filter((like) => like.id !== userId);
              } else {
                likes.push({ id: userId });
              }

              return { ...post, likes: JSON.stringify(likes) }; // Update the post's likes
            }

            return post; // No changes for other posts
          })
        );
      } else {
        console.error("Error in API response:", data.Response.Message);
      }
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };






  // like

  // userResult.profile_image






  function formatDate(dateString) {
    const date = new Date(dateString); // Parse the input date string
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`; // Format as DD/MM/YYYY
  }




  const handlePostGet = async () => {
    console.log("user iddd :", userData?.id);

    const response = await fetch(`${base_Url}postGet?userId=${userData?.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();

    if (data.Response.Success == "1") {
      setResult(data.Response.Result)
      // console.log("post result data ::::>>>", data?.Response.Result);
      // console.log("comments ::::>>>", data?.Response.Result.commentS);
    } else {
      setResult([])
    }
  }


  const handleUsertGet = async () => {
    const response = await fetch(`${base_Url}userGet?id=${userData?.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
    console.log('API Response:', data);

    if (data.Response.Success == "1") {
      setUserResult(data.Response.Result[0])

      setFirstName(data.Response.Result[0].first_name)
      setLastName(data.Response.Result[0].last_name)
      setDob(data.Response.Result[0].dob)
      setAge(data.Response.Result[0].age)
      setEmail(data.Response.Result[0].email)
      setEducation(data.Response.Result[0].education)
      setStreet(data.Response.Result[0].street)
      setArea(data.Response.Result[0].area)
      setCity(data.Response.Result[0].city)
      setState(data.Response.Result[0].state)
      setCountry(data.Response.Result[0].country)

      console.log("userResult :", data?.Response.Result);
    } else {
      console.log("user get failed");
    }
  }



  const toggleExpand = (postId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const [formData, setFormData] = useState({

  });


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result); // Preview the uploaded image
      };
      reader.readAsDataURL(file);
    }
  };

  const [userDataVisible, setUserDataVisible] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Form data submitted:', formData);

  //   Swal.fire({
  //     position: "center",
  //     icon: "success",
  //     title: "You have been updated your profile successfully.",
  //     showConfirmButton: false,
  //     timer: 1500
  //   });

  //   setTimeout(() => {
  //     setUserDataVisible(false);
  //   }, 1500);
  // };

  const handleDataVisible = () => {
    setUserDataVisible(true)
  }





  const handleSubmiton = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    try {
      // Prepare the form data
      const formData = new FormData();
      
      // Append text data to formData
      formData.append('userId', userResult.id);
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('email', email);
      formData.append('street', street);
      formData.append('area', area);
      formData.append('city', city);
      formData.append('state', state);
      formData.append('country', country);
            formData.append('age', age);

      // formData.append('age', age ? age :);
      // formData.append('age', age !== undefined ? age : null);

      formData.append('dob', dob);
      formData.append('education', education);
      
      // Append the image to formData
      if (profileImage) {
        formData.append('image', profileImage); // 'image' is the field name for the file on the server side
      }
  
      // Logging the formData content for debugging (you can remove this in production)
      console.log('FormData to Send:', formData);
  
      // Send the data using fetch
      const response = await fetch(`${base_Url}updateprofile`, {
        method: 'POST',
        body: formData, // Do not set the Content-Type header when using FormData, it's set automatically
      });
  
      const data = await response.json();
      console.log("Simple POST Response:", data);
  
      if (data.Response.Success == '1') {
        Swal.fire({
          icon: 'success',
          title: 'Successfully updated.',
        });
        setUserDataVisible(false);
      } else {
        alert(data.Response.Message);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };
  




  // const handleInputChange = (e) => {
  //   const { first_name, value } = e.target;
  //   setUserResult((prevResult) => ({
  //     ...prevResult,
  //     [first_name]: value,
  //   }));
  // };

  const handleFirstNameChange = (e) => {
    const fName = e.target.value;
    setFirstName(fName);
  };

  const handleLastNameChange = (e) => {
    const lName = e.target.value;
    setLastName(lName); // Correctly updating lastName
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue); // Correctly updating email
  };

  const handleStreetChange = (e) => {
    const streetValue = e.target.value;
    setStreet(streetValue); // Correctly updating street
  };

  const handleAreaChange = (e) => {
    const areaValue = e.target.value;
    setArea(areaValue); // Correctly updating area
  };

  const handleCityChange = (e) => {
    const cityValue = e.target.value;
    setCity(cityValue); // Correctly updating city
  };

  const handleStateChange = (e) => {
    const stateValue = e.target.value;
    setState(stateValue); // Correctly updating state
  };

  const handleCountryChange = (e) => {
    const countryValue = e.target.value;
    setCountry(countryValue); // Correctly updating country
  };

  const handleAgeChange = (e) => {
    const ageValue = e.target.value;
    setAge(ageValue); // Correctly updating age
  };

  // const handleDobChange = (e) => {
  //   const dobValue = e.target.value;
  //   setDob(dobValue); // Correctly updating dob
  // };

  const handleEducationChange = (e) => {
    const educationValue = e.target.value;
    setEducation(educationValue); // Correctly updating education
  };




  return (
    <>
      <Navbar />

      <div className="container1" style={{ marginTop: '5%', padding: '0 16px' }}>
        <div className="main-body">
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Card id='change1'>
                <CardContent>
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src={userResult?.profile_image}
                      className="rounded-circle"
                      width="150"
                      height="150"
                      alt="Profile"
                    />
                    <div style={{ marginTop: "10px", position: "relative" }}>
                      {/* Hidden Input Field */}
                      <input
                        id="upload-button"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                      />

                      {/* Pencil Icon */}
                      <span
                        style={{
                          position: "absolute",
                          bottom: "10px",
                          left: "30px",
                          backgroundColor: "#007bff",
                          color: "#fff",
                          padding: "8px",
                          borderRadius: "50%",
                          cursor: "pointer",
                        }}
                        onClick={() => document.getElementById("upload-button").click()}
                      >
                        <i className="fa fa-pencil"></i> {/* Using FontAwesome Pencil Icon */}
                      </span>
                    </div>

                    <div className="mt-3">
                      <h4>{userResult?.first_name} {userResult?.last_name}</h4>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="mt-3">

                {/* <Button variant='contained' onClick={handleSubmitTest}>click</Button> */}

                {userDataVisible ? (
                  <Card>
                    <CardContent>
                      <Typography variant="h5" component="h2" gutterBottom>
                        Edit Profile
                      </Typography>
                      <form
                        onSubmit={handleSubmiton}
                      >
                        <TextField
                          fullWidth
                          variant="outlined"
                          label="First Name"
                          name="first_name"
                          value={firstName}
                          onChange={handleFirstNameChange} // Correctly update first name state
                          margin="normal"
                        />

                        <TextField
                          fullWidth
                          variant="outlined"
                          label="Last Name"
                          name="last_name"
                          value={lastName}
                          onChange={handleLastNameChange} // Correctly update last name state
                          margin="normal"
                        />





                        <input
                          id="dob"
                          type="date"
                          value={dob} // Controlled input
                          onChange={handleDobChange}
                        />



                        <TextField
                          fullWidth
                          variant="outlined"
                          label="Age"
                          name="age"
                          value={age}
                          onChange={handleAgeChange} // Correctly update age state
                          margin="normal"
                        />

                        <TextField
                          fullWidth
                          variant="outlined"
                          label="Education"
                          name="education"
                          value={education}
                          onChange={handleEducationChange} // Correctly update education state
                          margin="normal"
                        />

                        <TextField
                          fullWidth
                          variant="outlined"
                          label="Email"
                          type="email"
                          name="email"
                          value={email}
                          onChange={handleEmailChange} // Correctly update email state
                          margin="normal"
                        />

                        <TextField
                          fullWidth
                          variant="outlined"
                          label="Street"
                          name="street"
                          value={street}
                          onChange={handleStreetChange} // Correctly update street state
                          margin="normal"
                        />

                        <TextField
                          fullWidth
                          variant="outlined"
                          label="Area"
                          name="area"
                          value={area}
                          onChange={handleAreaChange} // Correctly update area state
                          margin="normal"
                        />

                        <TextField
                          fullWidth
                          variant="outlined"
                          label="City"
                          name="city"
                          value={city}
                          onChange={handleCityChange} // Correctly update city state
                          margin="normal"
                        />

                        <TextField
                          fullWidth
                          variant="outlined"
                          label="State"
                          name="state"
                          value={state}
                          onChange={handleStateChange} // Correctly update state
                          margin="normal"
                        />

                        <TextField
                          fullWidth
                          variant="outlined"
                          label="Country"
                          name="country"
                          value={country}
                          onChange={handleCountryChange} // Correctly update country state
                          margin="normal"
                        />

                        <Button variant="contained" color="primary" type="submit" style={{ marginTop: '16px' }}>
                          Update Profile
                        </Button>
                      </form>

                    </CardContent>
                  </Card>
                ) : (
                  <Card mb={3} className='profileDiv'>
                    <CardContent className='contant1'>
                      <div className="row">
                        <div className="col-sm-3"><h6 className="mb-0">First Name</h6></div>
                        <div className="col-sm-9 text-secondary">{userResult?.first_name}</div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3"><h6 className="mb-0">Last Name</h6></div>
                        <div className="col-sm-9 text-secondary">{userResult?.last_name}</div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3"><h6 className="mb-0">Age</h6></div>
                        <div className="col-sm-9 text-secondary">{userResult?.age}</div>
                      </div>

                      <hr />
                      <div className="row">
                        <div className="col-sm-3"><h6 className="mb-0">Dataofbirth</h6></div>
                        <div className="col-sm-9 text-secondary">{userResult?.dob}</div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3"><h6 className="mb-0">Education</h6></div>
                        <div className="col-sm-9 text-secondary">{userResult?.education}</div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3"><h6 className="mb-0">Email</h6></div>
                        <div className="col-sm-9 text-secondary">{userResult?.email}</div>
                      </div>

                      <hr />
                      <div className="row">
                        <div className="col-sm-3"><h6 className="mb-0">Street</h6></div>
                        <div className="col-sm-9 text-secondary">{userResult?.street}</div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3"><h6 className="mb-0">Area</h6></div>
                        <div className="col-sm-9 text-secondary">{userResult?.area}</div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3"><h6 className="mb-0">City</h6></div>
                        <div className="col-sm-9 text-secondary">{userResult?.city}</div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3"><h6 className="mb-0">State</h6></div>
                        <div className="col-sm-9 text-secondary">{userResult?.state}</div>
                      </div>

                      <hr />
                      <div className="row">
                        <div className="col-sm-3"><h6 className="mb-0">Country</h6></div>
                        <div className="col-sm-9 text-secondary">{userResult?.country}</div>
                      </div>


                      <hr />

                      {/* <div className="row">
                        <div className="col-sm-3"><h6 className="mb-0">Password</h6></div>
                        <div className="col-sm-9 text-secondary" type="password">{userResult?.password}</div>
                      </div> */}


                    </CardContent>


                    {userDataVisible ? (
                      <div></div>
                    ) : (

                      <button className='editButton' onClick={handleDataVisible}>
                        <p className='editBTNtext'>Edit your profile</p>
                        <EditIcon id='editIcon' />
                      </button>
                    )}
                  </Card>
                )}



              </Card>


            </Grid>


















            <Grid item xs={12} md={8}>
              <div className='postOverAllDiv'>
                {result.length > 0 && result.map((item) => (
                  <MDBCard className="card-width-adjust" style={{ backgroundColor: '#fff', marginBottom: '1rem', width: '75%' }} id='cards' key={item.post_id}>
                    <MDBCardBody>
                      <div className="d-flex justify-content-between align-items-center " >
                        <div className="d-flex align-items-center">
                          <img
                            src={item.userImage}
                            alt="Profile"
                            className="rounded-circle me-2"
                            style={{ width: '50px', height: '50px' }}
                          />
                          <div>
                            <h6 className="mb-0">{item.userFirstName} {item.userLastName} </h6>
                            <small className="text-muted">{formatDate(item.created_at)}</small>
                          </div>
                        </div>
                        <Box sx={{ flexGrow: 0 }}>
                          <MDBIcon
                            icon="ellipsis-v"
                            style={{ cursor: 'pointer' }}
                            onClick={handleOpenUserMenu}
                          />
                          <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                          >
                            {settings.map((setting) => (
                              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                              </MenuItem>
                            ))}
                          </Menu>
                        </Box>

                      </div>


                      <MDBCardText>
                        {expandedItems[item.post_id]
                          ? item.description
                          : item.description.length > 100
                            ? `${item.description.substring(0, 100)}...`
                            : item.description}
                        {item.description.length > 100 && (
                          <p
                            onClick={() => toggleExpand(item.post_id)}
                            style={{
                              color: 'blue',
                              textDecoration: 'underline',
                              cursor: 'pointer',
                              margin: '0',
                              marginTop: '10px',
                            }}
                          >
                            {expandedItems[item.post_id] ? 'Show Less' : 'Show More'}
                          </p>
                        )}
                      </MDBCardText>


                      <img
                        src={item.image}
                        className="card-img-top my-2"
                        alt="Fissure in Sandstone"
                      />


                      <div className="d-flex justify-content-around mt-3">

                        <MDBIcon
                          far={
                            !result
                              .find((post) => post.post_id === item.post_id)
                              ?.likes && JSON.parse(result.find((post) => post.post_id === item.post_id)?.likes || "[]")
                                .some((like) => like.id === userData?.id)
                          }
                          fas={
                            !!result
                              .find((post) => post.post_id === item.post_id)
                              ?.likes && JSON.parse(result.find((post) => post.post_id === item.post_id)?.likes || "[]")
                                .some((like) => like.id === userData?.id)
                          }
                          icon="heart"
                          style={{
                            cursor: "pointer",
                            color: result
                              .find((post) => post.post_id === item.post_id)
                              ?.likes && JSON.parse(result.find((post) => post.post_id === item.post_id)?.likes || "[]")
                                .some((like) => like.id === userData?.id)
                              ? "red"
                              : "lightgray",
                          }}
                          onClick={() => handleLikePost(item.post_id)}
                        />



                        {/* <MDBIcon fas={false} far={true} icon="comment" className="me-2" onClick={toggleCommentBox} />  */}
                        <MDBIcon
                          fas={false}
                          far={true}
                          icon="comment"
                          className="me-2 text-primary"
                          style={{ cursor: "pointer", fontSize: "1.5rem" }}
                          onClick={toggleCommentBox}

                        />

                        <MDBIcon icon="share" className="me-2" />
                      </div>

                    </MDBCardBody>
                    {/* {isCommentBoxVisible && (
                        <div className="comment-box">
                          <textarea placeholder="Write your comment..." className="form-control" rows="4"></textarea>
                          <button className="btn btn-primary mt-2">Post Comment</button>
                        </div>
                      )} */}
                    {isCommentBoxVisible && (
                      <div className="commentBoxContainer">
                        {/* Comment Input */}
                        <div className="commentBoxContainerTop">
                          <MDBInput
                            label="Write a comments..."
                            id={`comment-${item.post_id}`}
                            type="text"
                            value={commentData[item.post_id] || ""}
                            onChange={(e) =>
                              setCommentData({
                                ...commentData,
                                [item.post_id]: e.target.value,
                              })


                            }
                          />
                          <Button onClick={() => handleAddComment(item.post_id)}>
                            <SendIcon />
                          </Button>

                          {/* <MDBBtn
                            className="mt-2"
                            color="primary"
                            onClick={() => handleAddComment(item.post_id)}
                          >
                            Post
                          </MDBBtn> */}
                        </div>


                        {/* Display Comments */}
                        {/* <h6 className="mt-3">Comments:</h6> */}
                        <MDBListGroup style={{
                          maxHeight: '100px', // Set the desired height for the scrollable area
                          overflowY: 'scroll', // Enable vertical scrolling
                        }}>
                          {item.commentS &&
                            JSON.parse(item.commentS).map((comment, index) => (
                              <MDBListGroupItem key={index} className="d-flex align-items-start">
                                <img
                                  src={comment.profile_image}
                                  alt={comment.firstname}
                                  className="rounded-circle me-3"
                                  style={{ width: "40px", height: "40px" }}
                                />
                                <div>
                                  <strong>{`${comment.firstname} ${comment.lastname}`}</strong>
                                  <p className="mb-0">{comment.commentText}</p>
                                </div>
                              </MDBListGroupItem>
                            ))}
                        </MDBListGroup>
                      </div>
                    )}
                  </MDBCard>
                ))}
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;


