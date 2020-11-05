class Users{
    constructor(idUser,LastName,FirstName,UserType,Mail,UserPassword){
        this.idUser = idUser;
        this.LastName = LastName;
        this.FirstName = FirstName,
        this.UserType = UserType;
        this.Mail = Mail;
        this.UserPassword = UserPassword;
    }
}

module.exports = Users;