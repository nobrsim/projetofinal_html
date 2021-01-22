function validaLogin() {
    let userTxt = localStorage.getItem("userLogged");
    console.log(userTxt);
    if (!userTxt) {
        window.location = "index.html";
    }


listModernizacao();
}

function listModernizacao(){
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
    dados_comunidade += '<div class="media-body">'
    dados_comunidade += '    <h5 class="mt-0">' + comunidade.nomeComunidade +'</h5>'
    dados_comunidade += '</div>'
    document.getElementById("info_comunidade").innerHTML = dados_comunidade;




    if (comunidade.modernizacoes.length == 0) {
        document.getElementById("listaModenizacao").innerHTML = "Comunidade nao possui Modernizações Cadastradas";
    } else {

        let comunidades = comunidade.modernizacoes;

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

            let data = new Date(comunidades[i].dataModernizacao);

            if (data.getMonth() <= 9){
                mes = "0" + ((data.getMonth() + 1));
            } else
            {
                mes = ((data.getMonth() + 1));
            }

            if (((data.getDate() )) <= 9){
                dia = "0" +  ((data.getDate() ));
            } else
            {
                dia =  ((data.getDate() ));
            }           

            let dataFormatada = dia + "/" + mes + "/" + data.getFullYear(); 

            dados += '<tr>'
            dados += '<th scope="row">' + dataFormatada + '</th>'
            dados += '<td>' + comunidades[i].descricao + '</td>'
            dados += '<td>' + comunidades[i].percentual + '%</td>'
            dados += '</tr>'
        }
        dados += '</tbody>'
        document.getElementById("listaModenizacao").innerHTML = dados;




    }
  
}

