const express = require("express");
const cors = require("cors");
const weatherRoutes = require("./server/routes/weather");

require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use("/weather", weatherRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
