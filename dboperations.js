var config = require('./dbconfig');
const sql = require('mssql');

const bcrypt = require('bcryptjs')
/*
const bcrypt = require('bcrypt')
*/
async function getUsers(){
    try{
        let pool = await sql.connect(config)
        let users = await pool.request().query("SELECT * FROM Users")
        return users.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function getUser(idUser){
    try{
        let pool = await sql.connect(config)
        let user = await pool.request()
            .input('input_parameter',sql.Int,idUser)
            .query("SELECT * FROM Users WHERE idUser = @input_parameter")
        return user.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function addUser(user){
    try{
        let pool = await sql.connect(config);
        const hashedPassword = await bcrypt.hash(user.UserPassword, 10)
        
        let insertUser= await pool.request()
            .input('LastName',sql.NVarChar,user.LastName)
            .input('FirstName',sql.NVarChar,user.FirstName)
            .input('UserType',sql.NVarChar,user.UserType)
            .input('Mail',sql.VarChar,user.Mail)
            .input('UserPassword',sql.NVarChar, hashedPassword)
            .query("INSERT INTO Users (LastName, FirstName, UserType, Mail, UserPassword) VALUES(@LastName, @FirstName, @UserType, @Mail, @UserPassword)")
        console.log(hashedPassword)    
        return insertUser.recordsets;
    }
    catch(error){
        console.log(error);
    }
}


async function deleteUser(idUser){
    try{
        let pool = await sql.connect(config)
        let user = await pool.request()
            .input('input_parameter',sql.Int,idUser)
            .query("DELETE FROM Users WHERE idUser = @input_parameter")
        return user.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function login(user){
    try{
        let pool = await sql.connect(config);
        
        let insertUser= await pool.request()
            .input('mail',sql.NVarChar,user.Mail)
            .query("SELECT Users.Mail, Users.UserPassword FROM Users WHERE Users.Mail = @mail")
        console.log(insertUser.recordset[0].UserPassword)  
        console.log(user.UserPassword)
        if(await bcrypt.compare( user.UserPassword,insertUser.recordset[0].UserPassword)){
            return insertUser.recordset[0];
        }else{
            return "Error";
        }
    }
    catch(error){
        console.log(error);
    }
}

/*
async function getDeptoUsuario(idUsuario){
    try{
        let pool = await sql.connect(config)
        let usuario = await pool.request()
            .input('input_parameter',sql.Int,idUsuario)
            .query("SELECT Depto.idDepto, Edificio.idEdificio, Piso, Nro, Edificio.Nombre, Direccion FROM Usuarios JOIN Deptos on (Deptos.idDepto = Usuarios.idUsuario) JOIN Edifcios on (Edificios.idEdificio = Depto.idEdificio) WHERE Usuarios.id = @input_parameter")
        return usuario.recordsets;
    }
    catch(error){
        console.log(error);
    }
}
*/

module.exports = {
    getUsers: getUsers,
    getUser : getUser,
    addUser : addUser,
    deleteUser: deleteUser,
    login: login
    
    
    /*,
    
    getDeptoUsuario : getDeptoUsuario
    */
}