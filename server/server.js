var express = require('express');
var app = express();
app.use(express.static('../'));
app.get('/', function (req, res) {
   res.sendFile('index.html');
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("http://%s:%s", host, port)

})