const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const dotenv = require("dotenv");
dotenv.config();

//DB
mongoose.connect(process.env.MONGO_URI, 
    { useNewUrlParser: true,
        useUnifiedTopology: true })
.then(() => console.log("DB Connected!!!"));

mongoose.connection.on("error", err => {
    console.log(`DB Connection error: ${err.message}`);
});


//bring in routes
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

// middleWare

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use("/",postRoutes) ;
app.use("/",authRoutes);
app.use("/",userRoutes);

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({error: "Unautherized!!"});
    }
  });


const port = process.env.PORT || 8080;
app.listen(port,() => {
     console.log(`A Node Js API is Listening on port: ${port}`)});