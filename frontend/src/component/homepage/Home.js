import React, { useState, useRef, useEffect } from 'react';
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
import './Home.css'; 
import './Sidebar.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Modal, Button, TextField, IconButton } from '@mui/material';
import { Close as CloseIcon, Elderly } from '@mui/icons-material';
import { FaUser, FaUserFriends, FaSave, FaUsers, FaVideo, FaCalendarAlt, FaComment, FaCog } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faL, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { base_Url } from '../Base_Url/baseurl';
import Swal from 'sweetalert2';
import SendIcon from '@mui/icons-material/Send';
import DummyImages from '../assets/dummyImages.jpg'






const settings = ['Save', 'Block this user', 'Dont recommend this post', 'Report'];


export const Home = () => {
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


  useEffect(() => {
    if (userData.id) {
      handleUsertGet();
    }
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
  const [userResult, setUserResult] = useState([])
  const [userSuggetion, setUserSuggetion] = useState([])
  const [isCommentBoxVisible, setIsCommentBoxVisible] = useState(false);

  const toggleCommentBox = () => {
    setIsCommentBoxVisible(!isCommentBoxVisible);
  };

  const [commentData, setCommentData] = useState({});  
  const handleAddComment = async (postId) => {
    const userId = userData?.id;  

    if (!userId) {
      console.error("User ID is not available.");
      return;
    }

    const commentText = commentData[postId];  

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
        const newComment = data.Response.Data[0]; 

       
        setResult((prevState) =>
          prevState.map((post) => {
            if (post.post_id === postId) {
              let comments = post.commentS ? JSON.parse(post.commentS) : [];  
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

  //comment end


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

  //like end





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

    handleUsertGet();
    handleUsertGetAll()
    fetchData();
    handlePostGet();
  }, [])



  function formatDate(dateString) {
    const date = new Date(dateString); // Parse the input date string
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`; // Format as DD/MM/YYYY
  }



  const handlePostGet = async () => {
    const response = await fetch(`${base_Url}postGet`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();

    if (data.Response.Success == "1") {
      setResult(data.Response.Result)
      // console.log("post result data ::::>>>", data?.Response.Result);
      console.log("comments ::::>>>", data?.Response.Result);
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
    if (data.Response.Success == "1") {
      setUserResult(data.Response.Result[0])
      console.log("userResult :", data?.Response.Result);
    } else {
      console.log("user get failed");
    }
  }
  //friend list
  const handleUsertGetAll = async () => {
    const response = await fetch(`${base_Url}userGet`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
    if (data.Response.Success == "1") {
      setUserSuggetion(data.Response.Result[0])
      console.log("UserSuggetion :", data?.Response.Result);
    } else {
      console.log("user get failed");
    }
  }
  //friend list






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

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPostText(''); // Clear post text on closing
  };

  const handleTextChange = (e) => {
    setPostText(e.target.value);
  };

  // Handle file selection
  const handleAddPhotosClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostImage(file);
    }
  };



  const handlePost = async () => {
    console.log("userId:", userData?.id);
    console.log("description:", postText);
    console.log("file:", postImage);

    const formData = new FormData();
    formData.append("userId", userData?.id);
    formData.append("description", postText);
    formData.append("file", postImage);  // Ensure this is a valid file object (e.g., from an <input type="file">)

    const response = await fetch(`${base_Url}addPost`, {
      method: 'POST',
      body: formData,  // Correct: Do not set Content-Type
    });

    const data = await response.json();
    console.log(data);

    if (data.Response.Success === '1') {
      handleClose();
      Swal.fire({
        icon: 'success',
        title: 'Post Successful',
        text: 'You are being redirected...',
      }).then(() => {
        window.location.href = '/Home';
      });
    } else {
      handleClose();
      Swal.fire({
        icon: 'error',
        title: 'Error posting',
        text: data.Response.Message || 'Something went wrong.',
      });
    }
  };



  return (
    <>
      {isToken ? (

        <div className="container-fluid" style={{ height: '93vh', backgroundColor: '#e6e6e6', marginTop: '4%' }}>
          <div className="row mt-5">
            {/* =========================== Left Sidebar =========================== */}
            <div className="col-lg-3" id='noon2' style={{ marginTop: '0.5%' }} >
              <MDBCard className="card-width-adjust" >
                <MDBCardBody>
                  <div className=" d-flex flex-column p-3" id='sidebar' >
                    <img
                      src={userResult?.profile_image}
                      className="rounded-circle me-2"
                    // style={{ width: '50%', height: '50%', marginTop:'-35px', marginLeft:'50px'}}
                    />
                    <p id='profileName'>{userResult?.first_name} {userResult?.last_name}</p>

                    <ul class="nav nav-pills flex-column" id='navitem1'>
                      <li class="nav-item ">
                        <a id='categoryDiv' href="#friends" class="nav-link text-dark bg-light">
                          <i class="fas fa-user-friends"></i>
                          <p className='categoryTitle'>Friends</p>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a id='categoryDiv' href="#save" class="nav-link text-dark bg-light">
                          <i class="fas fa-save"></i>
                          <p className='categoryTitle'>Save</p>
                        </a>
                      </li>

                      <li class="nav-item">
                        <a id='categoryDiv' href="#videos" class="nav-link text-dark bg-light">
                          <i class="fas fa-video"></i>
                          <p className='categoryTitle'>Videos</p>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a id='categoryDiv' href="#events" class="nav-link text-dark bg-light">
                          <i class="fas fa-calendar-alt"></i>
                          <p className='categoryTitle'>Events</p>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a id='categoryDiv' href="#chats" class="nav-link text-dark bg-light">
                          <i class="fas fa-comment"></i>
                          <p className='categoryTitle'>Chats</p>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a id='categoryDiv' href="#settings" class="nav-link text-dark bg-light">
                          <i class="fas fa-cog"></i>
                          <p className='categoryTitle'>Settings</p>
                        </a>
                      </li>
                    </ul>
                  </div>

                </MDBCardBody>
              </MDBCard>
            </div>
            {/* ==================================== mid */}

            <div className="col-lg-6 mb-2" id='box2'>
              <div id='cards1' className="card-width-adjust">
                {/* Card 1 */}
                <MDBCard style={{ backgroundColor: '#fff', padding: '10px', width: '75%', marginBottom: '1rem', marginTop: '1.5%' }} id='cards'>
                  <MDBCardBody onClick={handleOpen} style={{ cursor: 'pointer' }}>
                    <MDBRow className="align-items-center" >
                      <MDBCol size="1">
                        <img
                          src={userResult?.profile_image}
                          className="rounded-circle"
                          style={{ width: '45px', height: '45px' }}
                        />
                      </MDBCol>
                      <MDBCol size="11">
                        <input
                          type="text"
                          className="form-control "
                          id='form11'
                          placeholder="What's on your mind?"
                          style={{
                            backgroundColor: '#f0f2f5',
                            border: 'none',
                            borderRadius: '20px',
                            padding: '10px 15px',
                            marginLeft: '10px',
                            width: '100%'
                          }}
                          readOnly
                        />
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>

                {/* Modal for creating a post */}
                <Modal open={open} onClose={handleClose}>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 400,
                      bgcolor: 'background.paper',
                      borderRadius: '10px',
                      boxShadow: 24,
                      p: 4
                    }}
                  >
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <h2>Create Post</h2>
                      <IconButton onClick={handleClose}>
                        <CloseIcon />
                      </IconButton>
                    </Box>

                    <MDBRow className="align-items-center mb-3">
                      <MDBCol size="2">
                        <img
                          src={userResult?.profile_image}
                          className="rounded-circle"
                          style={{ width: '40px', height: '40px' }}
                        />
                      </MDBCol>
                      <MDBCol size="10">
                        <h6>{userData?.first_name} {userData?.last_name}</h6>


                      </MDBCol>
                    </MDBRow>

                    <TextField
                      multiline
                      rows={4}
                      placeholder="What's on your mind?"
                      variant="outlined"
                      fullWidth
                      value={postText}
                      onChange={handleTextChange}
                    />

                    <Box
                      mt={2}
                      p={2}
                      border="1px dashed #ccc"
                      borderRadius="10px"
                      textAlign="center"
                      onClick={handleAddPhotosClick}
                      style={{ cursor: 'pointer' }}
                    >
                      <MDBIcon icon="image" className="me-1" style={{ fontSize: '24px' }} />
                      <p>Add Photos/Videos</p>
                      <input
                        type="file"
                        id="fileInput"
                        accept="image/*,video/*" // Accept both images and videos
                        style={{ display: 'none' }} // Hide the file input
                        onChange={handleFileChange}
                      />
                    </Box>

                    {postImage && (
                      <Box mt={2} textAlign="center">
                        <img
                          src={postImage}
                          style={{ width: '100%', height: 'auto' }}
                        />
                      </Box>
                    )}

                    <Box mt={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handlePost}
                      >
                        Post
                      </Button>
                    </Box>
                  </Box>
                </Modal>

                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  multiple
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png,.webp,.mp4,.avi,.mov,.mpeg,.webm" // Allow these formats
                />

                <div className='postOverAllDiv'>
                  {result.length > 0 && result.map((item) => (
                    <MDBCard className="card-width-adjust" style={{ backgroundColor: '#fff', marginBottom: '1rem', width: '75%' }} id='cards' key={item.post_id}>
                      <MDBCardBody>
                        <div className="d-flex justify-content-between align-items-center " >
                          <div className="d-flex align-items-center">
                            <img
                              src={item.userImage}
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
                          </div>

                          <MDBListGroup style={{
                            maxHeight: '100px', // Set the desired height for the scrollable area
                            overflowY: 'scroll', // Enable vertical scrolling
                          }}>
                            {item.commentS &&
                              JSON.parse(item.commentS).map((comment, index) => (
                                <MDBListGroupItem key={index} className="d-flex align-items-start">

                                  <div className='commentImageContainer'>
                                    <img src={DummyImages}
                                      className='commentImageBg'
                                    />

                                    <img
                                      src={comment.profile_image}
                                      className='commentImage'
                                    />
                                  </div>



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






              </div>
            </div>



            {/* ==================================== right */}
            <div className="col-lg-3 mt-2" style={{ backgroundColor: '#e6e6e6' }}>
              <MDBCard className="card-width-adjust" style={{ backgroundColor: 'noon' }} id="noon2">
                <MDBCardBody>
                  {[
                    { name: 'John Doe', image: 'https://randomuser.me/api/portraits/men/1.jpg' }, // Replace with your profile images
                    { name: 'Jane Smith', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
                    { name: 'Michael Brown', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
                    { name: 'Sarah Connor', image: 'https://randomuser.me/api/portraits/women/4.jpg' },
                    { name: 'Chris Evans', image: 'https://randomuser.me/api/portraits/men/5.jpg' },
                    { name: 'Emily Davis', image: 'https://randomuser.me/api/portraits/women/6.jpg' }
                  ].map((friend, index) => (
                    <div key={index}>
                      <h5 className="text-muted">{index === 0 ? 'Friend List' : ''}</h5>
                      <ul className="list-unstyled">
                        <li id='addContainer' className="dropdown-item my-2 d-flex">
                          {/* Profile Image */}
                          <img
                            src={friend.image}  // Dynamic image URL
                            alt="profile"
                            className="rounded-circle me-3"
                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                          />
                          {/* User's Name and Follow Button */}
                          <div className="d-flex flex-column">
                            <p className="m-0 fw-bold">{friend.name}</p> {/* Dynamic name */}
                            <button className="btn btn-outline-primary btn-sm">Follow</button>
                          </div>

                        </li>
                      </ul>
                    </div>
                  ))}
                </MDBCardBody>
              </MDBCard>
            </div>

          </div>
        </div >
      ) : (
        ''
      )}
    </>

  );
};

export default Home;
