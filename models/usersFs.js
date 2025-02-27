const fs = require('fs').promises;

exports.list = async () => {
    try {
        const result = await fs.readFile('./users.json', 'utf-8');
        let users = JSON.parse(result);
        
        // cria uma nova lista de usuários sem a chave 'senha'
        const usersWithoutsenha = users.map(({ senha, ...user }) => user);
        
        return usersWithoutsenha;        
    } catch (error) {
        console.log(`${error} \n\n ${result}`)
        return null;
    }
};

exports.getElementById = async (id) => {
    try {
        const data = await fs.readFile('./users.json', 'utf-8');
        const users = JSON.parse(data);
        
        const user = users.find(u => u.id == id);

        // retorna o usuário sem a senha
        return { id: user.id, nome: user.nome, admin: user.admin };        
    } catch (error) {
        console.log(error)
        return null;
    }
};

exports.login = async (nome, senha) => {
    try {
        const data = await fs.readFile('./users.json', 'utf-8');
        const users = JSON.parse(data);
        
        const user = users.find(u => u.nome === nome);

        if (!user || user.senha !== senha) {
            return null;
        }

        return user
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        return null;
    }
}

exports.new = async (user) => {
    try {
        const data = await fs.readFile('./users.json', 'utf-8');
        let users = [];
        users = JSON.parse(data);
    
        const userId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

        const newUser = {
             id: userId,
             nome: user.nome,
             senha: user.senha,
             admin: user.admin 
        };

        users.push(newUser);

        await fs.writeFile('./users.json', JSON.stringify(users));

        return newUser;        
    } catch (error) {
        return null;
    }
};

exports.update = async (id, updatedUser) => {
    try {
        const data = await fs.readFile('./users.json', 'utf-8');
        const users = JSON.parse(data);

        const index = users.findIndex(user => user.id == id);

        if (index === -1) {
            return null;
        }

        users[index] = { ...users[index], ...updatedUser };

        await fs.writeFile('./users.json', JSON.stringify(users));

        return users[index];
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        return null;
    }
};

exports.delete = async (id) => {
    try {
        const data = await fs.readFile('./users.json', 'utf-8');
        const users = JSON.parse(data);

        const index = users.findIndex(user => user.id == id);

        if(index === -1){
            return null;
        }

        const deletedUser = users.splice(index, 1)[0];
        
        await fs.writeFile('./users.json', JSON.stringify(users));

        return deletedUser;
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        return false;
    }
};