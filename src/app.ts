import connect from "./database/connect";
import app from "./config";
import dotenv from "dotenv"

dotenv.config()
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000

connect()
    .then(() => {
        app.listen(port, () => {
            console.table({
                PORT: port,
                STATUS: "Working"
            })
        })
    })