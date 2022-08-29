const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const blogRoute = require("./routes/blog");

const port = 8000;

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

app.use("/blog", blogRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


