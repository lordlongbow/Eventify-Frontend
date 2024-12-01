var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const session = require('express-session');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var asistenteRouter = require('./routes/asistenteRouter');
var eventoRouter = require('./routes/eventoRouter');
var participacionRouter = require('./routes/participacionRouter');

var conrsOptions ={
  origin:'http://localhost:4200',
  credentials: true 
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//confiracion general 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//implementacion de cors
app.use(cors(conrsOptions));

//implementacion de sesiones
app.use(session({
  secret: 'Los eventos son lo mas ',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));


//imagenes
const EventoimagesPath = path.join(__dirname, 'public/images/eventoimages');
if (!fs.existsSync(EventoimagesPath)) {
  fs.mkdirSync(EventoimagesPath, { recursive: true }); // Crea el directorio si no existe
}
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(EventoimagesPath));

// Configurar Multer para almacenar imágenes temporalmente en memoria
const storage = multer.memoryStorage(); // Almacenar en memoria (sin guardar temporalmente en disco)
const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } }); // Límite de 5MB


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/asistentes', asistenteRouter);
app.use('/eventos', eventoRouter);
app.use('/participaciones', participacionRouter);
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
