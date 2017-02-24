var express = require('express');
var router = express.Router();
var app = express();
var useragent = require('express-useragent');
var accepts = require('accepts');

app.use( useragent.express() );

/* GET home page. */
router.get('/', function(req, res, next) {
  

  //var ip = req.ip;
  var source = req.headers['user-agent'];
  var languageHeaders = req.headers['accept-language'];
  var languageAccepts = accepts(req).languages();
  var language = languageAccepts[0];
  var jsonData = JSON.stringify( useragent.parse(source));
  var ua = useragent.parse(source);
  var os = ua.os;
  var ip = ua.geoIp;//won't exist until I put up on heroku
  var browser = ua.browser;
  var browserVersion = ua.version;
  
  
  console.log("ip address is: "+ ip );
  console.log("req.headers['user-agent'] is: " + source);
  console.log("req.useragent is: " + jsonData);
  console.log("os is: "+ os);
  console.log('languageHeaders is: '+ languageHeaders);
  console.log("languageAccepts from accepts is: " + languageAccepts);
  console.log('index[0] of languageAccepts is: ' + languageAccepts[0]);
  
/*  res.json( {
    "ipaddress": ip,
    "language": language,
    "software": os,
    "browser":browser,
    "browser version":browserVersion
  });*/


  res.render('index', { 
    useragent: jsonData,
    ip: ip,
    source: source,
    os: os,
    browser: browser,
    "browserVersion": browserVersion,
    language: language,
    languageAccepts: languageAccepts
   });
  
});

module.exports = router;
