import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";
import { buyerRouter } from "./buyer.routes";

dotenv.config();

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
  console.error(
    "No ATLAS_URI environment variable has been defined in config.env"
  );
  process.exit(1);
}

connectToDatabase(ATLAS_URI)
  .then(() => {
    const app = express();
    app.use(cors());
    app.use("/buyer", buyerRouter);
    // start the Express server
    app.listen(5000, () => {
      console.log(`Server running at http://localhost:5000...`);
    });
  })
  .catch((error) => console.error(error));