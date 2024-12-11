const jwt = require('jsonwebtoken');
const pass = process.env.JWT_PASSWORD;

const validaAcesso = (req,res,next)=>{
    let beareartoken = req.headers['authorization']
    let token = ''
    if (beareartoken.startsWith("Bearer")) {
        token = beareartoken.split(' ')[1]
    }
    try {
        let payload = jwt.verify(token, "")
        req.user = payload
        return next()
    } catch {
        return res.status(403).json({msg: "Acesso negado!"})
    }
}
module.exports = { validaAcesso }