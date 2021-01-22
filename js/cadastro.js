function validaLogin() {
    let userTxt = localStorage.getItem("userLogged");

    if (!userTxt) {
        window.location = "index.html";
    }

    nome_comunidade = localStorage.getItem("nomeComunidade");

    dados_comunidade = '';
    dados_comunidade += '<div class="media-body">'
    dados_comunidade += '    <h5 class="mt-0">' + nome_comunidade + '</h5>'
    dados_comunidade += '</div>'
    document.getElementById("info_comunidade").innerHTML = dados_comunidade;
}



function validaCadastro() {
    let data = document.getElementById("data").value;
    let descricao = document.getElementById("descricao").value;
    let percentual = document.getElementById("percentual").value;

    if (data == "" || descricao == "" || percentual == "") {
        alert("Preencha todos os campos");
    } else {
        cadastro();
    }
}




function cadastro() {



    let data = document.getElementById("data").value;
    let descricao = document.getElementById("descricao").value;
    let percentual = document.getElementById("percentual").value;

    id_comunidade = localStorage.getItem("novoRegistro");

    console.log(data + "- " + descricao + " " + percentual);
    // construindo um objeto javascript para enviar

    let loginMsg = {
        dataModernizacao: data,
        descricao: descricao,
        percentual: percentual,
        comunidade: {
            idComunidade: id_comunidade
        }
    }

    console.log(loginMsg);


    //construindo a mensagem que sera enviada ao backend    
    let msg = {
        method: 'POST',
        body: JSON.stringify(loginMsg),
        headers: {
            'Content-type': 'application/json'
        }
    }

    // fetch envia para o servidor 'localhost' o objeto 'msg
    // '.then'   - quando voltar a resposta
    // '=>' arrow function que chama a proxima funcao com o parametro 'res'
    // 'res' é o retorno do fech

    // uma arrow function é equivalente a uma funçao tradicional do javascript
    // (parm) => {   }
    fetch("http://localhost:8080/modernizacao/new", msg)
        .then(res => tratarRetorno(res))

}

function tratarRetorno(retorno) {
    console.log(retorno.status);

    if (retorno.status == 400) {
        alert("Já Existe modernização cadastrada neste mes/ano");
    } else {
        if (retorno.status == 402) {
            alert("Excedeu 100% das Modernizações cadastradas no ano");
        } else {
        if (retorno.status == 200) {
            //document.getElementById("output").innerHTML = "Registro inserido com Sucesso"
            retorno.json().then(res => insertCadastro(res))
        } else {
            alert("Erro na inserção");
        }
    }
}
}

function insertCadastro(res) {

    alert("Cadastro de Modernização Inserido com sucesso");
    //console.log(user);
    //localStorage.setItem("userLogged", JSON.stringify(user))
    window.location = "cadastro.html"
}

function logout() {
    localStorage.removeItem("userLogged");
    window.location = "index.html";
}