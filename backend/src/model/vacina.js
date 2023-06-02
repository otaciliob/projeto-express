let ids = 0;
let vac = [];

module.exports = {
    new(name) {
        let task = {id: ++ids, name: name};
        vac.push(task);
        return task;
    },
    update (id, name) {
        let pos = this.getPositionById(id)
        if (pos >= 0) {
            vac[pos].name = name;
            return vac[pos];
        }
        return null;
    },
    list() {
        return vac;
    },
    getElementById(id) {
        let pos = this.getPositionById(id)
        if (pos >= 0) {
            return vac[pos];
        }
        return null;
    },
    getPositionById(id) {
        for (let i = 0; i<vac.length; i++) {
            if (vac[i].id == id) {
                return i;
            }
        }
        return -1;
    },
    delete(id) {
        let i = this.getPositionById(id);
        if (i >= 0) {
            vac.splice(i, 1);
            return true;
        }
        return false; 
    }
}