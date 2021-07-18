var createError = require('http-errors');
var express = require('express');
const parser = require("body-parser");
const cors = require('cors');
const helmet = require("helmet");
var app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server); 

const socket_jobs = require('./routes/sockets_server/sockets')(io);

const path = require("path");

const port = process.env.PORT || 8081

server.listen(port, () => {
  console.log(`Server is listening on port : ${port}`);
});

//app.use(express.static(path.join(__dirname,"public")));

// using plugins
app.use(helmet());
app.use(cors());


// parse application/x-www-form-urlencoded
app.use(parser.urlencoded({ extended: false }))
 
// parse application/json
app.use(parser.json())

// view engine setup

//importing routes
const index = require("./routes/index")
const users = require("./routes/users");





 app.use('/test', index);
 app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
