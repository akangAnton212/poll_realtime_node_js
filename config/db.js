const mongoose = require("mongoose");

//global promise
mongoose.Promise = global.Promise;
//koneksi mongo
mongoose.connect("mongodb://127.0.0.1:27017/pusherpoll")
.then(() => {
    console.log("mongo sukses koneksi")
}).catch(err => console.log(err));