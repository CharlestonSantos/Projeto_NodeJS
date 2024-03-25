function logar(){
    var nomes = document.getElementById('nomes').value
    var senha = document.getElementById('senha').value

console.log(JSON.stringify({
    nomes:nomes,
    senha:senha
}));
//verificação e validação de dados de formulario na base
    fetch("/login",{
        method:'POST',
        body: JSON.stringify({
            nomes:nomes,
            senha:senha
        }) , 
        headers: { "Content-Type" : "application/json" }
        
    })

    .then(async (resp) => {
        var status = await resp.text();
        console.log(status)
        if(status == 'conectado' ){
            location.href = '/frontend/lista.html'
        }else {
            alert('nome e senha invalidos!!')
        }
        
    });

}


/* const express = require('express');
const session = require('express-session');
const bodyParser = require('bodyparse');

const port = localhost;
var path = require('path');
const app = express();

var login= "admin";
var password = "123456";

app.use(session({secret:'çlmçlsafdslmLKl664m,Y(h'}));
app.use(bodyParser.urlencoded({extended: true}));

app.engine('html', require('ejs').renderfile);
app.set('view engine', 'html');
app.use('/frontend', express.static(path.join(_dirname, 'frontend')));
app.set('views', path.join(_dirname, '/views'));

// Criando a rota
app.post('/',(req, res) => {
    if (req.body.password == password && req.body.login == login){
        req.session.login = login;
        res.render('logado.html', {login: login});
    }else {
        res.render('index.html');
    }
})

//Buscar os dados do formulário
app.get('/', (req, res) => {
    if (req.session.login){
        res.render('logado.html', {login: login});
    }else{    
        res.render('index.html');
    }
})
*/




/*

const addFormLogin = document.querySelector('.formLogin');

const acessoLogin = async (login) => {

    const { id, senha } = login;

    await fetch(`http://localhost:3333/tasks/${id}`, {

    });

    loadTasks();
}*/