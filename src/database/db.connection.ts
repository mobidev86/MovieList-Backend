import mongoose from "mongoose";

const host = process.env.DB_HOST || "localhost";
const port = process.env.DB_PORT || "";
const db_name = process.env.DB_NAME || "";

const db_uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rmeifcr.mongodb.net/${process.env.DB_NAME}`
// const db_uri = `mongodb://${host}:${port}/${db_name}`;
mongoose
    .connect(db_uri, {
        autoIndex: true,
        autoCreate: true,

    })
    .then(() => {
        console.log("connection to database : " + db_name);
    })
    .catch((error) => {
        console.log("Database not connected", { error });
    });
