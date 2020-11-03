var config = require('./dbconfig');
const sql = require('mssql');


async function getUsuarios(){
    try{
        let pool = await sql.connect(config)
        let usuarios = await pool.request().query("SELECT * FROM Usuarios")
        return usuarios.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function getUsuario(idUsuario){
    try{
        let pool = await sql.connect(config)
        let usuario = await pool.request()
            .input('input_parameter',sql.Int,idUsuario)
            .query("SELECT * FROM Usuarios WHERE id = @input_parameter")
        return usuario.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function addUsuario(usuario){
    try{
        let pool = await sql.connect(config);
        let insertUsuario= await pool.request()
            .input('id',sql.Int,usuario.id)
            .input('Nombre',sql.NVarChar,usuario.Nombre)
            .input('Apellido',sql.NVarChar,usuario.Apellido)
            .input('mail',sql.NVarChar,usuario.mail)
            .input('contraseña',sql.NVarChar,usuario.contraseña)
            .query("INSERT INTO Usuarios VALUES( @id , @Nombre ,@Apellido,@mail,@contraseña)")
        return insertUsuario.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    getUsuarios : getUsuarios,
    getUsuario : getUsuario,
    addUsuario : addUsuario
}