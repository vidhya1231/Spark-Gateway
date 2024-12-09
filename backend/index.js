const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require('path');
const e = require("express");
const { error } = require("console");
const fs = require('fs'); // Import the fs module
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt'); // Import bcrypt
const saltRounds = 10;

const PORT = 8001;


const app = express();
// app.use(express.json());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.json());
// app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Database connection
var db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "vidhya@123",
    database: "finalproject",
});

db.connect(function (err) {
    if (err) {
        console.log("Database connection error:", err);
    } else {
        console.log("Database Connected");
    }
});


const imageUrl = `http://localhost:${PORT}/`







const SECRET_KEY = "final_project_token";












app.get("/login", (req, res) => {
    const { mobile, password } = req.query;

    if (!mobile) {
        return res.status(200).send({
            Response: {
                Success: '0',
                Message: "Please enter your mobile number."
            }
        });
    }

    if (!password) {
        return res.status(200).send({
            Response: {
                Success: '0',
                Message: "Please enter your password."
            }
        });
    }

    console.log("mobile :", mobile);
    console.log("password :", password);

    const checkQuery = `SELECT * FROM users WHERE mobile_number = ?`;

    db.query(checkQuery, [mobile], async (error, result) => {
        if (error) {
            console.error("Error while querying the database:", error);
            return res.status(500).send({
                Response: {
                    Success: '0',
                    Message: "An error occurred during login. Please try again later.",
                },
            });
        }

        if (result.length === 0) {
            return res.status(200).send({
                Response: {
                    Success: '0',
                    Message: "Invalid mobile number.",
                },
            });
        }

        // Extract the hashed password from the database result
        const user = result[0];
        const hashedPassword = user.password;

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, hashedPassword);

        if (!isMatch) {
            return res.status(200).send({
                Response: {
                    Success: '0',
                    Message: "Invalid password.",
                },
            });
        }

        // Prepare user data to include in the response
        const userData = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            mobile_number: user.mobile_number,
        };

        // Generate JWT token
        const token = jwt.sign({ id: userData.id, mobile: userData.mobile_number }, SECRET_KEY, {
            expiresIn: "4h",
        });

        console.log("Generated token:", token);

        return res.status(200).send({
            Response: {
                Success: '1',
                Message: "Login successful.",
                Result: [{ token, userData }],
            },
        });
    });
});









const verifyToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Extract token

    if (!token) {
        return res.status(401).send({
            Response: {
                Success: '0',
                Message: "Access denied. Token not found.",
            },
        });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Attach decoded token data to the request object
        next(); // Pass control to the next middleware/handler
    } catch (error) {
        return res.status(401).send({
            Response: {
                Success: '0',
                Message: "Invalid or expired token.",
            },
        });
    }
};


app.get("/check_token", verifyToken, (req, res) => {
    return res.status(200).send({
        Response: {
            Success: '1',
            Message: "Token is valid.",
            User: req.user,
        },
    });
});







