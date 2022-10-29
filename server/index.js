import app from "./server.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 8081;


app.listen(port, () => console.log(`App is ready on port http://localhost:${port}`))