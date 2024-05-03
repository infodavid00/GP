const express = require("express");
require('dotenv').config();
const app = express();

require('./config/db');

const morgan = require('morgan');
app.use(morgan('dev'))


const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173',
  credentials:true,
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", require("./routes/users"));

// login middleware
const isAuthenticated = require('./middlewares/isAuthenticated');

// routes
app.use("/courses",isAuthenticated, require("./routes/courses"));
app.use("/chapters",isAuthenticated, require("./routes/chapters"));

app.get('/',(req,res)=>{
  res.json({"message":"API is Work"})
})

app.listen(process.env.PORT, () => {
    console.log(`API is listening on port ${process.env.PORT}`);
});

