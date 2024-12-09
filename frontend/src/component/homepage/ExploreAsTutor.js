import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { MDBCard, MDBCardBody, MDBCardImage, MDBIcon, MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBModalTitle, MDBInput } from 'mdb-react-ui-kit';


import './ExploreAsTutor.css'; // Make sure to import your CSS file
import { Carousel, initMDB } from "mdb-ui-kit";
import { Button } from '@mui/material';
import Modal from 'react-bootstrap/Modal'; // Add this line to import Modal
import { Form, Row, Col, Card } from 'react-bootstrap';

initMDB({ Carousel });

const ExploreAsTutor = () => {
    // State to hold the list of entries
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [bannerImage, setBannerImage] = useState(null);
    const [error, setError] = useState('');


    const [entries, setEntries] = useState([]);
    const [inputValues, setInputValues] = useState({
        title: '',
        description: '',
        time: '',
        price: '',
        bannerImage: '',
        video: ''
    });

    // Handler for adding a new entry
    const handleAdd = () => {
        console.log("input data :::", inputValues)

        if (inputValues.title && inputValues.description && inputValues.time && inputValues.video) {
            setEntries([...entries, inputValues]);
            setInputValues({ title: '', description: '', time: '', video: '' });
        } else {
            alert("Please fill in all fields.");
        }
    };

    // Handler for changing input values
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
    };

    // Handler for file input change
    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0]; // Get the first file from the input
        if (file) {
            // Create a URL for the file
            const fileURL = URL.createObjectURL(file);
            setInputValues(prevValues => ({
                ...prevValues,
                [fieldName]: fileURL // Update the specific field with the file URL
            }));
        }
    };


    // Submit handler to send data to the API
    const handleSubmit = async () => {
        console.log("title :", title);
        console.log("description :", description);
        console.log("bannerImage :", bannerImage);

        
        console.log("DATA :", JSON.stringify(entries));
        // Your API call logic here
    };

    {/* ******************************************************************************** */ }
    const handleBuyNow = (courseId) => {
        // Logic to handle buying action, e.g., navigate to checkout page
        console.log(`Buying course with ID: ${courseId}`);
        // Navigate to checkout page or show modal with more details
    };
    const [show, setShow] = useState(false);

    const courses = [
        {
            title: "100 Days of Code: The Complete Python Pro Bootcamp",
            instructor: "Dr. Angela Yu",
            rating: 4.7,
            reviews: 331174,
            price: 3299,
            bestseller: true,
            image: "https://img.freepik.com/premium-vector/programming-software-app-development-big-data-processing_106788-1479.jpg",
        },
        {
            title: "The Complete Python Bootcamp From Zero to Hero",
            instructor: "Jose Portilla",
            rating: 4.6,
            reviews: 520970,
            price: 3099,
            bestseller: false,
            image: "https://img.freepik.com/free-vector/coding-workshop-concept-illustration_114360-8172.jpg",
        },
        {
            title: "100 Days of Code: The Complete Python Pro Bootcamp",
            instructor: "Dr. Angela Yu",
            rating: 4.7,
            reviews: 331174,
            price: 3299,
            bestseller: true,
            image: "https://img.freepik.com/premium-vector/programming-software-app-development-big-data-processing_106788-1479.jpg",
        },
        {
            title: "The Complete Python Bootcamp From Zero to Hero",
            instructor: "Jose Portilla",
            rating: 4.6,
            reviews: 520970,
            price: 3099,
            bestseller: false,
            image: "https://img.freepik.com/free-vector/coding-workshop-concept-illustration_114360-8172.jpg",
        },
        {
            title: "100 Days of Code: The Complete Python Pro Bootcamp",
            instructor: "Dr. Angela Yu",
            rating: 4.7,
            reviews: 331174,
            price: 3299,
            bestseller: true,
            image: "https://img.freepik.com/premium-vector/programming-software-app-development-big-data-processing_106788-1479.jpg",
        },
        {
            title: "The Complete Python Bootcamp From Zero to Hero",
            instructor: "Jose Portilla",
            rating: 4.6,
            reviews: 520970,
            price: 3099,
            bestseller: false,
            image: "https://img.freepik.com/free-vector/coding-workshop-concept-illustration_114360-8172.jpg",
        },
        {
            title: "100 Days of Code: The Complete Python Pro Bootcamp",
            instructor: "Dr. Angela Yu",
            rating: 4.7,
            reviews: 331174,
            price: 3299,
            bestseller: true,
            image: "https://img.freepik.com/premium-vector/programming-software-app-development-big-data-processing_106788-1479.jpg",
        },
        {
            title: "The Complete Python Bootcamp From Zero to Hero",
            instructor: "Jose Portilla",
            rating: 4.6,
            reviews: 520970,
            price: 3099,
            bestseller: false,
            image: "https://img.freepik.com/free-vector/coding-workshop-concept-illustration_114360-8172.jpg",
        },
        {
            title: "100 Days of Code: The Complete Python Pro Bootcamp",
            instructor: "Dr. Angela Yu",
            rating: 4.7,
            reviews: 331174,
            price: 3299,
            bestseller: true,
            image: "https://img.freepik.com/premium-vector/programming-software-app-development-big-data-processing_106788-1479.jpg",
        },
        {
            title: "The Complete Python Bootcamp From Zero to Hero",
            instructor: "Jose Portilla",
            rating: 4.6,
            reviews: 520970,
            price: 3099,
            bestseller: false,
            image: "https://img.freepik.com/free-vector/coding-workshop-concept-illustration_114360-8172.jpg",
        },
        // Additional courses...
    ];

    const coursesname = [
        {
            title: "100 Days of Code: The Complete Python Pro Bootcamp",
            instructor: "Dr. Angela Yu",
            rating: 4.7,
            reviews: 331174,
            price: 3299,
            bestseller: true,
            image: "https://i.ytimg.com/vi/v8rodeArBHI/maxresdefault.jpg",
        },
        {
            title: "The Complete Python Bootcamp From Zero to Hero",
            instructor: "Jose Portilla",
            rating: 4.6,
            reviews: 520970,
            price: 3099,
            bestseller: false,
            image: "https://entrepreneurship.babson.edu/wp-content/uploads/2020/08/online-teaching-training-program.jpg",
        },
        {
            title: "100 Days of Code: The Complete Python Pro Bootcamp",
            instructor: "Dr. Angela Yu",
            rating: 4.7,
            reviews: 331174,
            price: 3299,
            bestseller: true,
            image: "https://resilienteducator.com/wp-content/uploads/2019/12/time-worksheet-edd-program.jpg",
        },
        {
            title: "The Complete Python Bootcamp From Zero to Hero",
            instructor: "Jose Portilla",
            rating: 4.6,
            reviews: 520970,
            price: 3099,
            bestseller: false,
            image: "https://img.freepik.com/free-vector/coding-workshop-concept-illustration_114360-8172.jpg",
        },
        {
            title: "100 Days of Code: The Complete Python Pro Bootcamp",
            instructor: "Dr. Angela Yu",
            rating: 4.7,
            reviews: 331174,
            price: 3299,
            bestseller: true,
            image: "https://cdn.livewebinar.com/site/img/marketing/blog/online+teaching.jpg",
        },
        {
            title: "The Complete Python Bootcamp From Zero to Hero",
            instructor: "Jose Portilla",
            rating: 4.6,
            reviews: 520970,
            price: 3099,
            bestseller: false,
            image: "https://img.freepik.com/free-vector/coding-workshop-concept-illustration_114360-8172.jpg",
        },
        {
            title: "100 Days of Code: The Complete Python Pro Bootcamp",
            instructor: "Dr. Angela Yu",
            rating: 4.7,
            reviews: 331174,
            price: 3299,
            bestseller: true,
            image: "https://img.freepik.com/premium-vector/programming-software-app-development-big-data-processing_106788-1479.jpg",
        },
        {
            title: "The Complete Python Bootcamp From Zero to Hero",
            instructor: "Jose Portilla",
            rating: 4.6,
            reviews: 520970,
            price: 3099,
            bestseller: false,
            image: "https://img.freepik.com/free-vector/coding-workshop-concept-illustration_114360-8172.jpg",
        },
        {
            title: "100 Days of Code: The Complete Python Pro Bootcamp",
            instructor: "Dr. Angela Yu",
            rating: 4.7,
            reviews: 331174,
            price: 3299,
            bestseller: true,
            image: "https://img.freepik.com/premium-vector/programming-software-app-development-big-data-processing_106788-1479.jpg",
        },
        {
            title: "The Complete Python Bootcamp From Zero to Hero",
            instructor: "Jose Portilla",
            rating: 4.6,
            reviews: 520970,
            price: 3099,
            bestseller: false,
            image: "https://img.freepik.com/free-vector/coding-workshop-concept-illustration_114360-8172.jpg",
        },
        // Additional courses...
    ];

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                stars.push(<FaStar key={i} className="text-warning" />);
            } else if (i - rating < 1) {
                stars.push(<FaStarHalfAlt key={i} className="text-warning" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-warning" />);
            }
        }
        return stars;
    };





    return (
        <>
            {/* <div style={{ marginTop: '20vh' }}>You are a Tutor</div>

            <div className='div1'>
                <input 
                    name="title"
                    value={inputValues.title}
                    placeholder='Title' 
                    type="text" 
                    onChange={handleInputChange}
                />
                <input 
                    name="description"
                    value={inputValues.description}
                    placeholder='Description' 
                    type="text" 
                    onChange={handleInputChange}
                />
                <input 
                    name="time"
                    value={inputValues.time}
                    type="time" 
                    onChange={handleInputChange}
                />
                <button onClick={handleAdd}>Add</button>
            </div>

            <div>
                {entries.map((entry, index) => (
                    <div key={index} className='entry'>
                        <h4>Title: {entry.title}</h4>
                        <p>Description: {entry.description}</p>
                        <p>Time: {entry.time}</p>
                    </div>
                ))}
            </div>

            <button onClick={handleSubmit}>Submit</button> */}
            {/* ******************************************************************************** */}

            <div className="container-fluid" style={{ maxHeight: '100vh', backgroundColor: 'white' }}>
                <div className="row h-100">
                    {/* Left Sidebar */}
                    <div className="col-md-1 p-3" id="sidebar-left"></div>

                    {/* Chat Area */}
                    {/* <div className="col-md-10 p-3 bg-light" id="chat-area" style={{ maxHeight: '100vh', overflowY: 'auto', marginTop: '5%' }}> */}
                    <div className="col-12 col-md-10 p-3 bg-light" id="chat-area" style={{ maxHeight: '100vh', overflowY: 'auto', marginTop: '5%', scrollBehavior: 'smooth', }}>


                        <div className="carousel-container" style={{ maxWidth: '100%', maxHeight: '300px', margin: 'auto' }}>
                            <div id="carouselExampleCaptions" className="carousel slide" data-mdb-ride="carousel" data-mdb-carousel-init>
                                <div className="carousel-indicators">
                                    <button
                                        type="button"
                                        data-mdb-target="#carouselExampleCaptions"
                                        data-mdb-slide-to="0"
                                        className="active"
                                        aria-current="true"
                                        aria-label="Slide 1"
                                    ></button>
                                    <button type="button" data-mdb-target="#carouselExampleCaptions" data-mdb-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-mdb-target="#carouselExampleCaptions" data-mdb-slide-to="2" aria-label="Slide 3"></button>
                                </div>
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img
                                            src="https://img.freepik.com/free-photo/html-css-collage-concept_23-2150061955.jpg"
                                            className="d-block w-100"
                                            alt="Wild Landscape"
                                            style={{ height: '400px', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="carousel-item">
                                        <img
                                            src="https://img.freepik.com/free-photo/e-learning-education-networking-website-study-concept_53876-167089.jpg"
                                            className="d-block w-100"
                                            alt="Camera"
                                            style={{ height: '400px', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="carousel-item">
                                        <img
                                            src="https://img.freepik.com/free-photo/web-design-website-coding-concept_53876-64989.jpg"
                                            className="d-block w-100"
                                            alt="Exotic Fruits"
                                            style={{ height: '400px', objectFit: 'cover' }}
                                        />
                                    </div>
                                </div>
                                <button className="carousel-control-prev" type="button" data-mdb-target="#carouselExampleCaptions" data-mdb-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-mdb-target="#carouselExampleCaptions" data-mdb-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10%' }}>
                            <Button variant="contained" color="primary" onClick={() => setShow(true)}>
                                Add Your Course
                            </Button>
                        </div>

                        <Modal show={show} fullscreen onHide={() => setShow(false)} id='modaledit' style={{ marginTop: '4%', height: '100%' }}>
                            <Modal.Header closeButton>
                                <Modal.Title>You are a Tutor</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }} >


                                <div className="container mt-4" id='modalbody'>
                                    <Card className="shadow-sm">
                                        <Card.Body>
                                            <h4 className="mb-4 text-center">Add New Course</h4>
                                            <Form>
                                                Title and Description
                                                <Row className="mb-3">
                                                    <Col md={6}>
                                                        <Form.Group controlId="formTitle">
                                                            <Form.Label>Course Title:</Form.Label>
                                                            <Form.Control
                                                                value={title}
                                                                placeholder="Enter Course Title"
                                                                type="text"
                                                                onChange={(e) => setTitle(e.target.value)}
                                                                style={{ backgroundColor: '#f0f8ff', height: '40px' }}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group controlId="formDescription">
                                                            <Form.Label>Course Description:</Form.Label>
                                                            <Form.Control
                                                                value={description}
                                                                placeholder="Enter Course Description"
                                                                type="text"
                                                                onChange={(e) => setDescription(e.target.value)}
                                                                style={{ backgroundColor: '#f0f8ff', height: '40px' }}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>

                                                {/* Upload Banner Image */}
                                                <Row className="mb-4">
                                                    <Col md={6}>
                                                        <Form.Group controlId="formBannerImage">
                                                            <Form.Label>Upload Course Banner Image:</Form.Label>
                                                            {/* <div>
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={(e) => {
                                                                        setBannerImage(e.target.files[0])
                                                                        console.log("selected image ::", e.target.files[0])
                                                                    }}
                                                                    style={{ display: 'none' }}
                                                                    id="bannerImageInput"
                                                                />
                                                                <Button
                                                                    variant="outline-primary"
                                                                    onClick={() => document.getElementById('bannerImageInput').click()}
                                                                >
                                                                    Choose File
                                                                </Button>
                                                                
                                                            </div> */}


<div>
            {/* The input element with a proper ID */}
            <input
                type="file"
                accept="image/*"
                id="bannerImageInput" // Ensure this ID matches the one used in getElementById
                onChange={(e) => {
                    setBannerImage(e.target.files[0]);
                    console.log("Selected image:", e.target.files[0]);
                }}
                style={{ display: "none" }} // Hidden input
            />

            {/* Button to trigger file input */}
            <Button
                variant="outline-primary"
                onClick={() => document.getElementById("bannerImageInput").click()} // Trigger click on the input
            >
                Choose File
            </Button>
        </div>

                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group controlId="formPrice">
                                                            <Form.Label>Price:</Form.Label>
                                                            <Form.Control
                                                                name="price"
                                                                value={inputValues.price}
                                                                placeholder="Enter Price"
                                                                type="number"
                                                                onChange={handleInputChange}
                                                                style={{ backgroundColor: '#f0f8ff', height: '40px' }}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>






                                                {/* Title and Description in one row */}
                                                <Row className="mb-3">
                                                    <Col md={6}>
                                                        <Form.Group controlId="formTitle">
                                                            <Form.Label>Title:</Form.Label>
                                                            <Form.Control
                                                                name="title"
                                                                value={inputValues.title}
                                                                placeholder="Enter Course Title"
                                                                type="text"
                                                                onChange={handleInputChange}
                                                                style={{ backgroundColor: '#f0f8ff', height: '40px' }}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group controlId="formDescription">
                                                            <Form.Label>Description:</Form.Label>
                                                            <Form.Control
                                                                name="description"
                                                                value={inputValues.description}
                                                                placeholder="Enter Course Description"
                                                                type="text"
                                                                onChange={handleInputChange}
                                                                style={{ backgroundColor: '#f0f8ff', height: '40px' }}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>

                                                {/* Time and Price in one row */}
                                                <Row className="mb-3">
                                                    <Col md={6}>
                                                        <Form.Group controlId="formTime">
                                                            <Form.Label>Time:</Form.Label>
                                                            <Form.Control
                                                                name="time"
                                                                value={inputValues.time}
                                                                type="time"
                                                                onChange={handleInputChange}
                                                                style={{ backgroundColor: '#f0f8ff', height: '40px' }}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group controlId="formVideo">
                                                            <Form.Label>Upload Video:</Form.Label>
                                                            <div>
                                                                <input
                                                                    type="file"
                                                                    accept="video/*"
                                                                    onChange={(e) => handleFileChange(e, 'video')} // replace 'videoFieldName' with your actual field name
                                                                    style={{ display: 'none' }}
                                                                    id="videoInput"
                                                                />
                                                                <Button
                                                                    variant="outline-primary"
                                                                    onClick={() => document.getElementById('videoInput').click()}
                                                                >
                                                                    Choose File
                                                                </Button>
                                                            </div>
                                                        </Form.Group>
                                                    </Col>
                                                   
                                                </Row>

                                                {/* Upload Video in one row */}
                                                <Row className="mb-4">

                                                  
                                                </Row>

                                                <Button variant="primary" onClick={handleAdd} style={{ marginTop: '15px', width: '100%' }}>
                                                    Add
                                                </Button>
                                            </Form>
                                        </Card.Body>
                                    </Card>

                                </div>

                                <div className="container mt-4">
                                    <Row>
                                        {entries.map((entry, index) => (
                                            <Col md={6} lg={4} key={index} className="mb-4">
                                                <Card className="shadow-sm h-100">
                                                    <Card.Body className='selectedVideoDiv'>
                                                        <div>
                                                            <p><strong>Title:</strong> {entry.title}</p>
                                                            <p><strong>Description:</strong> {entry.description}</p>
                                                            <p><strong>Time:</strong> {entry.time}</p>
                                                        </div>
                                                        <div>
                                                            <video width="100%" height="100%" controls>
                                                                <source src={entry.video} type="video/mp4" />
                                                                Your browser does not support the video tag.
                                                            </video>
                                                        </div>

                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </div>


                            </Modal.Body>
                            <Modal.Footer id='boxsize' style={{ position: 'sticky', bottom: 0, width: '10%', backgroundColor: 'lightgray', marginLeft: '45%', }}>
                                <Button variant="success" onClick={handleSubmit} style={{ width: '100%', justifyContent: 'center', color: 'black' }} >
                                    Submit
                                </Button>
                            </Modal.Footer>
                        </Modal>


















                        <h2 style={{ marginTop: '3%' }}>What to learn next</h2>
                        <h4 className="text-muted">Because you viewed "The Complete 2024 Web Development Bootcamp"</h4>


                        <MDBCard className="my-4">
                            <MDBCardBody>
                                <div className="scrollable-row" style={{ overflowX: 'auto' }}>
                                    {courses.map((course, index) => (
                                        <div
                                            className="d-inline-block mb-4"
                                            key={index}
                                            style={{ width: '250px', marginRight: '10px', marginTop: '20px' }}
                                        >
                                            <MDBCard style={{ height: '100%' }}>
                                                <img
                                                    src={course.image}
                                                    alt={course.title}
                                                    style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                                                />
                                                <MDBCardBody
                                                    className="d-flex flex-column justify-content-between"
                                                    style={{ height: '250px' }}
                                                >
                                                    <div>
                                                        <h5
                                                            className="card-title"
                                                            style={{
                                                                fontSize: '1.1rem',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                whiteSpace: 'nowrap',
                                                            }}
                                                        >
                                                            {course.title}
                                                        </h5>
                                                        <p className="card-text">{course.instructor}</p>
                                                    </div>
                                                    <div className="rating d-flex align-items-center mb-2">
                                                        {renderStars(course.rating)}
                                                        <span className="ms-2">({course.reviews.toLocaleString()})</span>
                                                    </div>
                                                    <p className="price mb-2">₹{course.price}</p>
                                                    {course.bestseller && (
                                                        <span className="badge bg-warning text-dark">Bestseller</span>
                                                    )}
                                                    {/* Buy Now Button */}
                                                    {/* <button
                                                        className="btn btn-primary mt-3"
                                                        onClick={() => handleBuyNow(course.id)}
                                                    >
                                                        Buy Now
                                                    </button> */}
                                                </MDBCardBody>
                                            </MDBCard>
                                        </div>
                                    ))}
                                </div>
                            </MDBCardBody>
                        </MDBCard>

                        <h4 style={{ marginTop: '1%' }}>Recommended for you</h4>


                        <MDBCard className="my-4">
                            <MDBCardBody>
                                <div className="scrollable-row" style={{ overflowX: 'auto' }}>
                                    {coursesname.map((course, index) => (
                                        <div
                                            className="d-inline-block mb-4"
                                            key={index}
                                            style={{ width: '250px', marginRight: '10px', marginTop: '20px' }}
                                        >
                                            <MDBCard style={{ height: '100%' }}>
                                                <img
                                                    src={course.image}
                                                    alt={course.title}
                                                    style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                                                />
                                                <MDBCardBody
                                                    className="d-flex flex-column justify-content-between"
                                                    style={{ height: '250px' }} // Increased height to accommodate the button
                                                >
                                                    <div>
                                                        <h5
                                                            className="card-title"
                                                            style={{
                                                                fontSize: '1.1rem',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                whiteSpace: 'nowrap',
                                                            }}
                                                        >
                                                            {course.title}
                                                        </h5>
                                                        <p className="card-text">{course.instructor}</p>
                                                    </div>
                                                    <div className="rating d-flex align-items-center mb-2">
                                                        {renderStars(course.rating)}
                                                        <span className="ms-2">({course.reviews.toLocaleString()})</span>
                                                    </div>
                                                    <p className="price mb-2">₹{course.price}</p>
                                                    {course.bestseller && (
                                                        <span className="badge bg-warning text-dark">Bestseller</span>
                                                    )}
                                                    {/* Buy Now Button */}
                                                    {/* <button
                                                        className="btn btn-primary mt-3"
                                                        onClick={() => handleBuyNow(course.id)} // Call buy function with course ID
                                                    >
                                                        Buy Now
                                                    </button> */}
                                                </MDBCardBody>
                                            </MDBCard>
                                        </div>
                                    ))}
                                </div>
                            </MDBCardBody>
                        </MDBCard>





                        <h4 className="text-muted">Popular for Web Developers
                        </h4>



                        <MDBCard className="my-4">
                            <MDBCardBody>
                                <div className="scrollable-row" style={{ overflowX: 'auto' }}>
                                    {courses.map((course, index) => (
                                        <div
                                            className="d-inline-block mb-4"
                                            key={index}
                                            style={{ width: '250px', marginRight: '10px', marginTop: '20px' }}
                                        >
                                            <MDBCard style={{ height: '100%' }}>
                                                <img
                                                    src={course.image}
                                                    alt={course.title}
                                                    style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                                                />
                                                <MDBCardBody
                                                    className="d-flex flex-column justify-content-between"
                                                    style={{ height: '250px' }}
                                                >
                                                    <div>
                                                        <h5
                                                            className="card-title"
                                                            style={{
                                                                fontSize: '1.1rem',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                whiteSpace: 'nowrap',
                                                            }}
                                                        >
                                                            {course.title}
                                                        </h5>
                                                        <p className="card-text">{course.instructor}</p>
                                                    </div>
                                                    <div className="rating d-flex align-items-center mb-2">
                                                        {renderStars(course.rating)}
                                                        <span className="ms-2">({course.reviews.toLocaleString()})</span>
                                                    </div>
                                                    <p className="price mb-2">₹{course.price}</p>
                                                    {course.bestseller && (
                                                        <span className="badge bg-warning text-dark">Bestseller</span>
                                                    )}
                                                    {/* Buy Now Button */}
                                                    {/* <button
                                                        className="btn btn-primary mt-3"
                                                        onClick={() => handleBuyNow(course.id)}
                                                    >
                                                        Buy Now
                                                    </button> */}
                                                </MDBCardBody>
                                            </MDBCard>
                                        </div>
                                    ))}
                                </div>
                            </MDBCardBody>
                        </MDBCard>


                        {/* <div className='text-items'>
                            <h5>Topics recommended for you</h5>
                            <div className='text-list'>
                                <div className='text-item'> Web Development</div>
                                <div className='text-item'>Python</div>
                                <div className='text-item'>JavaScript</div>
                                <div className='text-item'>Data Science</div>
                                <div className='text-item'>Node.Js</div>
                                <div className='text-item'>Machine Learning</div>
                                <div className='text-item'>MongoDB</div>
                                <div className='text-item'>Flask</div>
                                <div className='text-item'>CSS</div>
                                <div className='text-item'>Web Scraping</div>
                                <div className='text-item'>Front End Web Development</div>
                                <div className='text-item'>Programming Fundamentals</div>
                            </div>
                        </div> */}
                    </div>

                    {/* Right Sidebar */}
                    <div className="col-md-1 p-3" id="sidebar-right"></div>
                </div>
            </div >
        </>
    );
};

export default ExploreAsTutor;
