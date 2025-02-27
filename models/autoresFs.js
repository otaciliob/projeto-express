const fs = require('fs').promises;

exports.list = async () => {
    try {
        const result = await fs.readFile('./autores.json', 'utf-8');
        let autores = JSON.parse(result);
        
        return autores;        
    } catch (error) {
        console.log(`${error} \n\n ${result}`)
        return null;
    }
};

exports.getElementById = async (id) => {
    try {
        const data = await fs.readFile('./autores.json', 'utf-8');
        const autores = JSON.parse(data);

        const autor = autores.find(a => a.id == id);

        return autor;        
    } catch (error) {
        console.log(error)
        return null;
    }
};

exports.getElementByNome = async (nome) => {
    try {
        const data = await fs.readFile('./autores.json', 'utf-8');
        const autores = JSON.parse(data);

        const autor = autores.find(a => a.nome == nome);
        
        return autor;        
    } catch (error) {
        console.log(error)
        return null;
    }
};

exports.new = async (autor) => {
    try {
        const data = await fs.readFile('./autores.json', 'utf-8');
        let autores = [];
        autores = JSON.parse(data);

        const autorId = autores.length > 0 ? autores[autores.length - 1].id + 1 : 1;

        const newAutor = {
            id: autorId,
            nome: autor.nome,
            biografia: autor.biografia
        };

        autores.push(newAutor);

        await fs.writeFile('./autores.json', JSON.stringify(autores));

        return newAutor;        
    } catch (error) {
        return null;
    }
};

exports.update = async (id, newAutor) => {
    try {
        const data = await fs.readFile('./autores.json', 'utf-8');
        const autores = JSON.parse(data);

        const index = autores.findIndex(autor => autor.id == id);

        if (index === -1) {
            return null;
        }

        autores[index] = { ...autores[index], ...newAutor };

        await fs.writeFile('./autores.json', JSON.stringify(autores));

        return autores[index];
    } catch (error) {
        console.error("Erro ao atualizar Autor:", error);
        return null;
    }
};

exports.delete = async (id) => {
    try {
        const data = await fs.readFile('./autores.json', 'utf-8');
        const autores = JSON.parse(data);

        const index = autores.findIndex(autor => autor.id == id);

        if(index === -1){
            return null;
        }

        const deletedAutor = autores.splice(index, 1)[0];
        
        await fs.writeFile('./autores.json', JSON.stringify(autores));

        return deletedAutor;
    } catch (error) {
        console.error("Erro ao excluir autor:", error);
        return false;
    }
};