const client = require('./connection.js')
const express = require('express');
const coors = require('cors');
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

app.get('/usr', (req, res)=>{
    client.query(`Select * from users where lastname=${req.query.lastname} and location=${req.query.location}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.post('/users', (req, res)=> {
    const user = req.body;
    let insertQuery = `insert into users(id, firstname, lastname, location) 
                       values(${user.id}, '${user.firstname}', '${user.lastname}', '${user.location}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.put('/users/:id', (req, res)=> {
    let user = req.body;
    let updateQuery = `update users
                       set firstname = '${user.firstname}',
                       lastname = '${user.lastname}',
                       location = '${user.location}'
                       where id = ${user.id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.delete('/users/:id', (req, res)=> {
    let insertQuery = `delete from users where id=${req.params.id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
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
    client.query(`Select id, "RA_OF_NA", "REGISTER", "FOLIO", "DATUM", "PLAATS", kaart_nr, "V_NAAM", "V_NAAM_2", "K_NAAM", "K_NAAM_2", "KAD_PLAATS", "KAD_A", "KAD_NR", "KAD_NR_2", "KAD_NR_3", "KAD_NR_4" from rana order by id limit 100`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/rana/:searchArg', (req, res)=>{
    client.query(`Select id, "RA_OF_NA", "REGISTER", "FOLIO", "DATUM", "PLAATS", kaart_nr, "V_NAAM", "V_NAAM_2", "K_NAAM", "K_NAAM_2", "KAD_PLAATS", "KAD_A", "KAD_NR", "KAD_NR_2", "KAD_NR_3", "KAD_NR_4" from rana where "K_NAAM" LIKE '%${req.params.searchArg}%' order by id limit 100`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/selrana', (req, res)=>{


    client.query(`Select id, "RA_OF_NA", "REGISTER", "FOLIO", "DATUM", "PLAATS", kaart_nr, "V_NAAM", "V_NAAM_2", "K_NAAM", "K_NAAM_2", "KAD_PLAATS", "KAD_A", "KAD_NR", "KAD_NR_2", "KAD_NR_3", "KAD_NR_4" 
      FROM rana 
      WHERE (LOWER("K_NAAM") lIKE LOWER('%${req.query.k_naam}%') OR LOWER("K_NAAM_2") lIKE LOWER('%${req.query.k_naam}%')) AND 
            (("KAD_PLAATS" LIKE '%${req.query.kad_plaats}%') OR ('${req.query.kad_plaats}' = '%' )) AND
            (("KAD_A" LIKE '%${req.query.kad_sectie}%') OR ('${req.query.kad_sectie}' = '%' ))  AND 
            (("KAD_NR" = '${req.query.kad_kavel}') OR ("KAD_NR_2" = '${req.query.kad_kavel}')  OR ("KAD_NR_3" = '${req.query.kad_kavel}') OR ("KAD_NR_4" = '${req.query.kad_kavel}') OR ("KAD_NR_5" = '${req.query.kad_kavel}') OR ('${req.query.kad_kavel}' = '%'))
      ORDER BY id
      LIMIT 100`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/rna/:id', (req, res)=>{
    client.query(`Select * from rana where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.post('/status', (req, res) => {
    res.send ({
        message: "Hello World!"
    }) 
  })
