import app from "./server.js";
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running! listening on port: ${port}`);
});
