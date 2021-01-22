function login() {
    let usuario = document.getElementById("user").value;

    let senha = document.getElementById("password").value;

    //console.log(usuario + senha);

    // construindo um objeto javascript para enviar

    let loginMsg = {
        email: usuario,
        racf: usuario,
        senha: senha
    }

    //construindo a mensagem que sera enviada ao backend    
    let msg = {
        method: 'POST',
        body: JSON.stringify(loginMsg),
        headers: {
            'Content-type': 'application/json'
        }
    }

 
    fetch("http://localhost:8080/user/login", msg)
        .then(res => tratarRetorno(res))

}

function tratarRetorno(retorno) {

    if (retorno.status == 200) {
        retorno.json().then(res => acessoPermitido(res))
    } else {
        document.getElementById("output").innerHTML = "usuário/senha inválidos"
    }
}

function acessoPermitido(user) {
    //console.log(user);
    localStorage.setItem("userLogged", JSON.stringify(user))
    window.location = "diretor.html"
}

function logout() {
    localStorage.removeItem("userLogged");
    window.location = "index.html";
}