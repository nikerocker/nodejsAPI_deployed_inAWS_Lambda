const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('testdb', sqlite3.OPEN_READWRITE,(err)=>{
    if(err){
        console.log(err);
    }
    console.log('connected to database')
})
app.use(express.static(__dirname + '/public'));

//get all user info
app.get('/users', function (req, res) {
    db.all('SELECT * FROM users',function(err,rows){
        res.json(rows);
    })

});

//insert the user info 
app.post('/users', function (req, res) {
    db.run("INSERT INTO users (username, password) VALUES('"+req.body.username+"', '"+req.body.password+"')",function(err){
        console.log(err);
        res.json({id:this.lastID});
    })

})

//get a single user info by id
app.get('/users/:id', function (req, res) {
    db.all('SELECT * FROM users WHERE id='+req.params.id,function(err,rows){
        res.json(rows);
    })
});


//udate the user info
app.put('/users/:id', function (req, res) {
    db.run("UPDATE users SET username='"+req.body.username+"',password='"+req.body.password+"' WHERE id="+req.params.id,function(err){
        console.log(err);
        res.json({id:this.lastID});
    })
})


//delte a user info
app.delete('/users/:id', function (req, res) {
    db.run("DELETE FROM users WHERE id="+req.params.id,function(err){
        console.log(err);
        res.json({id:this.lastID});
    })
})

app.listen(3001);
