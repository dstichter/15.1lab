var express = require('express')
var app = express();
var mysql = require('mysql')
var bodyParser = require('body-parser')
var expressHandlebars = require('express-handlebars')
var PORT = 8000;
app.use(bodyParser.urlencoded({extended: false}));
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var connection = mysql.createConnection({
  host:'localhost',
  port:3306,
  user:'root',
  password:'',
  database:'lab'
});
app.get('/',function(req,res){
  res.render('register')
});
app.post('/register',function(req,res){
  var query = "SELECT * FROM users WHERE email=?"
  connection.query(query,[req.body.email],function(err,results){
    if(err) throw err;
    if(results.length > 0){
      res.redirect('/?msg=Exists')
    }else{
      query = 'INSERT INTO users (email,password) VALUES (?,?)'
      connection.query(query,[req.body.email,req.body.password],function(err,results){
        if(err) throw err;
        res.redirect('/');
      })
    }
  })
});
app.post('/login',function(req,res){
  var query = 'SELECT * FROM users WHERE email=? AND password=?'
  connection.query(query,[req.body.email,req.body.password],function(err,results){
    if(err) throw err;
    if(results.length > 0){
      res.redirect('/secret');
    }
    res.redirect('/?msg=Incorrect Login')
  })
});
app.get('/secret', function(req,res){
  res.send('Secret')
})

app.listen(PORT, function(){
  console.log('Listening on %s', PORT)
})
