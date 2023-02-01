import {app} from './src/app.js'
import { connectMongo } from "./src/services/connection.js";

const start = async () => {
  try {
    await connectMongo();
    app.listen(3000, (err) => {
      if (err) console.error("Error connecting to Mongo");
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (error) {
    console.log(error);
  }
};
start();