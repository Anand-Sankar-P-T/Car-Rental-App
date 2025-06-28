const express = require('express')
const cookieParser = require('cookie-parser');
     
const app = express()
app.use(express.json());
app.use(cookieParser());       
const router=require('./routes/index')
require('dotenv').config()
const port=3000
const mongoose = require('mongoose');
console.log(process.env.MONGODB_URL)

main()
    .then(()=>console.log("Connected Successfully"))
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}

console.log(port)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api',router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
