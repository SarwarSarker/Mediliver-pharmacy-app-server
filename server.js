const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const app = express();
const cors = require("cors");
const { errorHandler } = require("./middleware/errormiddleware");

app.use(cors());
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;

connectDB();

app.use("/api/users", require("./routes/userRoute"));
app.use("/api/products", require("./routes/productRoute"));

app.use(errorHandler);

app.get("/api", (req, res) => {
  res.send("Successfull response");
});

app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});
