const app = require("./app");

app.get('/',(req,res)=>res.status(200).send("Hello World!"));

app.get("/setcookie", (req, res) => {
    res.cookie("Bearer", "A1B2C3D4");
    res.send("Cookie criado com sucesso!");
  });
  app.get("/listcookie", (req, res) => {
    console.log(req.cookies);
    res.send(req.cookies.nome_cookie);
  });

app.listen(3000,()=> console.log("listen..."))