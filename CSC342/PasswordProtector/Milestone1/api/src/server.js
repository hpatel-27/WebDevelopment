const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Designate the public folder as serving static resources
app.use(express.urlencoded({extended: true}));

const APIRouter = require('./APIrouter');

app.get("/",(req,res)=>{res.send("Hello")});

app.use('/', APIRouter);

// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));