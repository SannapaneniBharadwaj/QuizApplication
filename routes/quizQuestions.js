const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Returns Java Quiz json file
router.get('/data/java.json',  (req, res,next) => {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    //console.log(res);
    console.log(req.url);
    // Get the file using courseID
    res.sendFile(path.join(__dirname, req.url));
  });


  // Returns HTML Quiz json file
router.get('/data/html.json',  (req, res,next) => {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    //console.log(res);
    console.log(req.url);
    // Get the file using courseID
    res.sendFile(path.join(__dirname, req.url));
  });


  // Returns General Quiz json file
router.get('/data/general.json',  (req, res,next) => {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    //console.log(res);
    console.log(req.url);
    // Get the file using courseID
    res.sendFile(path.join(__dirname, req.url));
  });


  // Returns JavaScript json file
router.get('/data/javascript.json',  (req, res,next) => {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    //console.log(res);
    console.log(req.url);
    // Get the file using courseID
    res.sendFile(path.join(__dirname, req.url));
  });

  module.exports = router;
