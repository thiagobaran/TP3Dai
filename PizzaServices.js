import config from './dbconfig.js';
import sql from 'mssql';

export class PizzaServices{
    static getAll = async () =>{
        let returnEntity = null;
        console.log('Estoy en: PizzaService.getAll()',ID);
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input(sql.Int, ID)
                                    .query('SELECT * FROM Pizza');
            return result.recordsets[0];
        }
        catch(error){
            console.log(error);
        }
    }
    static getById = async (ID) =>{
        let returnEntity = null;
        console.log('Estpy en: PizzaService.GetById(ID)',ID);
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input("pID", sql.Int, ID)
                                    .query('SELECT * FROM Pizza WHERE ID = @pID');
            return result.recordsets[0];
        }
        catch(error){
            console.log(error);
        }
    }
    static insert = async (Pizza) =>{
        const{Nombre,LibreGluten,Importe,Descripcion} = Pizza;
        console.log("name: " ,Nombre)
        let pool = await sql.connect(config);
        const request = new sql.Request(pool);
        request
        .input('Nombre',sql.NVarChar(50),Nombre)
        .input('LibreGluten',sql.Float,LibreGluten)
        .input('Importe',sql.Money,Importe)
        .input('Descripcion',sql.NVarChar(100),Descripcion)
        .input('INSERT INTO Pizza (Nombre,LibreGluten,Importe,Descripcion) VALUES ("Cancha",0,1500,"Sin queso")')
    }
    static update = async (Pizza) =>{
        let rowsAffected = 0;
        const{Nombre,LibreGluten,Importe,Descripcion} = Pizza;
        console.log("name: " ,Nombre)
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input("pNombre", sql.NVarChar(50), Nombre)
                                    .input("pImporte",sql.int,Importe)
                                    .query('UPDATE Pizza set Importe=pImporte where Nombre=pNombre');
            rowsAffected = result.rowsAffected;
        }
        catch(error){
            console.log(error);
        }
        return rowsAffected;
    }
    static deleteById = async (ID) =>{
        let rowsAffected = 0;
        console.log('Estoy en: PizzaServices.deleteById(ID)');
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input(pID, sql.Int, ID)
                                    .query('DELETE FROM Pizza WHERE ID = @pID');
            rowsAffected = result.rowsAffected;
        }
        catch(error){
            console.log(error);
        }
        return rowsAffected;
    }
}