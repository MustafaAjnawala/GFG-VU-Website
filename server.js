const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const sanitizeHtml = require('sanitize-html');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

//setting thte view engine to render dynamic html files
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static('views')); // Serve static HTML files from the 'views' directory

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));

const pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    password: 'Sql$123%',
    database: 'gfg_vu'
});

app.get('/',(req,res)=>{
  pool.query('select * from upcoming_events',(error,upcomingResults)=>{
    if(error){
      console.error('Error fetching upcoming events :',error);
      return res.status(500).send('Internal Server Error');
    }
    pool.query('Select * from past_events',(error,pastResults)=>{
      if(error){
        console.error('Error fetching past events :',error);
        return res.status(500).send('Internal Server Error');
      }
      res.render('index',{upcomingEvents: upcomingResults,pastEvents:pastResults});
    });
  });
});

app.post('/login', (req, res) => {
    let { username, password } = req.body;

    // Sanitizing both parameters from harmful HTML tags
    username = sanitizeHtml(username);
    password = sanitizeHtml(password);

    pool.query('SELECT * FROM login WHERE username = ?', [username], (error, results) => {
        if (error) {
            console.error('Error:', error);
            //500 error status is for internal server error
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length > 0) {
                const userData = results[0];
                if (password === userData.password) {
                    // Login successful
                    const { username, name } = userData;
                    return res.redirect('/panel');
                } else {
                  return res.status(401).send('Invalid username or password');
                }
            } else {
                return res.send(`<script>alert('Invalid username or password... :(');window.location.href = '/';</script>`);
            }
        }
    });
});

app.get('/panel', (req, res) => {
  pool.query('SELECT * FROM upcoming_events', (error, upcomingEvents) => {
    if (error) {
      console.error('Error fetching events:', error);
      return res.status(500).send('Internal Server Error');
    }
    pool.query('SELECT * FROM past_events', (error, pastEvents) => {
      if (error) {
        console.error('Error fetching past events:', error);
        return res.status(500).send('Internal Server Error');
      }
      res.render('panel', { upcomingEvents: upcomingEvents, pastEvents: pastEvents });
    });
  });
});

  //post request to add a new event into the list
  app.post('/add-event',upload.single('eventImage'),(req, res) => {
    const { eventName, eventDesc, eventDate, eventTime, eventReg } = req.body;
    const eventImage = req.file ? req.file.buffer : null;

    const sanitizedEventName = sanitizeHtml(eventName);
    const sanitizedEventDesc = sanitizeHtml(eventDesc);
    const sanitizedEventDate = sanitizeHtml(eventDate);
    const sanitizedEventTime = sanitizeHtml(eventTime);
    const sanitizedEventReg = sanitizeHtml(eventReg);
  
    pool.query(
     'INSERT INTO upcoming_events (eventName, eventDesc, eventDate, eventTime, eventReg, eventImage) VALUES (?, ?, ?, ?, ?, ?)',
    [sanitizedEventName, sanitizedEventDesc, sanitizedEventDate, sanitizedEventTime, sanitizedEventReg, eventImage],
      (error, results) => {
        if (error) {
          console.error('Error adding event:', error);
          return res.status(500).send('Internal Server Error');
        }
        res.redirect('/panel');
      }
    );
  });

  //to delete the respective upcoming event and details
  app.post('/delete-event', (req, res) => {
    const { eventID } = req.body;
  
    pool.query('DELETE FROM upcoming_events WHERE eventID = ?', [eventID], (error, results) => {
      if (error) {
        console.error('Error deleting event:', error);
        return res.status(500).send('Internal Server Error');
      }
      res.redirect('/panel');
    });
  });

  //post req to add an image to the past event list
  app.post('/add-past-event',upload.single('eventImage'),(req, res) => {
    const eventImage = req.file ? req.file.buffer : null;

    pool.query(
     'INSERT INTO past_events (PastEventImage) VALUES (?)',
    [eventImage],
      (error, results) => {
        if (error) {
          console.error('Error adding event:', error);
          return res.status(500).send('Internal Server Error');
        }
        res.redirect('/panel');
      }
    );
  });

    //to delete the respective past event image
    app.post('/delete-past-event', (req, res) => {
      const { eventID } = req.body;
    
      pool.query('DELETE FROM past_events WHERE PastEventID = ?', [eventID], (error, results) => {
        if (error) {
          console.error('Error deleting event:', error);
          return res.status(500).send('Internal Server Error');
        }
        res.redirect('/panel');
      });
    });

app.post('/logout',(req,res)=>{
  res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server is up annd running on http://localhost:${port}`);
});