/* base de datos
*CREATE TABLE `clientes` (
*  `Id` int(11) NOT NULL,
*  `Nombre` varchar(50) NOT NULL,
*  `Apellido` varchar(50) NOT NULL,
*  `Direccion` varchar(255) DEFAULT NULL,
*  `CodMunicipio` int(11) DEFAULT NULL,
*  `Telefono` varchar(15) DEFAULT NULL,
*  `Estado` tinyint(1) NOT NULL DEFAULT 1
* ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
*
**/
export default class Cliente{
    /**
     * @param {object} cliente
     * @param {number} cliente.id
     * @param {string} cliente.Nombre
     * @param {string} cliente.Apellido
     * @param {number} cliente.CodMunicipio
     * @param {number} cliente.Municipio
     * @param {string} cliente.Telefono
     * @param {number} cliente.Estado 1 = Activo, 0 = Inactivo
     */
    constructor({Id, Nombre, Apellido, Direccion, CodMunicipio,Municipio, Telefono, Estado}){
        this.Nombre = Nombre ?? null;
        this.Apellido = Apellido ?? null;
        this.Direccion = Direccion ?? null;
        this.Municipio = Municipio ?? null;
        this.CodMunicipio = Number(CodMunicipio) ?? null;
        this.Telefono = Telefono ?? null;
        this.Estado = Number(Estado) ?? null;
        this.Id = Number(Id) ?? null;
    }

    /**
     * @returns {string[]} 
     */   
    validar(){
        let errores = [];
        if(!this.Nombre){
            errores.push("El nombre es obligatorio");
        }
        if(this.Nombre.length <= 2){
            errores.push("El nombre es muy corto");
        }
        if(!this.Apellido){
            errores.push("El apellido es obligatorio");
        }
        if(this.Apellido.length <= 3){
            errores.push("El apellido es muy corto");
        }
        if(!this.Direccion){
            errores.push("La direccion es obligatoria");
        }
        if(!this.CodMunicipio){
            errores.push("El municipio es obligatorio");
        }
        if(this.CodMunicipio == '-1'){
            errores.push("El municipio no es valido");
        }
        if(!this.Telefono){
            errores.push("El telefono es obligatorio");
        }
        if ( typeof this.Estado != "number" || isNaN(this.Estado)  || this.Estado === -1   ){
            errores.push("El estado no es un numero");
        } 
        return errores;
    }

    create(){
        return [ this.Nombre, this.Apellido, this.Direccion, this.CodMunicipio, this.Telefono, this.Estado ];
    }
    /**
     * @returns {string[]}
     */
    update(){
        return [ ...this.create(), this.Id ];
    }
}