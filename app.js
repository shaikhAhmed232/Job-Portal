require("custom-env").env(true);
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('./config/database'); 
// require('./config/redis');
const db = require("./models");
const csvToJson = require('./helper/csvToJson');

const indexRouter = require('./src');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);

// app.get('/api/add-all-perms', (req, res) => {
//   const routes = [];
//   app._router.stack.forEach((middleware) => {
//     if (middleware.handle.stack) {
//       middleware.handle.stack.forEach((handler) => {
//         handler.handle.stack.forEach((router) => {
//           console.log("Router", router.route);
//           const baseUrl = `/${middleware.regexp.toString().replace(/\\/g, '').match(/\/(\w+)\//)[1]}/${handler.regexp.toString().replace(/\\/g, '').match(/\/(\w+|\w+\-\w+)\//)[1]}`;
//           const { path } = router.route;
//           const method = Object.keys(router.route.methods)[0];
//           // let actionPhrase = method.toLowerCase() === "get" ? "get " : method.toLowerCase() === "post" ? "add" : method.toLowerCase() === 
//           let action = 
//           routes.push({
//             baseUrl,
//             path,
//             method,
//           });
//         });
//         if (handler.route) {
//           routes.push({
//             route: `${middleware.regexp}${handler.route.path}`,
//             method: handler.route.methods,
//           });
//         }
//       });
//     }
//   });
//   res.status(200).json(routes);
// });

app.get('/api/add-all-perms', async (req, res) => {
  let header = ["id", "action", "method", "baseUrl", "url", "createdAt", "updatedAt"];
  const data = csvToJson(path.join(process.cwd(), 'public/initials/job-portal-permissions'), header)
  console.log(data);
  const result = await db.permission.bulkCreate(data);
  res.status(200).json({success: true, error: null, data: result});
});

app.get('/api/add-role-perm', async (req, res) => {
  const header = ["id", "roleId", "permId", "createdAt", "updatedAt"];
  const data = csvToJson(path.join(process.cwd(), 'public/initials/job-portal-role-perm-mapping'), header);
  const result = await db.rolePermission.bulkCreate(data);
  res.status(200).json({success: true, data: result, error: null});
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    "message": err.message
  });
});

module.exports = app;
