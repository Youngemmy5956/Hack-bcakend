import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import connectDB from "./config/mongo.js";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import invoiceRouter from "./routes/invoice-routes.js";
import businessOwnerRouter from "./routes/businessOwner-routes.js";
import clientRouter from "./routes/client-routes.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"]
  }
});

// console.log(process.env)
// console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY);
// console.log('MONGODB_PASSWORD:', process.env.MONGODB_PASSWORD);


app.use(express.json());
app.use(cors());

// middlewares
app.use("/invoice", invoiceRouter);
app.use("/businessOwner", businessOwnerRouter);
app.use("/client", clientRouter);

io.on('connection', (socket) => {
  console.log('a user connected');
});

async function connect() {
  try {
    server.listen(6000, () => {
      connectDB(process.env.MONGODB_PASSWORD);
      console.log("server is running on  port 6000");
    });
  } catch (err) {
    console.log(err);
  }
}
connect();

  // On the client side, you would listen for the new events like this:

//   const socket = io('http://localhost:3000');
// socket.on('unpaidInvoice', (invoice) => {
//   console.log('Unpaid invoice received:', invoice);
// });

// const socket = io('http://localhost:3000');

// socket.on('unpaidInvoice', (invoice) => {
//   displayNotification('Unpaid invoice received:', invoice);
// });

// socket.on('invoicePaid', (invoice) => {
//   displayNotification('Invoice paid:', invoice);
// });

// function displayNotification(title, message) {
//   // Display a notification to the user
// }

// function handleError(error) {
//   // Display an error message to the user
// }

// const socket = io('http://localhost:3000');

// socket.on('unpaidInvoice', (invoice) => {
//   displayNotification('Unpaid invoice received:', invoice);
// });

// socket.on('invoicePaid', (invoice) => {
//   displayNotification('Invoice paid:', invoice);
// });

// function displayNotification(title, message) {
//   // Display a notification to the user
// }

// function handleError(error) {
//   // Display an error message to the user
//   // Retry the request if it failed due to a network error
//   if (error.message === 'Network Error') {
//     retryRequest(error.config);
//   }
// }

// function retryRequest(config) {
//   // Retry the request with the same config
// }