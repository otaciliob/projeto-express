let ids = 0;
let autores = [];

module.exports = {
    new(nome, biografia) {
        let autor = { id: ids++, nome: nome, biografia: biografia };
        autores.push(autor);
        return autor;
    },
    update(id, nome, biografia) {
        let pos = this.getPositionById(id)
        if (pos >= 0) {
            autores[pos].nome = nome;
            autores[pos].biografia = biografia;
            return autores[pos];
        }
        return null;
    },
    getElementById(id) {
        let pos = this.getPositionById(id)
        if (pos >= 0) {
            return autores[pos];
        }
        return null;
    },
    getPositionById(identificador) {
        let i = 0;
        for (i = 0; i < autores.length; i++) {
            if (autores[i].id == identificador) {
                return i;
            }
        }
        return -1;
    },
    getElementByNome(nome) {
        let i = 0;
        for (i = 0; i < autores.length; i++) {
            if (autores[i].nome == nome) {
                return autores[i];
            }
        }
        return null;
    },
    delete(id) {
        let i = this.getPositionById(id);
        if (i >= 0) {
            autores.splice(i, 1);
            return true;
        }
        return false;
    },
    list() {
        return autores;
    }
}