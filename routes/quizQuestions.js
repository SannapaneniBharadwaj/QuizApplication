const express = require('express');
const router = express.Router();


// Returns Quiz json file
router.get('/quizdata', (req, res, next) => {

    // Might have to change how we get the courseID
    const courseId = req.body.courseId;


    console.log(courseId);

    // Get the file using courseID
    res.sendFile(path.join(__dirname, courseId));
  });


//   app.get('/src/assets/data.json', (req, res) => {
//     console.log(res)
  
//     /* Insted of doing all this */
//     // res.writeHead(200, {
//     //    'Content-type': 'application/json'
//     // });
//     // res.end(JSON.stringify(data));
  
//     /* Just send the file */
//     res.sendFile(path.join(__dirname, '/src/assets', 'data.json'));
//   });