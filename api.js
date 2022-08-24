const client = require('./connection.js')
const express = require('express');
const { application } = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

app.listen(3300, ()=>{
    console.log("Sever is now listening at port 3300");
})
//app.use(express.urlencoded({extended: true}));
//app.use(express.json()) // To parse the incoming requests with JSON payloadsnpm init -y

client.connect();


app.get('/users', (req, res)=>{
    client.query(`Select * from users`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/users/:id', (req, res)=>{
    client.query(`Select * from users where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})


app.get('/events', (req, res)=>{
    client.query(`Select * from events`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/events/:id', (req, res)=>{
    client.query(`Select * from events where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/rana', (req, res)=>{
    client.query(`Select * from rana`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/rana/:id', (req, res)=>{
    client.query(`Select * from rana where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})