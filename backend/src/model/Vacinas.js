let ids = 0;
let vacinas = [];

module.exports = {
    new(nome,data,dose,proxima) {
        let vacina = {id: ++ids, nome: nome, data: data, dose: dose, proxima:proxima};
        vacinas.push(vacina);
        return vacina;
    },
    update (id, nome, data, dose, proxima) {
        let pos = this.getPositionById(id)
        if (pos >= 0) {
            vacinas[pos].nome = nome;
            vacinas[pos].data = data;
            vacinas[pos].dose = dose;
            vacinas[pos].proxima = proxima;
            return vacinas[pos];
        }
        return null;
    },
    list() {
        return vacinas;
    },
    getElementById(id) {
        let pos = this.getPositionById(id)
        if (pos >= 0) {
            return vacinas[pos];
        }
        return null;
    },
    getPositionById(id) {
        for (let i = 0; i<vacinas.length; i++) {
            if (vacinas[i].id == id) {
                return i;
            }
        }
        return -1;
    },
    delete(id) {
        let i = this.getPositionById(id);
        if (i >= 0) {
            vacinas.splice(i, 1);
            return true;
        }
        return false; 
    }
}