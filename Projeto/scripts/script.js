/*Verificação de usuario logado */
var dadosArmazenados = localStorage.getItem("meusDados");

if (dadosArmazenados) {

    var dadosRecuperados = JSON.parse(dadosArmazenados);

    let usuario = dadosRecuperados.usuario

    if (usuario.trim() === "" || usuario.trim() === null){
        var elemento = document.getElementById("loginUsuario");
        elemento.style.visibility = "hidden";
    }else{
        var elemento = document.getElementById("loginUsuario");
        var nome = document.getElementById("loginNome");
        nome.innerText = "Olá, " + usuario;
        elemento.style.visibility = "visible";
    }
}


/* contato*/
function btnEnviar() {
    var nome = document.getElementById('specificSizeInputName').value;
    var username = document.getElementById('specificSizeInputGroupUsername').value;
    var selectElement = document.getElementById('specificSizeSelect');
    var textarea = document.getElementById('floatingTextarea2').value;

    if(nome.trim() === "" || username.trim() === "" || textarea.trim() === "" || selectElement.selectedIndex === 0) {
        window.alert("Todos os campos devem ser preenchidos.");
    } else {
        window.alert(`Olá ${nome}. Sua mensagem foi enviada com sucesso.`);
    }
}


/* Redirecionamentos inicio*/
function redirecionarCadastro() {
    window.location.href = "../painelJogadorRegistro.html";
}
function redirecionarNovidades() {
    window.location.href = "../novidades.html";
}
function redirecionarPersonagens() {
    window.location.href = "../personagens.html";
}
function redirecionarSobre() {
    window.location.href = "../sobre.html";
}
function redirecionarlogin() {
    window.location.href = "../paineljogador.html";
}
function redirecionarRegistro() {
    window.location.href = "../painelJogadorRegistro.html";
}
function redirecionarHome() {
    window.location.href = "./index.html";
}


/*registro*/
function registro(){
    var usuario = document.getElementById('exampleInputName1').value
    var email = document.getElementById('exampleInputEmail1').value
    var senha = document.getElementById('exampleInputPassword1').value
    if(usuario.trim() === "" || email.trim() === "" || senha.trim() === ""){
        window.alert("Todos os campos devem ser preenchidos.");
        return
    }

    const data = {
        usuario: usuario,
        email: email,
        senha: senha
    };

    fetch('http://localhost:8080/insert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            redirecionarlogin();
            window.alert("Usuário adicionado com sucesso.");
            return response.json();
        }
        throw new Error('Erro ao enviar os dados.');
    })
}

/* login */
function login() {
    var email = document.getElementById('exampleInputEmail').value;
    var senha = document.getElementById('exampleInputPassword').value;

    if (email.trim() === "" || senha.trim() === "") {
        window.alert("Todos os campos devem ser preenchidos.");
        return;
    }

    fetch('http://localhost:8080/')
        .then(response => response.json())
        .then(data => {
            for (let item of data) {
                let emailBd = item.email;
                let senhaBd = item.senha;
                let usuario = item.usuario;
                if (email === emailBd && senha === senhaBd) {
                    
                    var dados = {
                        usuario: usuario
                    };
                    var dadosJSON = JSON.stringify(dados);
                    localStorage.setItem("meusDados", dadosJSON);
                    
                    redirecionarHome();
                    return;
                }
            }
            window.alert("Dados inválidos. Tente novamente.");
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
    });
}


/*Logout*/
function fazerLogout() {
    localStorage.clear();
    var elemento = document.getElementById("loginUsuario");
    window.alert("Logout efetuado com sucesso!")
    elemento.style.visibility = "hidden"
}

/*Registro com verificação*/
function registro2() {
    var usuario = document.getElementById('exampleInputName1').value;
    var email = document.getElementById('exampleInputEmail1').value;
    var senha = document.getElementById('exampleInputPassword1').value;
    
    if (usuario.trim() === "" || email.trim() === "" || senha.trim() === "") {
        window.alert("Todos os campos devem ser preenchidos.");
        return;
    }

    fetch('http://localhost:8080/')
        .then(response => response.json())
        .then(data => {
            var usuarioDuplicado = 0;
            var emailDuplicado = 0;

            for (let item of data) {
                let emailBd = item.email;
                let usuarioBd = item.usuario;

                if (usuario === usuarioBd) {
                    console.log("passou no usuario")
                    usuarioDuplicado++;
                    console.log(usuarioDuplicado);
                }
                if (email === emailBd) {
                    console.log("passou no email")
                    emailDuplicado++;
                    console.log(emailDuplicado);
                }
            }

            console.log(emailDuplicado);
            console.log(usuarioDuplicado);

            if (emailDuplicado > 0) {
                console.log("email deu ruim");
                return;
            }
            if (usuarioDuplicado > 0) {
                console.log("usuario deu ruim");
                return;
            }

            const requestData = {
                usuario: usuario,
                email: email,
                senha: senha
            };

            fetch('http://localhost:8080/insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            })
            .then(response => {
                if (response.ok) {
                    redirecionarlogin();
                    window.alert("Usuário adicionado com sucesso.");
                    return response.json();
                }
                throw new Error('Erro ao enviar os dados.');
            });
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
}

