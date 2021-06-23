const app = require("./app");

// Configuration
require("dotenv").config();
const PORT = process.env.PORT || 3003;

// Listen
app.listen(PORT, () => console.log("Listening on port:", PORT));
