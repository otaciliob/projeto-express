const { body, validationResult } = require('express-validator');

const validarUser = [
    body('nome')
        .notEmpty().withMessage("Nome é Obrigatorio")
        .isLength({ min: 3, max: 50 }).withMessage("Nome deve ter entre 3 e 50 caracteres."),
    body('senha')
        .notEmpty().withMessage("Senha é obrigatorio"),
    body('admin')
        .default(false).isBoolean().withMessage('Admin deve ser um valor Booleano(True ou False)'),
    (req, res, next) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ error: result.array() })
        }
        next();
    }
]

const validarAutor = [
    body('nome')
        .notEmpty().withMessage('Nome do Autor é obrigatorio'),
    body('biografia')
        .default(""),
    (req, res, next) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ error: result.array() })
        }
        next();
    }
]

const validarLivro = [
    body('titulo')
        .isString().notEmpty().withMessage('Titulo é obrigatorio'),
    body('autor')
        .isString().notEmpty().withMessage('Nome do Autor é obrigatorio'),
    body('ano')
        .isNumeric().notEmpty().withMessage('Ano de publicacao é obrigatorio'),
    body('descricao')
        .default(""),
    (req, res, next) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ error: result.array() })
        }
        next();
    }
]

module.exports = { validarUser, validarAutor, validarLivro }