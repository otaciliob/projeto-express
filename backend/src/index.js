const app = require("./app");

app.get('/',(req,res)=>res.status(200).send("Hello World!"));

app.listen(3000,()=> console.log("listen..."))