const express = require('express');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer", session({secret:process.env.SESSION_SECRET || "fingerprint_customer",resave: false,saveUninitialized:false}))

app.use("/customer/auth/*", function auth(req,res,next){
  if (!req.session || !req.session.username) return res.status(401).json({message:'Please login first'});
  next();
});
 
const PORT = Number(process.env.PORT) || 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

if (require.main === module) app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));
module.exports = app;
