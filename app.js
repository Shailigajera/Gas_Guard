import express from 'express';
import bodyParser from 'body-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Get the directory name using Node.js's ES module-friendly methods
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like CSS and client-side JS)
app.use(express.static('public'));

// Set up EJS as the view engine
app.set('views', './views');
app.set('view engine', 'ejs');

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER, // Your Gmail address
    pass: process.env.PASSWORD // Your Gmail password
  }
});

// Routes
app.get('/', (req, res) => {
  res.render('threshold');
});

// POST route to update threshold and send email
app.post('/updateThreshold', (req, res) => {
  const threshold = req.body.threshold;

  // Send email
  const mailOptions = {
    from: '',
    to: '',
    subject: 'Gas Concentration Threshold Updated',
    text: `The gas concentration threshold has been updated to ${threshold} PPm.`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Failed to send email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent');
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
