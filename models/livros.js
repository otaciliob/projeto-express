let ids = 0;
let biblioteca = [];

module.exports = {
    new(titulo, autor, ano, descricao) {
        let livro = { id: ids++, titulo: titulo, autor: autor, ano: ano, descricao: descricao };
        biblioteca.push(livro);
        return livro;
    },
    update(id, titulo, autor, ano, descricao) {
        let pos = this.getPositionById(id)
        if (pos >= 0) {
            biblioteca[pos].titulo = titulo;
            biblioteca[pos].autor = autor;
            biblioteca[pos].ano = ano;
            biblioteca[pos].descricao = descricao;
            return biblioteca[pos];
        }
        return null;
    },
    getElementById(id) {
        let pos = this.getPositionById(id)
        if (pos >= 0) {
            return biblioteca[pos];
        }
        return null;
    },
    getElementByAutor(autor) {
        let liv = [];
        for (i = 0; i < biblioteca.length; i++) {
            if (biblioteca[i].autor == autor) {
                liv.push(biblioteca[i]);
            }
        }
        return liv;
    },
    getPositionById(identificador) {
        let i = 0;

        for (i = 0; i < biblioteca.length; i++) {
            if (biblioteca[i].id == identificador) {
                return i;
            }
        }
        return -1;
    },
    delete(id) {
        let i = this.getPositionById(id);
        if (i >= 0) {
            biblioteca.splice(i, 1);
            return true;
        }
        return false;
    },
    list() {
        return biblioteca;
    }
}