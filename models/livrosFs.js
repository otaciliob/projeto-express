const fs = require('fs').promises;

exports.list = async () => {
    try {
        const result = await fs.readFile('./livros.json', 'utf-8');
        let livros = JSON.parse(result);
        
        return livros;        
    } catch (error) {
        console.log(`${error} \n\n ${result}`)
        return null;
    }
};

exports.getElementById = async (id) => {
    try {
        const data = await fs.readFile('./livros.json', 'utf-8');
        const livros = JSON.parse(data);
        
        const liv = livros.find(l => l.id == id);

        return liv;        
    } catch (error) {
        console.log(error)
        return null;
    }
};

exports.getElementByAutor = async (nomeAutor) => {
    try {
        const data = await fs.readFile('./livros.json', 'utf-8');
        const livros = JSON.parse(data);
        
        const liv = livros.filter(l => l.autor == nomeAutor);
        
        return liv;        
    } catch (error) {
        console.log(error)
        return null;
    }
};

exports.new = async (liv) => {
    try {
        const data = await fs.readFile('./livros.json', 'utf-8');
        let livros = [];
        livros = JSON.parse(data);

        const livId = livros.length > 0 ? livros[livros.length - 1].id + 1 : 1;

        const newliv = {
            id: livId,
            titulo: liv.titulo,
            autor: liv.autor,
            ano: liv.ano,
            descricao: liv.descricao
        };

        livros.push(newliv);

        await fs.writeFile('./livros.json', JSON.stringify(livros));

        return newliv;        
    } catch (error) {
        return null;
    }
};

exports.update = async (id, newliv) => {
    try {
        const data = await fs.readFile('./livros.json', 'utf-8');
        const livros = JSON.parse(data);

        const index = livros.findIndex(liv => liv.id == id);

        if (index === -1) {
            return null;
        }

        livros[index] = { ...livros[index], ...newliv };

        await fs.writeFile('./livros.json', JSON.stringify(livros));

        return livros[index];
    } catch (error) {
        console.error("Erro ao atualizar liv:", error);
        return null;
    }
};

exports.delete = async (id) => {
    try {
        const data = await fs.readFile('./livros.json', 'utf-8');
        const livros = JSON.parse(data);

        const index = livros.findIndex(liv => liv.id == id);

        if(index === -1){
            return null;
        }


        const deletedliv = livros.splice(index, 1)[0];
        
        await fs.writeFile('./livros.json', JSON.stringify(livros));

        return deletedliv;
    } catch (error) {
        console.error("Erro ao excluir liv:", error);
        return false;
    }
};