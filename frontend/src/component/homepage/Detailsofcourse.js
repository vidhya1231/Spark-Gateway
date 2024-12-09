import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import {
    Card, CardContent, Typography, Button, Box, Rating, CardMedia, Grid, Link, Modal, IconButton, List, ListItem,
    ListItemText, Divider, TextField

} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import sampleVideo from '../assets/sampleVideo.mp4'
import './Detailsofcourse.css';


const Detailsofcourse = () => {

    const location = useLocation();
    const [isExpanded, setIsExpanded] = useState(false);
    const { courseId } = location.state || {}; // Use optional chaining
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [visibleVideoIndex, setVisibleVideoIndex] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const profiles = [
        {
          profileImage: 'https://marketplace.canva.com/EAFqNrAJpQs/1/0/1600w/canva-neutral-pink-modern-circle-shape-linkedin-profile-picture-WAhofEY5L1U.jpg',
          profileName: 'Romna',
          commentTime: '2 hours ago',
          commentText: 'This is a sample comment text. This course is quite comprehensive when compared with other courses available on this platform that is why I bought it. It is packed full with amazing content and like the description, it did make me full stack web developer. The instructor is a very good teacher using visual aids (not just talking) and simple illustrations to drive home a point. This course does not teach everything but the basics of everything frontend and backend. I enjoyed the course, the jokes, the projects, challenges.'
        },
        {
          profileImage: 'https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?s=612x612&w=0&k=20&c=kPvoBm6qCYzQXMAn9JUtqLREXe9-PlZyMl9i-ibaVuY=', // Replace with another image URL
          profileName: 'Jane Smith',
          commentTime: '3 hours ago',
          commentText: 'This is another comment text. This course is quite comprehensive when compared with other courses available on this platform that is why I bought it. It is packed full with amazing content and like the description, it did make me full stack web developer. The instructor is a very good teacher using visual aids (not just talking) and simple illustrations to drive home a point. This course does not teach everything but the basics of everything frontend and backend. I enjoyed the course, the jokes, the projects, challenges.'
        },
        {
          profileImage: 'https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png', // Replace with another image URL
          profileName: 'Sam Johnson',
          commentTime: '1 hour ago',
          commentText: 'Here’s a different comment text. This course is quite comprehensive when compared with other courses available on this platform that is why I bought it. It is packed full with amazing content and like the description, it did make me full stack web developer. The instructor is a very good teacher using visual aids (not just talking) and simple illustrations to drive home a point. This course does not teach everything but the basics of everything frontend and backend. I enjoyed the course, the jokes, the projects, challenges.'
        },
        {
          profileImage: 'https://media.istockphoto.com/id/1198252585/photo/happy-indian-woman-look-at-webcam-doing-job-interview-videochat.jpg?s=612x612&w=0&k=20&c=4xvWW9lNc_VKMdMx9WYR491-NEoNt9su5Ug5CSHdD64=', // Replace with another image URL
          profileName: 'Alice Williams',
          commentTime: '5 hours ago',
          commentText: 'Yet another comment text here. This course is quite comprehensive when compared with other courses available on this platform that is why I bought it. It is packed full with amazing content and like the description, it did make me full stack web developer. The instructor is a very good teacher using visual aids (not just talking) and simple illustrations to drive home a point. This course does not teach everything but the basics of everything frontend and backend. I enjoyed the course, the jokes, the projects, challenges.'
        }
      ];



    const handleAddComment = () => {
        if (newComment.trim()) {
            setComments([...comments, newComment]);
            setNewComment(''); // Clear the input after adding
        }
    };
    


    console.log("courseId :::", courseId); // Debugging line

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

 

    const handlePlayClick = (index) => {
        setVisibleVideoIndex(index);
        setOpenModal(true); // Open the modal on play button click
    };

    const handleClose = () => {
        setOpenModal(false);
        setVisibleVideoIndex(null); // Reset the video index when closing the modal
    };


    const toggleDescription = () => {
        setIsExpanded(!isExpanded); // Toggle the expanded state
    };
    const courseContent = [
        {
            id: "1",
            title: "What You'll Get in This Course",
            icon: <PlayCircleOutlineIcon />,
            preview: "Preview",
            duration: "03:08",
            iframe: "https://www.youtube.com/embed/FYErehuSuuw?si=hNz6ud4UKhF2BWV3" // Add the iframe URL here
        },
        {
            id: "1",
            title: "What You'll Get in This Course",
            icon: <PlayCircleOutlineIcon />,
            preview: "Preview",
            duration: "03:08",
            iframe: "https://www.youtube.com/embed/FYErehuSuuw?si=hNz6ud4UKhF2BWV3" // Add the iframe URL here
        },
        {
            id: "2",
            title: "What You'll Get in This Course",
            icon: <PlayCircleOutlineIcon />,
            preview: "Preview",
            duration: "03:08",
            iframe: "https://www.youtube.com/embed/FYErehuSuuw?si=hNz6ud4UKhF2BWV3" // Add the iframe URL here
        },
        {
            id: "3",
            title: "What You'll Get in This Course",
            icon: <PlayCircleOutlineIcon />,
            preview: "Preview",
            duration: "03:08",
            iframe: "https://www.youtube.com/embed/FYErehuSuuw?si=hNz6ud4UKhF2BWV3" // Add the iframe URL here
        },
        {
            id: "4",
            title: "What You'll Get in This Course",
            icon: <PlayCircleOutlineIcon />,
            preview: "Preview",
            duration: "03:08",
            iframe: "https://www.youtube.com/embed/FYErehuSuuw?si=hNz6ud4UKhF2BWV3" // Add the iframe URL here
        },
    ];

    return (
        <>
            <Navbar />
            <div style={{ marginTop: '5%', display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, maxWidth: '90%', margin: 'auto', padding: 2, backgroundColor: '#1e1e1e', color: '#fff' }}>
                    <CardContent sx={{ flex: 1, padding: { xs: 1, sm: 2 } }}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', marginTop: 1, width: '80%' }}>
                            The Complete 2024 Web Development Bootcamp
                        </Typography>
                        <Typography variant="subtitle1" sx={{ marginTop: 1, width: '95%' }}>
                            {isExpanded
                                ? `Become a Full-Stack Web Developer with just ONE course. HTML, CSS, JavaScript, Node, React, PostgreSQL, Web3, and DApps Become a Full-Stack Web Developer with just ONE course. HTML, CSS, JavaScript, Node, React, PostgreSQL, Web3, and DApps Become a Full-Stack Web Developer with just ONE course. HTML, CSS, JavaScript, Node, React, PostgreSQL, Web3, and DApps Become a Full-Stack Web Developer with just ONE course. HTML, CSS, JavaScript, Node, React, PostgreSQL, Web3, and DApps Become a Full-Stack Web Developer with just ONE course. HTML, CSS, JavaScript, Node, React, PostgreSQL, Web3, and DApps`
                                : `Become a Full-Stack Web Developer with just ONE course. HTML, CSS, JavaScript, Node, React, PostgreSQL, Web3, and DApps...`}
                            <p
                                onClick={toggleExpand}
                                style={{
                                    color: 'blue',
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                    margin: '0',
                                    marginTop: '10px',
                                }}
                            >
                                Show {isExpanded ? 'Less' : 'More'}
                            </p>
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                            <Button variant="outlined" size="small" sx={{ color: '#FFD700', borderColor: '#FFD700', marginRight: 1 }}>
                                Bestseller
                            </Button>
                            <Rating value={4.7} precision={0.1} readOnly />
                        </Box>
                        <Typography variant="body2" color="gray" sx={{ marginTop: 1 }}>
                            Created by Dr. Angela Yu, Developer and Lead Instructor
                        </Typography>
                    </CardContent>

                    <CardContent sx={{ textAlign: 'center', backgroundColor: '#fff', borderRadius: 1, paddingY: 2, width: { xs: '100%', sm: '25%' }, maxHeight: '65vh' }}>
                        <CardMedia
                            component="img"
                            alt="Course Image"
                            height="200"
                            image="https://img.freepik.com/premium-vector/programming-software-app-development-big-data-processing_106788-1479.jpg"
                            sx={{ width: '100%', objectFit: 'cover', marginBottom: 2 }}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
                                <Typography variant="h5" color="#000">₹549</Typography>
                                {/* <Typography variant="body2" color="gray" sx={{ textDecoration: 'line-through', marginLeft: 1 }}>₹3,099</Typography> */}
                                {/* <Typography variant="body2" color="red" sx={{ marginLeft: 1 }}>82% off</Typography> */}
                            </Box>
                        </Box>
                        {/* <Typography variant="body2" color="orange">13 hours left at this price!</Typography> */}
                        <Button variant="contained" color="primary" startIcon={<ShoppingCartIcon />} sx={{ marginTop: 2 }}>
                            Buy Now
                        </Button>
                        {/* <Typography variant="caption" color="gray" sx={{ marginTop: 1, display: 'block' }}>
                            30-Day Money-Back Guarantee • Full Lifetime Access
                        </Typography> */}
                    </CardContent>
                </Card>
            </div>
            <div style={{ width: '89%', margin: '0 auto' }}>
                <Box
                    sx={{
                        padding: '20px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
                        What you'll learn
                    </Typography>
                    <Grid container spacing={2} alignItems="flex-start">
                        <Grid item xs={12} sm={6} sx={{ textAlign: 'left' }}>
                            <Typography sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                <CheckIcon fontSize="small" sx={{ marginRight: '8px' }} />
                                Build 16 web development projects for your portfolio, ready to apply for junior developer jobs.
                            </Typography>
                            <Typography sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                <CheckIcon fontSize="small" sx={{ marginRight: '8px' }} />
                                After the course, you will be able to build ANY website you want.
                            </Typography>
                            <Typography sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                <CheckIcon fontSize="small" sx={{ marginRight: '8px' }} />
                                Work as a freelance web developer.
                            </Typography>
                            <Typography sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                <CheckIcon fontSize="small" sx={{ marginRight: '8px' }} />
                                Master backend development with Node.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ textAlign: 'left' }}>
                            <Typography sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                <CheckIcon fontSize="small" sx={{ marginRight: '8px' }} />
                                Learn the latest technologies, including JavaScript, React, Node, and even Web3 development.
                            </Typography>
                            <Typography sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                <CheckIcon fontSize="small" sx={{ marginRight: '8px' }} />
                                Build fully-fledged websites and web apps for your startup or business.
                            </Typography>
                            <Typography sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                <CheckIcon fontSize="small" sx={{ marginRight: '8px' }} />
                                Master frontend development with React.
                            </Typography>
                            <Typography sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                <CheckIcon fontSize="small" sx={{ marginRight: '8px' }} />
                                Learn professional developer best practices.
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </div>

            <div>
                <Box sx={{ maxWidth: 800, margin: '0 auto', padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                    {courseContent.map((item, index) => (
                        <Box key={index} sx={{ marginBottom: '20px', borderBottom: '1px solid #e0e0e0', paddingBottom: '10px' }}>
                            <Grid container alignItems="center" spacing={2} sx={{ padding: '10px 0' }}>
                                <Grid item xs={1} onClick={() => handlePlayClick(index)} sx={{ cursor: 'pointer' }}>
                                    {item.icon}
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="body1" sx={{ color: '#1a0dab' }}>
                                        <Link href="#" underline="hover" color="inherit">{item.title}</Link>
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} sx={{ textAlign: 'right' }}>
                                    {item.preview && (
                                        <Link href="#" underline="hover" sx={{ color: '#1a0dab' }}>
                                            {item.preview}
                                        </Link>
                                    )}
                                </Grid>
                                <Grid item xs={1} sx={{ textAlign: 'right' }}>
                                    <Typography variant="body2" color="textSecondary">
                                        {item.duration}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    ))}
                </Box>
            </div>

            {/* Modal to display video */}
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="video-modal-title"
                aria-describedby="video-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: {
                            xs: '90%', // For extra small screens
                            sm: '80%', // For small screens
                            md: '70%', // For medium screens
                            lg: '60%', // For large screens
                            xl: '50%', // For extra large screens
                        },
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '8px',
                        maxHeight: '90vh', // Max height to keep it within viewport
                        overflowY: 'auto', // Scroll if content overflows
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography id="video-modal-title" variant="h6" component="h2">
                            {courseContent[visibleVideoIndex]?.title}
                        </Typography>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {visibleVideoIndex !== null && courseContent[visibleVideoIndex]?.iframe ? (
                        <video
                            src={sampleVideo}
                            controls
                            style={{
                                width: '100%', // Full width of the modal
                                height: 'auto', // Maintain aspect ratio
                            }}
                            onError={(e) => console.error('Error loading video:', e)}
                        >
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <Typography>No video available</Typography>
                    )}
                </Box>
            </Modal>
            <div id="top">
                <Box sx={{ padding: { xs: 2, sm: 4 }, maxWidth: 800, margin: 'auto' }}>
                    {/* Requirements Section */}
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                            Requirements
                        </Typography>
                        <List>
                            {[
                                "No programming experience needed - I'll teach you everything you need to know",
                                'A computer with access to the internet',
                                'No paid software required',
                                "I'll walk you through, step-by-step how to get all the software installed and set up",
                            ].map((requirement, index) => (
                                <ListItem key={index} sx={{ display: 'list-item', ml: 2 }}>
                                    {requirement}
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    {/* Description Section */}
                    <Box sx={{ mt: 4 }} >
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                            Description
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            Welcome to the Complete Web Development Bootcamp, <strong>the only course you need</strong> to learn to code and
                            become a full-stack web developer. With 150,000+ ratings and a 4.8 average, my Web Development course is one of the
                            <strong> HIGHEST RATED </strong> courses in the history of Udemy!
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            At 62+ hours, this Web Development course is without a doubt the <strong>most comprehensive</strong> web development course
                            available online. Even if you have <strong>zero</strong> programming experience, this course will take you from <strong>beginner
                                to mastery</strong>. Here's why:
                        </Typography>

                        {/* Show full reasons only when expanded */}
                        {isExpanded ? (
                            <List>
                                {[
                                    'The course is taught by the lead instructor at the App Brewery, London\'s leading in-person programming bootcamp.',
                                    'The course has been updated to be 2024 ready and you\'ll be learning the latest tools and technologies used at large companies such as Apple, Google, and Netflix.',
                                    'You will have lifetime access to the course material, allowing you to learn at your own pace.',
                                    'Join a community of 150,000+ students and network with fellow learners.',
                                ].map((reason, index) => (
                                    <ListItem key={index} sx={{ display: 'list-item', ml: 2 }}>
                                        {reason}
                                    </ListItem>
                                ))}
                            </List>
                        ) : null}

                        <Button className='showMoreBtn' variant="text" onClick={toggleDescription} sx={{ color: 'primary.main', }} >
                            {isExpanded ? 'Show less' : 'Show more'}
                        </Button>
                    </Box>
                </Box>
            </div>
            {/* Comment Section */}
            <div style={{ marginTop: '20px', padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
                
<Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
Reviews
                </Typography>
                
                <div className="comment-grid">
      {profiles.map((profile, index) => (
        <div key={index} className="comment-box">
          <div className="comment-top">
            <img src={profile.profileImage} alt="Profile" className="profile-image" />
            <div className="profile-details">
              <span className="profile-name">{profile.profileName}</span>
              <span className="comment-time">{profile.commentTime}</span>
            </div>
          </div>
          <div className="comment-bottom">
            <p className="comment-text">{profile.commentText}</p>
          </div>
        </div>
      ))}
    </div>




    <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
                Post Your Review
                </Typography>

                <TextField
                    label="Add a comment"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={2}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    sx={{ marginBottom: '10px' }}
                />

                <Button variant="contained" color="primary" onClick={handleAddComment}>
                    Post
                </Button>


    </div>


        </>
    );
};

export default Detailsofcourse;