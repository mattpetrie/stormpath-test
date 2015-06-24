require("babel/register");

var app = require('./server');

var PORT = process.env.PORT || 8000;

app.listen(8000);
