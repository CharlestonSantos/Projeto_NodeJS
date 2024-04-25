/*function logar(){
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
        headers: { 'Content-Type' : 'application/json' }        
    })

    .then(async (resp) => {
        var status = await resp.text();
        console.log(status)
        if(status == 'conectado'){
            location.href = '/frontend/lista.html'
        }else {
            alert('nome e senha invalidos!!')
        }        
    })
}*/
/*
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

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

/*

//------------------------------------------------------
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const port = 3000;
const login = 'admin';
const password = '123456';

const app = express();

app.use(session({secret:'çlmçlsafdslmLKl664m,Y(h'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/frontend/index.html', (req, res) => {
    const { nomes, senha } = req.body;
    if (nomes === login && senha === password) {
        req.session.login = login;
        res.send('conectado');
    } else {
        res.status(401).send('nome e senha inválidos');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Array simulando uma base de dados de usuários
const usuarios = [
    { email: 'admin@example.com', senha: '123456' },
    { email: 'jj@example.com', senha: '123' },
    // Adicione mais usuários conforme necessário
];

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/frontend/index.html', (req, res) => {
    const { email_login, senha_login } = req.body;
    
    // Verificar se o email e a senha correspondem a algum usuário na lista
    const usuario = usuarios.find(user => email === email_login && senha === senha_login);
    
    if (usuario) {
        // Usuário autenticado com sucesso
        res.send('Login bem-sucedido!');
    } else {
        // Usuário não encontrado ou senha incorreta
        res.status(401).send('Credenciais inválidas. Verifique seu email e senha.');
    }
});*/

function logar(){
    var email_login = document.getElementById('email_login').value
    var senha_login = document.getElementById('senha_login').value

console.log(JSON.stringify({
    email:email,
    senha:senha
}));

    fetch("/login",{
        method:'POST',
        body: JSON.stringify({
            email_login:email_login,
            senha_login:senha_login
        }) , 
        headers: { "Content-Type" : "application/json" }
        
    })

    .then(async (resp) => {
        var status = await resp.text();
        console.log(status)
        if(status == 'conectado' ){
            location.href = '/frontend/views/nova_Task.html'
        }else {
            alert('nome e senha invalidos!!')
        }
        
    });

}