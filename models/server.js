//configuraciones del servidor

let express = require("express");
let mysql=require('mysql');
let Sha1=require('sha1');
let session=require('express-session');
let cookieParser=require('cookie-parser');

class Server{
    constructor(){
        //se agrega la funcion express a la variable app
        //se agrega el puerto al puerto xd
        //se invocan las funciones middleware y routes
        this.app=express();
        this.port=process.env.PORT;
        this.middlewares();
        this.routes();

    }
    
    middlewares(){
        // se agregan las paginas estaticas 
        this.app.use(express.static('public'));
        // exportas ejs para poderlo usar
        this.app.set('view engine', 'ejs');
        //para las cookies
        this.app.use(cookieParser());
        //para sesiones de usuarios
        this.app.use(session({
            secret: "amar",
            saveUninitialized: true,
            resave: true
        }));
    }

    routes(){
        //se agragan rutas
        /* request y responses*/
        this.app.get("/hola",(req,res)=>{
            if(req.session.user){

                if(req.session.user.rol=='Administrador'){
                    res.send("Iniciaste como Administrador");
                }
                else if(req.session.user.rol=='Usuario'){
                    res.send('Iniciaste como Usuario');
                }
            }
            else{
                res.send("No has iniciado sesion!!!");
            }

        });
        
        //referencias las variables con el formulario inputs
        this.app.get("/registrar",(req,res)=>{
            let mat=req.query.matricula;
            let nombre=req.query.nombre;
            let cuatri=req.query.cuatrimestre;

            //pasas los parametros como variables ejs
            res.render('registrar',{mat:mat,nombre:nombre,cuatri:cuatri});
            let con=mysql.createConnection({
                user:'root',
                password:'1Q2W3E4R5T6Y',
                database:'escuela'
            });
            con.connect(function(err){
                if(err) throw err;
                console.log('conectado');
                let sql="INSERT INTO alumno VALUES ("+mat+",'"+nombre+"',"+cuatri+")";
                con.query(sql,function(err,result){
                    if(err) throw err;
                    else{
                        console.log('1 registro se a agregado');
                    }
                });
            });
        });

        //Ruta para agregar cursos
        this.app.get("/cursos",(req,res)=>{
            let id_curso=req.query.id_curso;
            let nombre=req.query.nombre;

            res.render('cursos',{id_curso:id_curso,nombre:nombre});
            let con=mysql.createConnection({
                user:'root',
                password:'1Q2W3E4R5T6Y',
                database:'escuela'
            });
            con.connect(function(err){
                if(err) throw err;
                console.log('Conectado');
                let sql="INSERT INTO curso VALUES ("+id_curso+",'"+nombre+"')";
                con.query(sql,function(err,result){
                    if(err) throw err;
                    console.log('1 archivo agregado');
                });
            });
        });
        
        this.app.get("/inscrito",(req,res)=>{
            let matricula=req.query.matricula;
            let id_curso=req.query.id_curso;
            
            res.render('inscrito',{matricula:matricula,id_curso:id_curso});
            let con=mysql.createConnection({
                user:'root',
                password:'1Q2W3E4R5T6Y',
                database:'escuela'
            });
            
            con.connect(function(err){
                if(err) throw err;
                console.log('conectado!');
                let sql="INSERT INTO inscrito VALUES ("+matricula+","+id_curso+")";
                con.query(sql,function(err,result){
                    if(err) throw err;
                    console.log('1 registro agregado');
                });
            });
        });
        
        this.app.get("/login",(req,res)=>{
            let usuar=req.query.usuar;
            let passw=req.query.passw;
            
            /////////////////////////////////////////////////
            let passSha1=Sha1(passw);
            
            let conn=mysql.createConnection({
                user:'root',
                password:'1Q2W3E4R5T6Y',
                database:'escuela'
            });
            conn.connect(function(err){
                if(err) throw err;
                console.log('Conectado!!!');
                let sql="SELECT * FROM usuarios WHERE usuario='"+usuar+"'";
                conn.query(sql,function(err,result){
                    if(err) throw err;
                    else{
                        if(result.length>0){
                            if(result[0].usuario==usuar){
                                if (result[0].password==passSha1){
                                    let user={
                                        usr:usuar,
                                        psw:passw,
                                        rol:result[0].roll
                                    };
                                    req.session.user=user;
                                    req.session.save();
                                    res.render("Inicio",{usuar:usuar,privilegio:result[0].roll});

                                }
                                else{
                                    res.render("login",{error:"Contraseña no existe"});
                                }
                            }
                        }
                        else{
                            res.render("login",{error:"Usuario no existe!!!"});
                        }
                    }
                });
            });
        });
    }
    
    listen(){
        //en que puerto se va a configurar
        this.app.listen(this.port,()=>{
            console.log("http://127.0.0.1:"+this.port);
        });
    }
}

module.exports = Server;