app.post('/register', async (req, res) => {
    const { firstName, lastName, email, mobile, password } = req.body;

    // Debugging log to check if data is coming correctly
    console.log("firstName :::>>>", firstName);
    console.log("lastName :::>>>", lastName);
    console.log("email :::>>>", email);
    console.log("mobile :::>>>", mobile);
    console.log("password :::>>>", password);

    const mobileRegex = /^[6-9]\d{9}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!firstName) {
        return res.send({ Response: { Success: '0', Message: 'Please provide your first name.' } });
    }

    if (!lastName) {
        return res.send({ Response: { Success: '0', Message: 'Please provide your last name.' } });
    }

    if (!email) {
        return res.send({ Response: { Success: '0', Message: 'Please provide an email address.' } });
    }

    if (!emailRegex.test(email)) {
        return res.send({ Response: { Success: '0', Message: 'Please provide a valid email address.' } });
    }

    if (!mobile) {
        return res.send({ Response: { Success: '0', Message: 'Please provide your mobile number.' } });
    }

    if (!mobileRegex.test(mobile)) {
        return res.send({ Response: { Success: '0', Message: 'Please enter a valid mobile number.' } });
    }

    if (!password) {
        return res.send({ Response: { Success: '0', Message: 'Please provide a password.' } });
    }

    if (!passwordRegex.test(password)) {
        return res.send({ Response: { Success: '0', Message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.' } });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const query = `SELECT * FROM users WHERE mobile_number = ${mobile}`;

    db.query(query, (error, result) => {
        if (error) {
            return res.send({ Response: { Success: '0', Message: `Execution error: ${error}` } });
        }

        if (result.length > 0) {
            return res.send({ Response: { Success: '0', Message: 'This mobile number is already registered.' } });
        } else {
            const insertQuery = 'INSERT INTO users (first_name, last_name, email, mobile_number, password, roleType) VALUES (?, ?, ?, ?, ?, ?)';
            db.query(insertQuery, [firstName, lastName, email, mobile, hashedPassword, 1], (error, result) => {
                if (error) {
                    return res.send({ Response: { Success: '0', Message: `Execution error: ${error}` } });
                } else {
                    return res.send({ Response: { Success: '1', Message: 'You have registered successfully.' } });
                }
            });
        }
    });
});







///////////////////////userget



app.get('/userGet', (req, res) => {
    const id = req.query.id;

    let query = 'SELECT * FROM users WHERE 1 = 1';

    if (id) {
        query += ` AND id = ${id}`;
    }

    db.query(query, (error, result) => {
        if (error) {
            return res.send({
                Response: {
                    Success: '0',
                    Message: `Execution error: ${error}`
                }
            });
        }
        // imageUrl
        if (result.length > 0) {

            const data = result.map((item) => ({
                id: item.id,
                first_name: item.first_name,
                last_name: item.last_name,
                mobile_number: item.mobile_number,
                email: item.email,
                password: item.password,
                street: item.street,
                area: item.area,
                city: item.city,
                state: item.state,
                country: item.country,
                profile_image: imageUrl + item.profile_image, 
                age: item.age,
                dob: item.dob,
                friend_list: item.friend_list,
                chat: item.chat,
                saved_post: item.saved_post,
                blocked_user: item.blocked_user,
                status: item.status,
                admin_status: item.admin_status,
                roleType: item.roleType,
                education: item.education,
                created_at: item.created_at,
                updated_at: item.updated_at,
            }));


            return res.send({
                Response: {
                    Result: data,
                    Success: '1',
                    Message: 'Successfully listed.'
                }
            });
        } else {
            return res.send({
                Response: {
                    Success: '0',
                    Message: 'No data found'
                }
            });
        }
    });
});






//****************************post image in home page API****************************//

app.post('/addPost', (req, res) => {
    try {
        const userId = req.body.userId;
        const description = req.body.description;
        const file = req.files?.file;




        if (!userId) {
            return res.status(200).send({
                Response: {
                    Success: '0',
                    Message: 'Valid user ID is required.'
                }
            });
        }

        if (!description || description.trim() === '') {
            return res.status(200).send({
                Response: {
                    Success: '0',
                    Message: 'Description is required.'
                }
            });
        }

        if (!file) {
            return res.status(200).send({
                Response: {
                    Success: '0',
                    Message: 'Image file is required.'
                }
            });
        }



        const validImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!validImageTypes.includes(file.mimetype)) {
            return res.status(200).send({
                Response: {
                    Success: '0',
                    Message: 'Invalid image type. Only JPEG, PNG, and WebP are allowed.'
                }
            });
        }

        const imagePath = `uploads/${Date.now()}_${file.name}`;





        const query = `select * from users where id= ${userId}`

        db.query(query, (error, result) => {
            if (error) {
                return res.send(
                    {
                        Response: {
                            Success: '0',
                            Message: `Execution error : ${error}`
                        }
                    }
                );
            }


            if (result.length > 0) {

                file.mv(imagePath, async (err) => {
                    if (err) {
                        console.error('File upload error:', err);
                        return res.status(200).send({
                            Response: {
                                Success: '0',
                                Message: 'Failed to upload image. Please try again later.'
                            }
                        });
                    }

                    const query = 'INSERT INTO post (user_id, description, image) VALUES (?, ?, ?)';
                    db.query(query, [userId, description, imagePath], (error, result) => {
                        if (error) {
                            console.error('Database error:', error);
                            return res.status(200).send({
                                Response: {
                                    Success: '0',
                                    Message: 'Internal server error. Could not save post.'
                                }
                            });
                        }

                        return res.send(
                            {
                                Response: {
                                    Success: '1',
                                    Message: 'Post added successfully.'
                                }
                            }
                        );
                    });
                });
            } else {
                return res.send(
                    {
                        Response: {
                            Success: '0',
                            Message: 'user id is not found.'
                        }
                    }
                );
            }
        })

    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(200).send({
            Response: {
                Success: '0',
                Message: 'An unexpected error occurred. Please try again later.'
            }
        });
    }
});





// ============================================ post get 

app.get('/postGet', (req, res) => {
    const userId = req.query.userId;

    let query = `
        SELECT 
            post.*,
            users.profile_image AS userImage, 
            users.first_name AS userFirstName, 
            users.last_name AS userLastName
        FROM post
        JOIN users ON post.user_id = users.id
        WHERE 1 = 1
    `;

    if (userId) {
        query += ` AND post.user_id = ${db.escape(userId)}`; 
    }

    query += ` AND post.status = 1 order by created_at desc`;

    db.query(query, (error, result) => {
        if (error) {
            return res.send({
                Response: {
                    Success: '0',
                    Message: `Execution error: ${error}`
                }
            });
        }

        if (result.length > 0) {
            const data = result.map(item => ({
                post_id: item.post_id,
                user_id: item.user_id,
                description: item.description,
                image: imageUrl + item.image,
                likes: item.likes,
                commentS: item.commentS,
                report: item.report,
                status: item.status,
                admin_status: item.admin_status,
                created_at: item.created_at,
                updated_at: item.updated_at,
                userImage: imageUrl + item.userImage,
                userFirstName: item.userFirstName, 
                userLastName: item.userLastName 
            }));

            return res.send({
                Response: {
                    Result: data,
                    Success: '1',
                    Message: 'Successfully listed.'
                }
            });
        } else {
            return res.send({
                Response: {
                    Success: '0',
                    Message: 'No data found'
                }
            });
        }
    });
});


// ============================ post inactive 

app.post('/deletePost', (req, res) => {
    const postId = req.body.postId;
    const userId = req.body.userId;

    if (!postId && !userId) {
        return res.send({
            Response: {
                Success: '0',
                Message: `Please provide a valid user id or post id`
            }
        });
    }


    const checkQuery = `SELECT * FROM post WHERE post_id = ${postId} user_id = ${userId}`

    db.query(checkQuery, (error, result) => {
        if (error) {
            return res.send({
                Response: {
                    Success: '0',
                    Message: `Execution error: ${error}`
                }
            });
        }


        if (result.length > 0) {

            const query = `update post set status = 0 where post_id =${postId}`

            db.query(query, (error, result) => {
                if (error) {
                    return res.send({
                        Response: {
                            Success: '0',
                            Message: `Execution error: ${error}`
                        }
                    });
                } else {
                    return res.send({
                        Response: {
                            Success: '1',
                            Message: 'Your post have been deleted successfully.'
                        }
                    });
                }
            });

        } else {
            return res.send({
                Response: {
                    Success: '0',
                    Message: 'No data found'
                }
            });
        }
    });
})



// ============================ post like
app.post('/likepost', (req, res) => {
    console.log('Request Body:', req.body);
    const { userId, postId } = req.body;

    if (!userId) {
        return res.status(200).send({
            Response: {
                Success: '0',
                Message: 'User ID are required.'
            }
        });
    }
    if (!postId) {
        return res.status(200).send({
            Response: {
                Success: '0',
                Message: 'Post ID are required.'
            }
        });
    }

    const checkUserQuery = 'SELECT * FROM users WHERE id = ? AND status = "1"';



    db.query(checkUserQuery, [userId], (err, userResult) => {
        if (err) {
            return res.status(200).send({
                Response: {
                    Success: '0',
                    Message: `Execution error: ${err}` 
                }
            });
        }

        if (userResult.length > 0) {

            const checkPostQuery = 'SELECT * FROM post WHERE post_id = ?'; 
            db.query(checkPostQuery, [postId], (err, postResult) => {
                if (err) {
                    return res.status(200).send({
                        Response: {
                            Success: '0',
                            Message: `Execution error: ${err}` 
                        }
                    });
                }

                if (postResult.length > 0) {
                    const data = postResult[0]; 
                    let likes = data.likes ? JSON.parse(data.likes) : [];

                    const existingLikeIndex = likes.findIndex(like => like.id === userId);

                    if (existingLikeIndex > -1) {
                        likes.splice(existingLikeIndex, 1);

                        const updateLikesQuery = 'UPDATE post SET likes = ? WHERE post_id = ?';
                        db.query(updateLikesQuery, [JSON.stringify(likes), postId], (err, updateResult) => {
                            if (err) {
                                return res.status(200).send({
                                    Response: {
                                        Success: '0',
                                        Message: `Execution error: ${err}` 
                                    }
                                });
                            }

                            return res.send({
                                Response: {
                                    Success: '1',
                                    Message: 'Your Like has been removed successfully.',
                                    Result: likes 
                                }
                            });
                        });
                    } else {
                        // User has not liked this post, so add their like
                        likes.push({ id: userId });

                        // Update the post's likes in the database
                        const updateLikesQuery = 'UPDATE post SET likes = ? WHERE post_id = ?';
                        db.query(updateLikesQuery, [JSON.stringify(likes), postId], (err, updateResult) => {
                            if (err) {
                                return res.status(200).send({
                                    Response: {
                                        Success: '0',
                                        Message: `Execution error: ${err}` // Error message for query execution error
                                    }
                                });
                            }

                            // Return success message after adding the like
                            return res.send({
                                Response: {
                                    Success: '1',
                                    Message: 'Your Like has been added successfully.',
                                    Result: likes // Return the updated likes array
                                }
                            });
                        });
                    }
                } else {
                    // If the post is not found, return an error
                    return res.send({
                        Response: {
                            Success: '0',
                            Message: 'Post not found.' // Error message if post does not exist
                        }
                    });
                }
            });
        } else {
            return res.status(200).send({
                Response: {
                    Success: '0',
                    Message: 'User not found or inactive.' // Error message if user is not active
                }
            });
        }


    });
});






// ============================ post addcomment

app.post('/addcomment', (req, res) => {
    const { userId, postId, commentText } = req.body;

    // Check if all required fields (userId, postId, commentText) are provided
    if (!userId || !postId || !commentText) {
        return res.status(200).send({
            Response: {
                Success: '0',
                Message: 'User ID, Post ID, and Comment Text are required.'
            }
        });
    }

    // Check if the user exists and is active
    const checkUserQuery = 'SELECT id, first_name AS firstname, last_name AS lastname, profile_image FROM users WHERE id = ? AND status = "1"';
    db.query(checkUserQuery, [userId], (err, userResult) => {
        if (err) {
            return res.status(200).send({
                Response: {
                    Success: '0',
                    Message: `Execution error: ${err}`
                }
            });
        }

        if (userResult.length === 0) {
            return res.status(200).send({
                Response: {
                    Success: '0',
                    Message: 'User not found or inactive.'
                }
            });
        }

        const { firstname, lastname, profile_image } = userResult[0];

        const checkPostQuery = 'SELECT * FROM post WHERE post_id = ?';
        db.query(checkPostQuery, [postId], (err, postResult) => {
            if (err) {
                return res.status(200).send({
                    Response: {
                        Success: '0',
                        Message: `Execution error: ${err}`
                    }
                });
            }

            // If the post exists
            if (postResult.length > 0) {
                const data = postResult[0];
                let comments = data.commentS ? JSON.parse(data.commentS) : []; // Parse the comments array if it exists

                const newComment = {
                    userId,
                    firstname,
                    lastname,
                    profile_image: profile_image ? `${imageUrl}${profile_image}` : null,
                    commentText
                };
                comments.push(newComment);

                // Update the post's comments in the database
                const updateCommentsQuery = 'UPDATE post SET commentS = ? WHERE post_id = ?';
                db.query(updateCommentsQuery, [JSON.stringify(comments), postId], (err) => {
                    if (err) {
                        return res.status(200).send({
                            Response: {
                                Success: '0',
                                Message: `Execution error: ${err}`
                            }
                        });
                    }

                    // Success response for adding a comment (only the newly added comment)
                    return res.send({
                        Response: {
                            Success: '1',
                            Message: 'Your comment has been added successfully.',
                            Data: [newComment] // Only return the newly added comment
                        }
                    });
                });
            }
            // } else {
            //     // Error response if the post does not exist
            //     return res.status(200).send({
            //         Response: {
            //             Success: '0',
            //             Message: 'Post not found.'
            //         }
            //     });
            // }
        });
    });
});




// =====================================================updateprofile


app.post('/updateprofile', (req, res) => {
    const { userId, firstName, lastName, email, password, street, area, city, state, country, age, dob, education } = req.body;
    const image = req.files?.image || null;

    console.log("profile image ::>>", image);
    

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    if (email && !emailRegex.test(email)) {
        return res.send({
            Response: {
                Success: '0',
                Message: 'Please provide a valid email id.'
            }
        });
    }

    if (password && !passwordRegex.test(password)) {
        return res.send({
            Response: {
                Success: '0',
                Message: 'Please provide a valid password.'
            }
        });
    }

    if (
        !firstName &&
        !lastName &&
        !email &&
        !password &&
        !street &&
        !area &&
        !city &&
        !state &&
        !country &&
        !age &&
        !dob &&
        !education
    ) {
        return res.send({
            Response: {
                Success: '0',
                Message: 'Please provide at least one detail to update.'
            }
        });
    }

    if (!userId) {
        return res.send({
            Response: {
                Success: '0',
                Message: 'Please provide your user ID.'
            }
        });
    }

    const checkUserQuery = 'SELECT * FROM users WHERE id = ?';
    db.query(checkUserQuery, [userId], (err, userResult) => {
        if (err) {
            return res.send({
                Response: {
                    Success: '0',
                    Message: `Execution error: ${err}`
                }
            });
        }

        if (userResult.length > 0) {
            const user = userResult[0]; // Current user data
            let updateQuery = `UPDATE users SET `;
            const fields = [];
            const values = [];

            if (image) {
                const imagePath = `uploads/${Date.now()}_${image.name}`;
                fields.push(`profile_image = ?`);
                values.push(imagePath);

                // Remove old image if it exists
                if (user.profile_image) {
                    const oldImagePath = user.profile_image; // Assuming `profile_image` contains the file path
                    fs.unlink(oldImagePath, (err) => {
                        if (err) {
                            console.error(`Failed to delete old image: ${err.message}`);
                        } else {
                            console.log(`Old image deleted: ${oldImagePath}`);
                        }
                    });
                }

                // Move the new image to the uploads folder
                image.mv(imagePath, async (err) => {
                    if (err) {
                        console.error('File upload error:', err);
                        return res.status(200).send({
                            Response: {
                                Success: '0',
                                Message: 'Failed to upload image. Please try again later.'
                            }
                        });
                    }
                });
            }

            if (firstName) {
                fields.push(`first_name = ?`);
                values.push(firstName);
            }
            if (lastName) {
                fields.push(`last_name = ?`);
                values.push(lastName);
            }
            if (email) {
                fields.push(`email = ?`);
                values.push(email);
            }
            if (password) {
                fields.push(`password = ?`);
                values.push(password);
            }
            if (street) {
                fields.push(`street = ?`);
                values.push(street);
            }
            if (area) {
                fields.push(`area = ?`);
                values.push(area);
            }
            if (city) {
                fields.push(`city = ?`);
                values.push(city);
            }
            if (state) {
                fields.push(`state = ?`);
                values.push(state);
            }
            if (country) {
                fields.push(`country = ?`);
                values.push(country);
            }
            if (age) {
                fields.push(`age = ?`);
                values.push(age);
            }
            if (dob) {
                fields.push(`dob = ?`);
                values.push(dob);
            }
            if (education) {
                fields.push(`education = ?`);
                values.push(education);
            }

            updateQuery += fields.join(', ');
            updateQuery += ` WHERE id = ?`;
            values.push(userId);

            db.query(updateQuery, values, (err, result) => {
                if (err) {
                    return res.send({
                        Response: {
                            Success: '0',
                            Message: `Execution error: ${err}`
                        }
                    });
                }

                return res.send({
                    Response: {
                        Success: '1',
                        Message: 'Your profile has been updated successfully.',
                        Data: {
                            userId,
                            firstName,
                            lastName,
                            email,
                            street,
                            area,
                            city,
                            state,
                            country,
                            age,
                            dob,
                            education,
                        }
                    }
                });
            });
        } else {
            return res.send({
                Response: {
                    Success: '0',
                    Message: 'User not found.'
                }
            });
        }
    });
});


//==================================================Add a course

app.post('/addcourses', (req, res) => {
    const { userid, title, description, price, whatYouWillLearn, requirements, content } = req.body;

    if (!userid) {
        return res.status(200).send({
            Response: {
                Success: '0',
                Message: 'User ID is required.',
            }

        });
    }

    // Verify the user ID
    const verifyUserQuery = `SELECT * FROM users WHERE roleType = '2' and id = ?`;
    db.query(verifyUserQuery, [userid], (err, result) => {
        if (err) {
            console.error('Error verifying user:', err);
            return res.status(200).send({
                Response: {
                    Success: '0',
                    Message: 'Failed to verify user.',
                }

            });
        }

        if (result.length === 0) {
            return res.status(200).send({
                Response: {
                    Success: '0',
                    Message: 'Invalid user ID.',
                }
            });
        }

        // Initialize arrays to store file paths
        let bannerImagePaths = [];
        let videoPaths = [];

        // Process banner images
        for (let i = 0; req.files[`bannerImage_${i}`]; i++) {
            const bannerImage = req.files[`bannerImage_${i}`];
            const bannerImagePath = `uploads/${Date.now()}_${bannerImage.name}`;
            bannerImage.mv(bannerImagePath, (err) => {
                if (err) {
                    console.error('Banner file upload error:', err);
                    return res.status(200).send({
                        Response: {
                            Success: '0',
                            Message: 'Failed to upload banner image.',
                        }

                    });
                }
            });
            bannerImagePaths.push(bannerImagePath);
        }

        // Process video files
        for (let i = 0; req.files[`video_${i}`]; i++) {
            const video = req.files[`video_${i}`];
            const videoPath = `uploads/${Date.now()}_${video.name}`;
            video.mv(videoPath, (err) => {
                if (err) {
                    console.error('Video file upload error:', err);
                    return res.status(200).send({
                        Response: {
                            Success: '0',
                            Message: 'Failed to upload video.',
                        }

                    });
                }
            });
            videoPaths.push(videoPath);
        }

        // Validate required fields
        if (!title || !description || !price || !whatYouWillLearn || !requirements || !content) {
            return res.status(200).send({
                Response: {
                    Success: '0',
                    Message: 'All fields are required except the banner image and video.',
                }

            });
        }


        // Ensure that content is a valid JSON array or object
        let contentJSON = null;
        try {
            contentJSON = typeof content === 'string' ? JSON.parse(content) : content;

            // Add banner and video paths to the content array
            contentJSON.forEach((item, index) => {
                if (bannerImagePaths[index]) {
                    item.bannerImage = bannerImagePaths[index];
                }
                if (videoPaths[index]) {
                    item.video = videoPaths[index];
                }
            });

            contentJSON = JSON.stringify(contentJSON); // Store it as a JSON string
        } catch (err) {
            return res.status(200).send({
                Response: {
                    Success: '0',
                    Message: 'Invalid content data. It must be a valid JSON array or object.',
                }
            });
        }

        // SQL query to insert the course data
        const query = `
            INSERT INTO course (user_id, title, description, price, what_you_will_learn, requirements, content, status, admin_status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            userid,
            title,
            description,
            price,
            whatYouWillLearn,
            requirements,
            contentJSON, // Store content as JSON string
            2, // Set status to 2 for all courses
            userid === 'admin' ? 1 : 0, // Admin status
        ];

        // Execute the SQL query
        db.query(query, values, (err, result) => {
            if (err) {
                console.error('Error inserting course:', err);
                return res.status(200).send({
                    Response: {
                        Success: '0',
                        Message: 'Failed to add course.',
                    }

                });
            }

            // Send success response
            res.status(200).send({
                Response: {
                    Success: '1',
                    Message: 'Course added successfully.',
                    Result: result.insertId,
                }
            });
        });
    });
});





//==============================================checksubscription
app.post('/subscriptionUpdate', (req, res) => {
    const { userid, payment_reference, courseId } = req.body;

    // Validate that the user ID, course ID, and payment reference are provided
    if (!userid || !courseId || !payment_reference) {
        return res.status(200).send({
            Response: {
                Success: '0',
                Message: 'User ID, course ID, and payment reference are required.',
            }

        });
    }

    const pushData = {
        id: userid,
        orderId: payment_reference  
    };

    const checkQuery = 'SELECT * FROM users WHERE id = ?';
    const courseQuery = 'SELECT * FROM course WHERE status = ? AND course_id = ?';
    const updateQuery = 'UPDATE course SET subscriber_list = ? WHERE course_id = ?';

    // Check if user exists
    db.query(checkQuery, [userid], (error, userResult) => {
        if (error) {
            console.error('Error checking user:', error);
            return res.status(200).send({
                Response: {
                    Success: '0',
                    Message: 'Failed to check user.',
                }
            });
        }

        if (userResult.length === 0) {
            return res.status(200).send({
                Response: {
                    Success: '0',
                    Message: 'User not found.',
                }

            });
        }

        // Check if course exists and is valid
        db.query(courseQuery, ['1', courseId], (error, courseResult) => {
            if (error) {
                console.error('Error checking course:', error);
                return res.status(200).send({
                    Response: {
                        success: '0',
                        Message: 'Failed to check course.',
                    }

                });
            }

            if (courseResult.length === 0) {
                return res.status(200).send({
                    Response: {
                        success: '0',
                        Message: 'Course not found or invalid.',
                    }

                });
            }

            // Get current subscriber list and check if the user is already subscribed
            const currentSubscribers = JSON.parse(courseResult[0].subscriber_list || '[]');

            // Check if the userId already exists in the subscriber list
            const userAlreadySubscribed = currentSubscribers.some(subscriber => subscriber.id === String(userid));

            if (userAlreadySubscribed) {
                return res.status(200).send({
                    Response: {
                        success: '0',
                        Message: 'User is already subscribed to this course.',
                    }

                });
            }

            // If the user is not already subscribed, add the new subscription
            const updatedSubscriberList = [
                ...currentSubscribers,
                pushData
            ];

            // Update the course with the new subscriber list
            db.query(updateQuery, [JSON.stringify(updatedSubscriberList), courseId], (error, updateResult) => {
                if (error) {
                    console.error('Error updating course:', error);
                    return res.status(200).send({
                        Response: {
                            success: '0',
                            Message: 'Failed to update course.',
                        }

                    });
                }

                return res.status(200).send({
                    Response: {
                        success: '1',
                        Message: 'Course subscription updated successfully.',
                    }

                });
            });
        });
    });
});




//==========================================rating API POST endpoint to add a review

app.post('/course_review', (req, res) => {
    const { courseId, userId, ratings, review } = req.body;

    // Validate input fields
    if (!courseId || !userId || !ratings || !review) {
        return res.status(200).send({
            Response: {
                success: 0,
                Message: 'All fields are required.'
            }

        });
    }

    if (ratings < 1 || ratings > 5) {
        return res.status(200).send({
            Response: {
                success: 0,
                Message: 'Ratings must be between 1 and 5.'
            }

        });
    }

    // Check if the user exists
    const checkQuery = 'SELECT * FROM users WHERE id = ?';
    db.query(checkQuery, [userId], (err, userResult) => {
        if (err) {
            console.error('Error checking user:', err);
            return res.status(200).send({
                Response: {
                    success: 0,
                    message: 'Failed to check user.'
                }

            });
        }

        if (userResult.length === 0) {
            return res.status(200).send({
                Response: {
                    success: 0,
                    message: 'User not found.',
                }

            });
        }

        // Fetch course reviews
        const selectQuery = 'SELECT review FROM course WHERE course_id = ?';
        db.query(selectQuery, [courseId], (err, courseResult) => {
            if (err) {
                console.error('Error fetching course:', err);
                return res.status(200).send({
                    Response: {
                        success: 0,
                        message: 'Failed to fetch course.'
                    }

                });
            }

            if (courseResult.length === 0) {
                return res.status(200).send({
                    Response: {
                        success: 0,
                        message: 'Course not found.',
                    }

                });
            }

            // Safely handle empty or NULL reviews
            let existingReviews = [];
            if (courseResult[0].review) {
                try {
                    existingReviews = JSON.parse(courseResult[0].review);
                } catch (parseError) {
                    console.error('Error parsing reviews:', parseError);
                    return res.status(200).send({
                        Response: {
                            success: 0,
                            message: 'Failed to parse existing reviews.'
                        }

                    });
                }
            }

            // Add the new review
            existingReviews.push({ user_id: userId, ratings, review });

            // Update the database
            const updateQuery = 'UPDATE course SET review = ? WHERE course_id = ?';
            db.query(updateQuery, [JSON.stringify(existingReviews), courseId], (err) => {
                if (err) {
                    console.error('Error updating reviews:', err);
                    return res.status(200).send({
                        Response: {
                            success: 0,
                            message: 'Failed to update reviews.'
                        }

                    });
                }

                res.status(200).send({
                    Response: {
                        success: 1,
                        Message: 'Review added successfully.',
                        Result: existingReviews,
                    }

                });
            });
        });
    });
});



//======================================courses get


app.get('/coursGet', (req, res) => {
    const userId = req.query.userId;

    // Define the base query
    let query = "SELECT * FROM course WHERE 1 = 1";
    const queryParams = [];

    if (userId) {
        // If userId is provided, fetch all courses for that user
        query += " AND user_id = ?";
        queryParams.push(userId);
    } else {
        // If userId is not provided, fetch only courses with status = 1
        query += " AND status = 1";
    }

    db.query(query, queryParams, (err, results) => {
        if (err) {
            console.error("Error fetching courses:", err);
            return res.status(200).send({
                Response: {
                    Success: '0',
                    Message: "Failed to fetch courses."
                }

            });
        }

        if (results.length === 0) {
            return res.status(200).send({
                Response: {
                    Success: '0',
                    Message: userId ? "No courses found for this user." : "No active courses found."
                }

            });
        }

        return res.status(200).send({
            Response: {
                Success: '1',
                Message: userId ? "Courses retrieved successfully." : "Active courses retrieved successfully.",
                Result: results
            }
        });
    });
});



//==================================

app.get('/subscribeGet', (req, res) => {
    const { userId } = req.query; // Extract userId from the query string

    // If userId is not provided, return an error
    if (!userId) {
        return res.status(200).send({
            Response: {
                Success: '0',
                Message: "User ID is required."
            }
        });
    }




    const checkQuery = `select * from users where id = ${userId}`


    db.query(checkQuery, (err, results) => {
        if (err) {
            console.error("Error fetching subscribed courses:", err);
            return res.status(200).send({
                Response: {
                    Success: '0',
                    Message: "Failed to fetch subscribed courses."
                }

            });
        }

        if (results.length > 0) {

            const userIdStr = String(userId);

            // Construct the query using JSON_CONTAINS
            let query = "SELECT * FROM course WHERE JSON_CONTAINS(subscriber_list, ?, '$') > 0";

            // Use JSON.stringify to create a query parameter with the userId as a string
            const queryParams = [JSON.stringify({ id: userIdStr })];

            // Execute the query
            db.query(query, queryParams, (err, results) => {
                if (err) {
                    console.error("Error fetching subscribed courses:", err);
                    return res.status(200).send({
                        Response: {
                            Success: '0',
                            Message: "Failed to fetch subscribed courses."
                        }

                    });
                }

                if (results.length === 0) {
                    return res.status(200).send({
                        Response: {
                            Success: '0',
                            Message: "No subscribed courses found for the provided criteria."
                        }

                    });
                }

                // Return the results if the user is found in the subscriber_list
                return res.status(200).send({
                    Response: {
                        Success: '1',
                        Message: "Subscribed courses retrieved successfully.",
                        Result: results
                    }

                });
            });

        } else {
            return res.status(200).send({
                Response: {
                    Success: '0',
                    Message: "User not found this id."
                }
            });
        }
    })
});






// app.get('/subscribeGet', (req, res) => {
//     const { userId } = req.query; // Extract userId from the query string

//     // Validate userId
//     if (!userId || typeof userId !== 'string' || userId.trim() === '') {
//         return res.status(200).send({
//             Response: {
//                 Success: '0',
//                 Message: "Invalid or missing User ID."
//             }
//         });
//     }

//     const userIdStr = userId.trim(); // Clean up userId input

//     // Step 1: Check if the userId exists in the database
//     const checkQuery = `SELECT * FROM users WHERE id = ?`;
//     const checkParams = [JSON.stringify({ id: userIdStr })];

//     db.query(checkQuery, checkParams, (err, checkResults) => {
//         if (err) {
//             console.error("Error checking User ID:", err);
//             return res.status(200).send({
//                 Response: {
//                     Success: '0',
//                     Message: "An error occurred while verifying User ID."
//                 }
//             });
//         }

//         if (checkResults.length === 0) {
//             // Alert if userId is not found
//             return res.status(200).send({
//                 Response: {
//                     Success: '0',
//                     Message: "Provided User ID does not match any records."
//                 }
//             });
//         }

//         // Step 2: Fetch subscribed courses for the valid userId
//         const query = `
//             SELECT * 
//             FROM course 
//             WHERE JSON_CONTAINS(subscriber_list, ?, '$') > 0
//         `;
//         const queryParams = checkParams; // Reuse the params

//         db.query(query, queryParams, (err, results) => {
//             if (err) {
//                 console.error("Error fetching subscribed courses:", err);
//                 return res.status(200).send({
//                     Response: {
//                         Success: '0',
//                         Message: "Failed to fetch subscribed courses."
//                     }
//                 });
//             }

//             if (results.length === 0) {
//                 return res.status(200).send({
//                     Response: {
//                         Success: '0',
//                         Message: "No subscribed courses found for the provided criteria."
//                     }
//                 });
//             }

//             // Return the subscribed courses
//             return res.status(200).send({
//                 Response: {
//                     Success: '1',
//                     Message: "Subscribed courses retrieved successfully.",
//                     Result: results
//                 }
//             });
//         });
//     });
// });












app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});