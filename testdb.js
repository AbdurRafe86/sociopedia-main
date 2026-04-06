const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://rafe86338_db_user:np348PVMUPPZAwrK@cluster0.ofangum.mongodb.net/mydb?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));