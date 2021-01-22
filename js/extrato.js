function validaLogin() {
    let userTxt = localStorage.getItem("userLogged");
    //console.log(userTxt);
    if (!userTxt) {
        window.location = "index.html";
    }

    nome_comunidade = localStorage.getItem("nomeComunidade");

    dados_comunidade = '';
    dados_comunidade += '<img src="../imagens/comunidade.png" class="mr-3" alt="..." width="100" height="100">'

    dados_comunidade += '<div class="media-body">'
    dados_comunidade += '    <h5 class="mt-0">' + nome_comunidade + '</h5>'
    dados_comunidade += '</div>'
    document.getElementById("info_comunidade").innerHTML = dados_comunidade;

    listModernizacao();
}

function listModernizacao() {
    let id = localStorage.getItem("extratoRegistro");

    let loginMsg = {
        idComunidade: id
    }

    //construindo a mensagem que sera enviada ao backend    
    let msg = {
        method: 'POST',
        body: JSON.stringify(loginMsg),
        headers: {
            'Content-type': 'application/json'
        }
    }


    fetch("http://localhost:8080/modernizacao/comunidade", msg)
        .then(res => tratarRetorno(res))


}



function tratarRetorno(dados) {
    if (dados.status == 200) {
        dados.json().then(res => exibirModernizacao(res));
    } else {
        document.getElementById("listaComunidades").innerHTML = "Erro na consulta";
    }
}

function exibirModernizacao(modernizacao) {
    //console.log(modernizacao)

    if (modernizacao.length == 0) {
        document.getElementById("listaModenizacao").innerHTML = "Comunidade não possui modernizações cadastradas";
    } else {

        let comunidades = modernizacao;

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

            //console.log(new Date(comunidades[i].dataModernizacao + "T00:00:00-07:00"))
            let data = new Date(comunidades[i].dataModernizacao + "T00:00:00-07:00").toLocaleDateString("pt-BR");
            let data_atual = new Date();
            let data_form = new Date(comunidades[i].dataModernizacao + "T00:00:00-07:00");

            valor_data_atual = parseInt(data_atual.getFullYear().toString() + data_atual.getMonth().toString() + data_atual.getDay().toString());
            valor_data_form = parseInt(data_form.getFullYear().toString() + data_form.getMonth().toString() + data_form.getDay().toString());

            if (valor_data_form < valor_data_atual) {
                dados += '<tr class="table-success">'
            } else {
                if (valor_data_form == valor_data_atual) {
                    dados += '<tr class="table-warning">'
                } else {
                    dados += '<tr class="table-secondary">'
                }
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

