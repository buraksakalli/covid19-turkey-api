const routes = require("./src/app/routes");
const express = require("express"),
  app = express(),
  port = process.env.PORT || 3001;

routes(app);
app.listen(port);

console.log(`🚀 Server is running on http://localhost:${port}`);
