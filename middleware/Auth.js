const jwt = require('jsonwebtoken');
const SENHA = process.env.JWT_PASSWORD;

let autorizado = (req, res, next) => {
    let beareartoken = req.headers['authorization']
    let token = '';
    if (beareartoken.startsWith("Bearer")) {
        token = beareartoken.split(' ')[1];
    }
    try {
        let payload = jwt.verify(token, SENHA);
        req.user = payload;
        return next();
    } catch {
        return res.status(403).json({msg: "Acesso negado!"});
    }
}
let isAdmin = (req, res, next) => {
    if (req.user.admin) {
        return next();
    } else {
        res.status(403).json({msg: "Esta rota eh exclusiva para admin"});
    }
}
module.exports = { autorizado, isAdmin }