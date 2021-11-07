/*
*CREATE TABLE `municipios` (
*  `CodMun` int(11) NOT NULL,
*  `Municipio` varchar(50) DEFAULT NULL,
*  `Cabecera` varchar(50) NOT NULL,
*  `Longitud` int(11) NOT NULL,
*  `Latitud` int(11) NOT NULL
*) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
*/


export default class Municipio {
    constructor({CodMun, Municipio, Cabecera, Longitud, Latitud}) {
        this.CodMun = CodMun;
        this.Municipio = Municipio;
        this.Cabecera = Cabecera;
        this.Longitud = Longitud;
        this.Latitud = Latitud;
    }    
    validar() {
        var errores = [];

        if (this.Municipio == null || this.Municipio == "") {
            
            errores.push("Municipio es requerido");
        }
        if (this.Cabecera == null || this.Cabecera == "") {
            errores.push("Cabecera es requerido");
        }
        if (this.Longitud == null || this.Longitud == "") {
            errores.push("Longitud es requerido");
        }
        if (this.Latitud == null || this.Latitud == "") {
            errores.push("Latitud es requerido");
        }
        console.log(errores);
        return errores;  
    }
    /**
     * @returns {string[]}
     */
    create() {
        return [this.Municipio, this.Cabecera, this.Longitud, this.Latitud];
    }
    /**
     * @returns {string[]}
     */
    update() {
        return [...this.create(), this.CodMun];
    }

}