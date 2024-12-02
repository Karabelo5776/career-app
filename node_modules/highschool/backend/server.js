import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import multer from 'multer'; 
import { promisify } from 'util';

const app = express();
app.use(cors());
app.use(bodyParser.json()); 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); 
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/; 
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype) {
      return cb(null, true);
    }
    cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
  }
});
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "901017181",
  database: "career_quidance",
  port: '3306'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Promisify the query function for async/await support
const query = promisify(db.query).bind(db);

// Middleware for error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Fetch users from the database
app.get('/users', async (req, res) => {
  try {
    const sql = "SELECT * FROM users";
    const data = await query(sql);
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Database error while fetching users." });
  }
});

// Fetch institutions from the database
app.get('/institutions', async (req, res) => {
  try {
    const sql = "SELECT * FROM institutions";
    const data = await query(sql);
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Database error while fetching institutions." });
  }
});

// User Registration
app.post('/register', upload.single('profilePicture'), async (req, res) => {
  const { name, email, password, user_type } = req.body;

  if (!name || !email || !password || !user_type || !req.file) {
    return res.status(400).json({ error: "Please provide name, email, password, user_type, and a profile picture." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = "INSERT INTO users (name, email, password, user_type, profile_picture) VALUES (?, ?, ?, ?, ?)";

  try {
    await query(sql, [name, email, hashedPassword, user_type, req.file.path]);
    return res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Database error during registration." });
  }
});

// User Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please provide both email and password." });
  }

  const sql = "SELECT * FROM users WHERE email = ?";

  try {
    const data = await query(sql, [email]);
    if (data.length > 0) {
      const user = data[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        return res.status(200).json({
          message: "Login successful",
          user: {
            id: user.id,
            user_type: user.user_type, 
            name: user.name,
            email: user.email,
            profile_picture: user.profile_picture 
          }
        });
      } else {
        return res.status(401).json({ error: "Invalid email or password." });
      }
    } else {
      return res.status(401).json({ error: "Invalid email or password." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Database query error." });
  }
});

// Add a new institution
app.post('/institutions', upload.single('logo'), async (req, res) => {
  const { name, number_of_students, number_of_departments, number_of_courses } = req.body;

  // Validation check
  if (!name || !number_of_students || !number_of_departments || !number_of_courses || !req.file) {
    return res.status(400).json({ error: "Please provide all required fields and a logo." });
  }

  const sql = "INSERT INTO institutions (name, number_of_students, number_of_departments, number_of_courses, logo) VALUES (?, ?, ?, ?, ?)";

  try {
    const result = await query(sql, [name, number_of_students, number_of_departments, number_of_courses, req.file.path]);

    if (result.affectedRows > 0) {
      return res.status(201).json({
        message: "Institution added successfully.",
        institution: {
          id: result.insertId,
          name: name,
          number_of_students: number_of_students,
          number_of_departments: number_of_departments,
          number_of_courses: number_of_courses,
          logo: req.file.path
        }
      });
    } else {
      return res.status(500).json({ error: "Failed to add institution." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Database error during adding institution." });
  }
});

// Fetch universities
app.get('/university', async (req, res) => {
  const sql = "SELECT id, name, number_of_students, number_of_departments, number_of_courses FROM institutions";
  try {
    const results = await query(sql);
    res.json(results);
  } catch (err) {
    console.error('Error fetching universities:', err);
    return res.status(500).json({ error: "Database error while fetching universities." });
  }
});

// Add a new faculty
app.post('/faculties', async (req, res) => {
  const { name, institution_id } = req.body; 

  if (!name || !institution_id) {
    return res.status(400).json({ error: "Please provide both name and institution." });
  }

  const sql = "INSERT INTO faculties (name, institution_id) VALUES (?, ?)";

  try {
    await query(sql, [name, institution_id]); 
    return res.status(201).json({ message: "Faculty added successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Database error during adding faculty." });
  }
});

// Add a new course
app.post('/courses', async (req, res) => {
  const { name, faculty, institution } = req.body;

  if (!name || !faculty || !institution) {
    return res.status(400).json({ error: "Please provide name, faculty, and institution." });
  }

  const sql = "INSERT INTO courses (name, faculty_id, institution_id) VALUES (?, ?, ?)";

  try {
    await query(sql, [name, faculty, institution]);
    return res.status(201).json({ message: "Course added successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Database error during adding course." });
  }
});

// Fetch courses from the database
app.get('/courses', async (req, res) => {
  try {
    const sql = `
      SELECT 
        c.id, 
        c.name, 
        i.name AS university, 
        'High School Diploma, Pass in relevant subjects' AS requirements
      FROM courses c
      JOIN institutions i ON c.institution_id = i.id;
    `;
    const data = await query(sql);
    return res.json(data);
  } catch (err) {
    console.error('Error fetching courses:', err);
    return res.status(500).json({ error: "Database error while fetching courses." });
  }
});

// Fetch faculties from the database
app.get('/faculties', async (req, res) => {
  const sql = "SELECT id, name, institution_id FROM faculties";
  try {
    const results = await query(sql);
    res.json(results);
  } catch (err) {
    console.error('Error fetching faculties:', err);
    return res.status(500).json({ error: "Database error while fetching faculties." });
  }
});

// Delete an institution
app.delete('/institutions/:id', async (req, res) => {
  const institutionId = req.params.id;

  const sql = "DELETE FROM institutions WHERE id = ?";

  try {
    const result = await query(sql, [institutionId]);
    if (result.affectedRows > 0) {
      return res.status(200).json({ message: "Institution deleted successfully." });
    } else {
      return res.status(404).json({ error: "Institution not found." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Database error during deleting institution." });
  }
});

// Making applications
// Modified Backend Code
app.post('/applications', async (req, res) => {
  console.log("Received data:", req.body);
  const testData = [
    "John Doe", "123456789", "ST001", "University X", "Course Y",
    "Faculty Z", "Science", "Math", "A", "English", "B", "", "", "", "",
    "", "", "", "", "", ""
];
  const { 
      student_name: studentName, 
      phone_number: phoneNumber, 
      student_id, 
      university, 
      course_id, 
      faculty, 
      major_subject: majorSubject, 
      grades 
  } = req.body;

  if (!studentName || !phoneNumber || !student_id || !university || !course_id || !faculty || !majorSubject || !grades) {
      return res.status(400).json({ error: "All fields are required." });
  }

  const subjects = new Array(8).fill('');
  const gradesValues = new Array(8).fill('');
  grades.forEach((grade, index) => {
      subjects[index] = grade.subject || '';
      gradesValues[index] = grade.grade || '';
  });

  const sqlQuery = `
      INSERT INTO applications (
          student_name, 
          phone_number, 
          student_id, 
          university, 
          course_id, 
          faculty, 
          major_subject, 
          subject1, grade1, 
          subject2, grade2, 
          subject3, grade3, 
          subject4, grade4, 
          subject5, grade5, 
          subject6, grade6, 
          subject7, grade7, 
          subject8, grade8
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
      studentName, 
      phoneNumber, 
      student_id, 
      university, 
      course_id, 
      faculty, 
      majorSubject,
      ...subjects,
      ...gradesValues
  ];

  try {
    const result = await query(testQuery, testData);
    res.status(201).json({ message: "Test insert successful", id: result.insertId });
  } catch (err) {
      console.error('Error submitting application:', err);
      res.status(500).json({ error: 'Database error during application submission.' });
  }
});


// 


// Update profile endpoint
app.put('/updateProfile/:id', upload.single('profilePicture'), async (req, res) => {
  const userId = req.params.id; // Get user ID from the URL
  const { name, email, phone } = req.body;

  // Ensure that all required fields are present
  if (!name || !email || !phone) {
    return res.status(400).json({ error: "Please provide name, email, and phone." });
  }

  let sqlQuery = "UPDATE users SET name = ?, email = ?, phone = ? ";
  let queryParams = [name, email, phone];

  // If the user uploads a new profile picture, update it in the database
  if (req.file) {
    sqlQuery += ", profile_picture = ?";
    queryParams.push(req.file.path);
  }

  sqlQuery += " WHERE id = ?";
  queryParams.push(userId);

  try {
    const result = await query(sqlQuery, queryParams);
    if (result.affectedRows > 0) {
      return res.status(200).json({ message: "Profile updated successfully." });
    } else {
      return res.status(404).json({ error: "User not found." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Database error while updating profile." });
  }
});

const port = 8081; // You can choose any available port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

