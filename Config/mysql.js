const mysql = require("mysql2")

const dataBase = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "univ"
})

dataBase.connect((error)=>{
    if (error) throw error
    console.log("database connected sucessfuly");
})

module.exports = dataBase;