const dataBase = require("../Config/mysql")
const bcrypt = require("bcrypt")
const jwt =require("jsonwebtoken")

exports.signup = (req, res)=>{

    bcrypt.hash(req.body.password_user,5)
   .then((hash)=>{
    let insertUserQuery = "INSERT INTO users(nom_user,prenom_user,email_user,password_user) VALUES(?,?,?,?)"

    dataBase.query(
        insertUserQuery,[req.body.nom_user,req.body.prenom_user,req.body.email_user,hash],(error,result)=>{
            if(error){
                res.status(401).json(error)
            }
            res.status(201).json({id:result.insertId, hash})
        }
    )
   })
   .catch(error=>{
    throw error;
   })

   
}

exports.login = (req, res)=>{
    console.log(req.body);
    let selectUserQuery = "SELECT * from `users` WHERE email_user=?";
    dataBase.query(selectUserQuery,[req.body.email_user],(error,result)=>{
        if(error) {

            res.status(500).json(error)
            console.log("error")
        }
        if(result.length >0){
/* res.status(200).json({message:"nom d'utilisateur correct"}) */

            bcrypt.compare(req.body.password_user,result[0].password_user)
            .then((valid)=>{
                if(valid){

                    let accessToken = jwt.sign(
                        {user_id:result[0].id_user},
                        "12345678",
                        {expiresIn:"15h"}
                    
                    
                    );
                    res.status(200).json({accessToken})


                }else{

                    res.status(401).json({error:"incorrect password"})
                }
            })
            .catch((error)=> res.status(500).json(error))
        }
        else{
            res.status(401).json({error:"user not found"})
        }
    })

    /* res.status(201).json({message:"login"}) */

}
