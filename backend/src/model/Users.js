let ids = 0;
let users = [];

module.exports = {
    new(name,password) {
        let user = {id: ++ids, name: name, password: password,};
        users.push(user);
        return user;
    },
    update (id, name, password) {
        let pos = this.getPositionById(id)
        if (pos >= 0) {
            users[pos].name = name;
            users[pos].password = password;
            return users[pos];
        }
        return null;
    },
    list() {
        return users;
    },
    getElementById(id) {
        let pos = this.getPositionById(id)
        if (pos >= 0) {
            return users[pos];
        }
        return null;
    },
    getPositionById(id) {
        for (let i = 0; i<users.length; i++) {
            if (users[i].id == id) {
                return i;
            }
        }
        return -1;
    },
    getIdByName(name) {
        for (let i = 0; i<users.length; i++) {
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
    }
}