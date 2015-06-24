require("babel/register");

var app = require('./server');

var PORT = process.env.PORT || 8000;

// Initialize the server
app.listen(PORT, function() {
  console.log('Server listening on port', PORT);
});
