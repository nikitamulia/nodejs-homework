
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import { errorHandler } from "./helpers/apiHelp.js";


import {contactsRouter} from './routes/api/contacts.js';
import { authRouter } from "./routes/api/authRoutes.js";


const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static("./src/public/"));

app.use('/api/contacts', contactsRouter)

app.use("/api/users", authRouter)


app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})


app.use(errorHandler);

export {app};

