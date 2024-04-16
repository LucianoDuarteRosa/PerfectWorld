const bd = require("./conection");
const express = require("express")
const app = express();
const body = require("body-parser");
const bodyParser = require("body-parser");
const cors = require('cors');

app.use(body.json());

app.use(cors({
    origin: '*'
}));

/*metodo para consultar */
app.get("/", function(req, res){
    const select = "SELECT * FROM  dados";
    bd.query(select, function(err, results){
        if(err){
            console.log(err)
        }else{
            res.send(results)
        }
    });
});

/*metodo para consultar id*/
app.get("/:id", function(req, res){
    const select = "SELECT * FROM  dados WHERE id= ?";
    bd.query(select,[req.params.id], function(err, results){
        if(err){
            console.log(err)
        }else{
            res.send(results)
        }
    });
});

/* metodo para inserir dados ---> com dados vindo do body do navegador*/ 
app.post("/insert", function(req, res){
    const insert = "INSERT INTO dados SET email=?, senha=?, usuario=?";
    const body = req.body;
    bd.query(insert, [body.email, body.senha, body.usuario], function(err, results){
        if(err){
            console.log(err)
            console.log("Usuário error.");
        }else{
            console.log("Usuário adicionado com sucesso.");
            res.json("Usuário adicionado com sucesso.");
        }
    });
});

/*metodo para alterar dados */
app.put("/update/:id", function(req, res){
    const update = "UPDATE dados SET email=?, senha=? WHERE id=?";
    bd.query(update, ["usuario7@usuario7", "123456", req.params.id], function(err, results){
        if(err){
            console.log(err)
        }else{
            res.send("Alterado com sucesso.")
        }
    });
});

/*metodo para deletar */
app.delete("/del/:id", function(req, res){
    const del = "DELETE FROM  dados WHERE id= ?";
    bd.query(del, [req.params.id], function(err, results){
        if(err){
            console.log(err)
        }else{
            res.send("Usuário deletado com sucesso.")
        }
    });
});

/*criar porta do servidor */
app.listen(8080, function(){
    console.log("o servidor está rodando...")
});
