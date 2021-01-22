function validaLogin() {
    let userTxt = localStorage.getItem("userLogged");
    console.log(userTxt);
    if (!userTxt) {
        window.location = "index.html";
    }


listComunidades();
}

function listComunidades(){
    let userTxt = localStorage.getItem("userLogged");
    var obj = JSON.parse(userTxt);
    idUser = obj.id;


    let loginMsg = {
        id: idUser
    }

    //construindo a mensagem que sera enviada ao backend    
    let msg = {
        method: 'POST',
        body: JSON.stringify(loginMsg),
        headers: {
            'Content-type': 'application/json'
        }
    }

    fetch("http://localhost:8080/comunidade/user", msg)
        .then(res => tratarRetorno(res))   

}



function tratarRetorno(dados) {
    if (dados.status == 200) {
        dados.json().then(res => exibirComunidades(res));
    } else {
        document.getElementById("listaComunidades").innerHTML = "Erro na consulta";
    }
}

function exibirComunidades(comunidade) {
    console.log(comunidade)

    dados_user = '';

    dados_user += '<img src="../imagens/logo_itau.png" class="mr-3" alt="..." width="100" height="100">'
    dados_user += '<div class="media-body">'
    dados_user += '    <h5 class="mt-0">' + comunidade[0].usuario.nome +'</h5>'
    dados_user += '</div>'
    document.getElementById("info_user").innerHTML = dados_user;



    console.log(comunidade);

    if (comunidade.length == 0) {
        document.getElementById("listaComunidades").innerHTML = "Usuario nao possui Comunidades Cadastradas";
    } else {

        let comunidades = comunidade;

        let dados = '';
        
        dados += '<thead class="thead-dark">'
        dados += '<tr>'
        dados += '<th scope="col"></th>'
        dados += '<th scope="col"></th>'
        dados += '<th scope="col"></th>'
        dados += '</tr>'
        dados += '</thead>'
        dados += '<tbody>'


        
        for (let i = 0; i < comunidades.length; i++) {
            console.log(comunidades[i].nomeComunidade)
            dados += '<tr>'
            dados += '<th scope="row">' + comunidades[i].nomeComunidade + '</th>'
            dados += '<td><button class="btn btn-info" onclick="novo(' + comunidades[i].idComunidade  + ",'" + comunidades[i].nomeComunidade + "'" +')" type="submit">Novo</button></td>'
            dados += '<td><button class="btn btn-dark" onclick="extrato(' + comunidades[i].idComunidade + ')" type="submit">Extrato</button></td>'
            dados += '</tr>'
        }
        dados += '</tbody>'
        document.getElementById("listaComunidades").innerHTML = dados;




    }
  
}

function novo(id, comunidade){
    localStorage.setItem("novoRegistro", id)
    localStorage.setItem("nomeComunidade", comunidade)
    window.location = "cadastro.html"
}

function extrato(id){
    localStorage.setItem("extratoRegistro", id)
    window.location = "extrato.html"
}