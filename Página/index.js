const express  = require("express"); //libreria para conexion con servidor
const cors = require("cors"); // para cuando nos conectamos de una url a otra
const mongoose = require("mongoose"); //crear modelos y estructuras de datos
const axios = require("axios"); //conexiones con el from

const app = express();

app.use(cors()); //utilizar cors
app.use(express.json()); //usar objetos y no objetos planos
app.use(express.urlencoded({extend:true}));

const PORT =5000;

app.listen(PORT,function () { // conectarse al servidor
    console.log("CONECTADO AL PUERTO:" + PORT);
});

const bbdd = "appfuturo";

const url = "mongodb+srv://mafem:1031808181@cluster0.lnqsvmi.mongodb.net/"+bbdd+"?retryWrites=true&w=majority&appName=Cluster0"

const connection = mongoose.mongoose.connect(url);

connection.then(function () {
    console.log("CONECTADO A LA BASE DE DATOS");
}).catch(function (error) {
    console.log("Error en la conexión" + error);
});

require("./assets/models/mensajes.js")

const Mensaje = mongoose.model("mensajes");



app.post("/subir",function(reg,res){


    const mensaje = req.body.mensaje;

    try {
        Mensajes.create(mensaje);

        res.send({
            status: true,
             message:"Mensaje Enviado"
        })
     }
        
    catch {error} {
         Mensajes.create(mensaje);

        res.send({
            status: false,
             message:"No se logro enviar el mensaje",
            error:error.message
        })
        
        

    }
});

app.get("/recibir", async function (req,res){
            try {

                const mensajes =await Mensaje.find({});

                res.send({
                    status: true,
                    menssage: "Mensajes recibidos correctamente",
                    datos: mensajes
                })
            }

            catch {

                res.send({
                    status: false,
                    message:"Error al enviar el mensaje",
                    error:error.message
        })

               
            }

        });