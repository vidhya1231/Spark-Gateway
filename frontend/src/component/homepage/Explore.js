import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { MDBCard, MDBCardBody, MDBCardImage, MDBIcon } from 'mdb-react-ui-kit';
import './Explore.css'; // Make sure to import your CSS file
import { Carousel, initMDB } from "mdb-ui-kit";
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


initMDB({ Carousel });
const Explore = () => {
  const navigate = useNavigate();

  const handleBuyNow = (courseId) => {
    navigate('/detailsofcourse', { state: { courseId } });
  };

  const courses = [
    {
      id:'1',
      title: "100 Days of Code: The Complete Python Pro Bootcamp",
      instructor: "Dr. Angela Yu",
      rating: 4.7,
      reviews: 331174,
      price: 3299,
      bestseller: true,
      image: "https://img.freepik.com/premium-vector/programming-software-app-development-big-data-processing_106788-1479.jpg",
    },
    {
      id:'2',
      title: "The Complete Python Bootcamp From Zero to Hero",
      instructor: "Jose Portilla",
      rating: 4.6,
      reviews: 520970,
      price: 3099,
      bestseller: false,
      image: "https://img.freepik.com/free-vector/coding-workshop-concept-illustration_114360-8172.jpg",
    },
    {
      id:'3',
      title: "100 Days of Code: The Complete Python Pro Bootcamp",
      instructor: "Dr. Angela Yu",
      rating: 4.7,
      reviews: 331174,
      price: 3299,
      bestseller: true,
      image: "https://img.freepik.com/premium-vector/programming-software-app-development-big-data-processing_106788-1479.jpg",
    },
    {
      id:'4',
      title: "The Complete Python Bootcamp From Zero to Hero",
      instructor: "Jose Portilla",
      rating: 4.6,
      reviews: 520970,
      price: 3099,
      bestseller: false,
      image: "https://img.freepik.com/free-vector/coding-workshop-concept-illustration_114360-8172.jpg",
    },
    {
      id:'5',
      title: "100 Days of Code: The Complete Python Pro Bootcamp",
      instructor: "Dr. Angela Yu",
      rating: 4.7,
      reviews: 331174,
      price: 3299,
      bestseller: true,
      image: "https://img.freepik.com/premium-vector/programming-software-app-development-big-data-processing_106788-1479.jpg",
    },
    {
      id:'6',
      title: "The Complete Python Bootcamp From Zero to Hero",
      instructor: "Jose Portilla",
      rating: 4.6,
      reviews: 520970,
      price: 3099,
      bestseller: false,
      image: "https://img.freepik.com/free-vector/coding-workshop-concept-illustration_114360-8172.jpg",
    },
    {
      id:'7',
      title: "100 Days of Code: The Complete Python Pro Bootcamp",
      instructor: "Dr. Angela Yu",
      rating: 4.7,
      reviews: 331174,
      price: 3299,
      bestseller: true,
      image: "https://img.freepik.com/premium-vector/programming-software-app-development-big-data-processing_106788-1479.jpg",
    },
    {
      id:'8',
      title: "The Complete Python Bootcamp From Zero to Hero",
      instructor: "Jose Portilla",
      rating: 4.6,
      reviews: 520970,
      price: 3099,
      bestseller: false,
      image: "https://img.freepik.com/free-vector/coding-workshop-concept-illustration_114360-8172.jpg",
    },
    {
      id:'9',
      title: "100 Days of Code: The Complete Python Pro Bootcamp",
      instructor: "Dr. Angela Yu",
      rating: 4.7,
      reviews: 331174,
      price: 3299,
      bestseller: true,
      image: "https://img.freepik.com/premium-vector/programming-software-app-development-big-data-processing_106788-1479.jpg",
    },
    {
      id:'10',
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
















          <h2 style={{ marginTop: '10%' }}>What to learn next</h2>
          <h4 className="text-muted">Because you viewed "The Complete 2024 Web Development Bootcamp"</h4>
          
          

          <MDBCard className="my-4" >
            <MDBCardBody>
              <div className="scrollable-row" style={{ overflowX: 'auto' }} >
                {courses.map((course, index)  => (
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
                          <span className="badge text-dark">Bestseller</span>
                        )}
                        {/* Buy Now Button */}
                        
                        <button
                          className="btn btn-primary mt-3"
                          onClick={() => handleBuyNow(course.id)}
                        >
                          Buy Now
                        </button>
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
                        <button
                          className="btn btn-primary mt-3"
                          onClick={() => handleBuyNow(course.id)} // Call buy function with course ID
                        >
                          Buy Now
                        </button>
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
                        <button
                          className="btn btn-primary mt-3"
                          onClick={() => handleBuyNow(course.id)}
                        >
                          Buy Now
                        </button>
                      </MDBCardBody>
                    </MDBCard>
                  </div>
                ))}
              </div>
            </MDBCardBody>
          </MDBCard>


          <div className='text-items'>
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
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-md-1 p-3" id="sidebar-right"></div>
      </div>
    </div>
  );
};

export default Explore;
