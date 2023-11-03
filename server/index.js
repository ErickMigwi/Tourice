//Middleware
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const port = 3500
const path = require("path");
const bcrypt = require("bcrypt");
const winston = require('winston')
const { log } = require('console')
//Configurations
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Erick4472#',
    database:'tourice'
})

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(session({
    key:"userId",
    secret:"I'll change this secret key",
    resave:false,
    saveUninitialized:false,
    cookie:{
       expires:60*60*60*60*24
    }  
}))
app.use(cookieParser());
const storage = multer.diskStorage({
    destination:function (req, file, cb){
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname))
    },
})
const upload = multer({storage})
const Upload = multer({storage})
app.use("/uploads", express.static("./uploads"));
const logger = winston.createLogger({
    level:'error',
    format:winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),  
         winston.format.json()
       
     ),
     transports:[
         new winston.transports.File({filename:'error.log', level:'error'})
     ]
})
//Routes
app.post('/signup', upload.single('image'), (req, res)=>{
    const data = req.body
    const imagename = req.file.filename
    console.log(data);
    db.query(
        "SELECT email FROM users WHERE email = ?",
        [data.email],
        (Error, result) => {
          if (Error) {
         logger.log({
            level:'error',
            message:Error,
            route:'/signup, preventing double reg'
         })
          } else {
            if (result.length > 0) {
              res.send({ msg: "email already registered, please try loging in👇🏽" });
            } else {
              db.query(
                "SELECT * FROM users WHERE username = ?",
                [data.username],
                (Error, Response) => {
                  if (Error) {
                   logger.log({
                    level:'error',
                    message:Error,
                    route:'/singup, preventing similar usernames'
                   })
                  } else if (Response.length > 0) {
                    res.send({ msg: "Username exists, choose another username" });
                  } else {
                    bcrypt.hash(data.password, 10, (error, hash) => {
                      if (error) {
                      logger.log({
                        level:'error',
                        message:error,
                        route:'/signup, hashing password'
                      })
                      } else {
                        db.query(
                          `INSERT INTO users (email, password, firstname, lastname, profileimage, country, city,  username) VALUES(?,?,?,?,?,?,?,?)`,
                          [
                            data.email,
                            hash,
                            data.firstname,
                            data.lastname,
                             imagename,
                            data.country,
                            data.city,
                            data.username,
                          ],
                          (err, response) => {
                            if (err) {
                             logger.log({
                                level:"error",
                                message:err,route:'/signup, creating a new user'
                             });
                            } else {
                              res
                                .status(200)
                                .send({
                                
                                  msg: "Created account successfully",
                                });
                            }
                          }
                        );
                      }
                    });
                  }
                }
              );
            }
          }
        }
      );
})
app.post('/login', (req, res)=>{
    const data= req.body
    db.query("SELECT * FROM users WHERE email = ?", [data.email], (err, response) => {
        if (err) {
          logger.log({
            level:'error',
            message:err,
            route:'/login, creating a sessions'
          })
        } else {
          if (response.length > 0) {
            bcrypt.compare(data.password, response[0].password, (error, result) => {
              if (result) {
                req.session.user = response;
                console.log(req.session.user);
                res.send({ ...result, msg: "successfull logIn" });
              } else {
                res.send({ msg: "Wrong Passsword. Kindly check your password" });
              }
            });
          } else {
            res.send({ msg: "user doesn't exist, Kindly create an account" });
          }
        }
      });
})
app.get("/login", (req, res) => {
    if (req.session.user) {
      const userId = req.session.user[0].idusers;
      db.query(
        `SELECT * FROM users WHERE idusers = ?`,
        [userId],
        (err, response) => {
          if (err) {
           logger.log({
            level:'/login',
            message:err,
            route:'/login, fetching session'
           })
          } else {
            res.send({ LoggedIn: true, user: { ...response } });
          }
        }
      );
    } else {
      res.send({ LoggedIn: false });
    }
  });
  app.post('/editprofile', upload.single('image'), (req, res) => {
    const data = req.body;
    console.log(data);
    const img = req.file.filename;
  
    db.query(
      'UPDATE users SET firstname = ?, lastname = ?, username = ?, country = ?, city = ?, email = ?, profileimage = ? WHERE idusers = ?',
      [data.firstname, data.lastname, data.username, data.country, data.city, data.email, img, data.iduser],
      (err, response) => {
        if (err) {
          logger.log({
            level: 'error',
            message: err,
            route: '/editprofile',
          });
          res.status(500).send({ error: 'Internal Server Error' });
        } else {
          res.send({ msg: 'Profile details updated successfully' });
        }
      }
    );
  });
  app.post('/postdest',upload.single('destmainimg'), (req, res)=>{
    const data = req.body
    const img = req.file.filename
    db.query('INSERT INTO destinations (destname, destlocation, destdescription, destrooms, desttransport, destmainimg, userId, price) VALUES (?,?,?,?,?,?,?,?)', [data.destname, data.destloc, data.destdesc, data.destrooms,data.desttrans, img, data.userId, data.price], (err, response)=>{
      if(err){
        logger.log({
          level:'error',
          message:err,
          route:'/postdest'
        })
      }else{
        res.send({msg:'destination posted'})
      }
    })
  })
  app.post("/addMultipleImages", Upload.array("images"), (req, res) => {
    const multipleImages = req.files.filename;
    const Id = req.body.iddest;
    let images = req.files.map((d) => {
      return d.filename;
    });
    const imagesString = images.join("/");
    db.query(
      "UPDATE destinations SET moreimages = ?  WHERE iddestinations = ?",
      [imagesString, Id],
      (err, resposne) => {
        if (err) {
          logger.log({
            level:'error',
            message:err,
            route:'/addMultipleImages'
          })
        } else {
          res.send({ ...resposne, msg: "successfull upload" });
        }
      }
    );
  });
  app.get("/getiddestinations", (req, res) => {
    const data = req.query
    
    db.query(
      "SELECT iddestinations FROM destinations WHERE UserId = ? && destrooms = ?  && destname= ? && destlocation = ?",
      [data.userId, data.rooms, data.name, data.loc],
      (err, response) => {
        if (err) {
          logger.log({
            level:'error',
            message:response,
            route:'/getiddestnations'
          })
        } else {
          res.send(response);
        }
      }
    );
  });
  app.get('/getDests', (req, res)=>{
    db.query('SELECT * FROM destinations', (err, response)=>{
      if(err){
        logger.log({
          level:'error',
          message:err,
          route:'/getDests'
        })
      }else{
        res.send(response)
      }
    })
  })
 app.listen(port, ()=>{
    console.log(`Running on port${port}`);
})