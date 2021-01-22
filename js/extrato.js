function validaLogin() {
    let userTxt = localStorage.getItem("userLogged");
    //console.log(userTxt);
    if (!userTxt) {
        window.location = "index.html";
    }


    listModernizacao();
}

function listModernizacao() {
    let id = localStorage.getItem("extratoRegistro");

    fetch("http://localhost:8080/comunidade/id/" + id)
        .then(res => tratarRetorno(res));

}



function tratarRetorno(dados) {
    if (dados.status == 200) {
        dados.json().then(res => exibirModernizacao(res));
    } else {
        document.getElementById("listaComunidades").innerHTML = "Erro na consulta";
    }
}

function exibirModernizacao(comunidade) {


    dados_comunidade = '';
    dados_comunidade += '<img src="../imagens/comunidade.png" class="mr-3" alt="..." width="100" height="100">'
    dados_comunidade += '<div class="media-body">'
    dados_comunidade += '    <h5 class="mt-0">' + comunidade.nomeComunidade + '</h5>'
    dados_comunidade += '</div>'
    document.getElementById("info_comunidade").innerHTML = dados_comunidade;




    if (comunidade.modernizacoes.length == 0) {
        document.getElementById("listaModenizacao").innerHTML = "Comunidade não possui modernizações cadastradas";
    } else {

        let comunidades = comunidade.modernizacoes;

        let dados = '';

        dados += '<thead class="thead-dark">'
        dados += '<tr>'
        dados += '<th scope="col">Data</th>'
        dados += '<th scope="col">Descrição</th>'
        dados += '<th scope="col">Percentual</th>'
        dados += '</tr>'
        dados += '</thead>'
        dados += '<tbody>'




        for (let i = 0; i < comunidades.length; i++) {

            let data = new Date(comunidades[i].dataModernizacao).toLocaleDateString("pt-BR");
            let data_atual = new Date().getTime();
            let data_form = new Date(comunidades[i].dataModernizacao).getTime();

            //console.log(data_atual + " " + data_form)

            if (data_form < data_atual) {
                dados += '<tr class="table-success">'
            } else {
                dados += '<tr>'
            }




            dados += '<th scope="row">' + data + '</th>'
            dados += '<td>' + comunidades[i].descricao + '</td>'
            dados += '<td>' + comunidades[i].percentual + '%</td>'
            dados += '</tr>'
        }
        dados += '</tbody>'
        document.getElementById("listaModenizacao").innerHTML = dados;




    }

}

function logout() {
    localStorage.removeItem("userLogged");
    window.location = "index.html";
}

