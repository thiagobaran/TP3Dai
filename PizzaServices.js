import {config} from './dbconfig.js';
import sql from 'mssql';

export class PizzaServices{
    static getAll = async () =>{
        let returnEntity = null;
        console.log('Estoy en: PizzaService.getAll()');
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .query('SELECT * FROM Pizza');
            return result.recordsets[0];
        }
        catch(error){
            console.log(error);
        }
    }
    static getById = async (ID) =>{
        let returnEntity = null;
        console.log('Estoy en: PizzaService.GetById(ID)',ID);
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
        .input('pNombre',Nombre)
        .input('pLibreGluten',LibreGluten)
        .input('pImporte',Importe)
        .input('pDescripcion',Descripcion)
        .query('INSERT INTO Pizza (Nombre, LibreGluten, Importe, Descripcion) VALUES (@pNombre, @pLibreGluten, @pImporte, @pDescripcion)')
    }

    static update = async (Pizza) =>{
        let rowsAffected = 0;
        const{ID, Nombre,LibreGluten,Importe,Descripcion} = Pizza;
        console.log("name: " ,Nombre)
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input("pId", ID)
                                    .input('pNombre',Nombre)
                                    .input('pLibreGluten',LibreGluten)
                                    .input('pImporte',Importe)
                                    .input('pDescripcion',Descripcion)
                                    .query('UPDATE Pizza set Nombre = @pNombre, Importe=@pImporte, LibreGluten = @pLibreGluten, Descripcion = @pDescripcion where ID=@pId');
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
                                    .input("pID", sql.Int, ID)
                                    .query('DELETE FROM Pizza WHERE ID = @pID');
            rowsAffected = result.rowsAffected;
        }
        catch(error){
            console.log(error);
        }
        return rowsAffected;
    }
}