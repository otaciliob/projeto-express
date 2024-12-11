let ids = 0;
let users = [];

module.exports = {
    new(name, password) {
        let user = { id: ++ids, name: name, password: password, admin: false };
        users.push(user);
        return user;
    },
    new(name, password, admin) {
        let user = { id: ++ids, name: name, password: password, admin: admin };
        users.push(user);
        return user;
    },
    update(id, name, password) {
        let pos = this.getPositionById(id)
        if (pos >= 0) {
            users[pos].name = name;
            users[pos].password = password;
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
        if (users[identificador].id == identificador) {
            i == identificador;
            return i;
        } else {
            for (i = 0; i < users.length; i++) {
                if (users[i].id == identificador) {
                    return i;
                }
            }
        }
        return -1;
    },
    getIdByName(name) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].name == name) {
                return users[i].id;
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
    isAdmin(id){
        let i = this.getPositionById(id);
        if (i >= 0) {
            return users[i].admin;
        }
    }
}