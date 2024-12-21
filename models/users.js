let ids = 0;
let users = [];

module.exports = {
    new(nome, senha) {
        let user = { id: ids++, nome: nome, senha: senha, admin: false };
        users.push(user);
        return user;
    },
    new(nome, senha, admin) {
        let user = { id: ids++, nome: nome, senha: senha, admin: admin };
        users.push(user);
        return user;
    },
    update(id, nome, senha) {
        let pos = this.getPositionById(id)
        if (pos >= 0) {
            users[pos].nome = nome;
            users[pos].senha = senha;
            return users[pos];
        }
        return null;
    },
    getElementById(id) {
        let pos = this.getPositionById(id)
        if (pos >= 0) {
            return users[pos];
        }
        return null;
    },
    getPositionById(identificador) {
        let i = 0;
        if (identificador) {
            for (i = 0; i < users.length; i++) {
                if (users[i].id == identificador) {
                    return i;
                }
            }
        }
        return -1;
    },
    find(nome, senha) {//procura o usuario usando o nome e a senha, retorna o ID do usuario, se nao achar: -1
        for (let i = 0; i < users.length; i++) {
            if (users[i].nome == nome && users[i].senha == senha) {
                return users[i];
            }
        }
        return -1;
    },
    delete(id) {
        let i = this.getPositionById(id);
        if (i >= 0) {
            users.splice(i, 1);
            return true;
        }
        return false;
    },
    list() {
        return users;
    },
        /* isAdmin(id) {
        let i = this.getPositionById(id);
        if (i >= 0) {
            return users[i].admin;
        }
    }*/
}