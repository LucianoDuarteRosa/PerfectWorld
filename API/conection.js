const mysql = require("mysql")

const conection = mysql.createConnection(
    {host : "localhost", 
    user: "root", 
    password: "123",
    database: "user"}
);

conection.connect(function(err){
    if(err){
        console.log(err)
    }else{
        console.log("Conectado")
    }
    conection.query("SELECT * FROM dados", function(err, results, fields){
    })
});

module.exports = conection;