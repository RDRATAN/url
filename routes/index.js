var express = require('express');
var fs=require('fs');
const data=require('./data');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ratan',output:'' });
});

router.post('/new',function(req,res){
  if(req.body.url_name && req.body.url_value)
  {
   
    if(!data[req.body.url_name]){
    data[req.body.url_name]=req.body;
    
    
    fs.writeFile('./routes/data.json', JSON.stringify(data),function(err){
      if(!err){
        fs.readFile('./routes/data.json', "utf8", (err, data) => {
          if (err) {
            res.render('index',{output:'Insufficent Data'});
          }
          var result_url = JSON.parse(data)[req.body.url_name]['url_name'];
          res.render('index',{output:'Your Final Url is',url: 'https://url-rkd.herokuapp.com/'+result_url});
        });
      }
      else{
        res.render('index',{output:'Insufficent Data'});
      }
     
    });
  }
  else{
    res.render('index',{output:'Your Please choose another Unique name for your URL'});
    
  }

  }
  else{
    res.render('index',{output:'Insufficent Data'});
  }
});

router.get("/:id", (req, res) => {
  fs.readFile('./routes/data.json', "utf8", (err, data) => {
    if (err) {
      res.render('index',{output:'Insufficent Data'});
    }
    else{
    res.redirect(JSON.parse(data)[req.params.id]['url_value']);}
  });
});

module.exports = router;
