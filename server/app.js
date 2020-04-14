const express = require("express");
const app = express();
const morgan = require("morgan");
const morganBody = require("morgan-body");
const mongoose = require("mongoose");
const cors = require('cors');

const customerRoutes = require("./api/routes/customers");
const blankRoutes = require("./api/routes/blanks");
const userRoutes = require("./api/routes/users");
const transactionRoutes = require("./api/routes/transactions");

mongoose.connect(
    process.env.MONGO_ATLAS_ADDR,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
  }
);
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
morganBody(app);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/customers", customerRoutes);
app.use("/blanks", blankRoutes);
app.use("/users", userRoutes);
app.use("/transactions", transactionRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;