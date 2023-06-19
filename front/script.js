
function enviar() {
    var mes = document.getElementById('mes').value;
    var valor = document.getElementById('valor').value;
    valor = parseFloat(valor);
    var nome = document.getElementById('nome').value;
    var categoria = document.getElementById('categoria').value;
    
    // if(categoria == "variavel"){
    //     var hmtl = "<label> Parcelas: </label>";
    //     html += "<input type='number' id='parcelas' name='parcelas' min='1' max='12' value='1'>";
    //     document.getElementById("vezes").innerHTML = html;
    // }


    var dia1 = document.getElementById('data').value;
    var dia = new Date(dia1);

    var data = {   
        mes: mes,
        valor: valor,
        nome: nome,
        categoria: categoria,
        data: dia
    };

    fetch('http://localhost:3000/contas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => { 
            document.getElementById('valor').value = "";
            document.getElementById('data').value = "";
            document.getElementById('nome').value = "";
            document.getElementById('descricao').value = "";
            document.getElementById('categoria').value = "";
            document.getElementById('inserido').innerHTML = "Inserido com sucesso!";
        }
    )
        .catch((error) => {
            document.getElementById('inserido').innerHTML = "Erro ao inserir!";
        }
    );
}

function mostrar() {
    
    var mes = document.getElementById('mes').value;


    fetch('http://localhost:3000/contas/all/' + mes, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            var total = 0;
            var html = "<table border='1|1'>";
            html += "<tr>";
            html += "<th>Posição</th>";
            html += "<th>Nome</th>";
            html += "<th>Descrição</th>";
            html += "<th>Categoria</th>";
            html += "<th>Dia da compra</th>";
            html += "<th>Mês</th>";
            html += "<th>Valor</th>";
            html += "</tr>";
            for (var i = 0; i < data.length; i++) {
                var pos = i + 1;
                html += "<tr>";
                html += "<td>" + pos + "</td>";
                html += "<td>" + data[i].nome + "</td>";
                html += "<td>" + data[i].descricao + "</td>";
                html += "<td>" + data[i].categoria + "</td>";
                html += "<td>" + data[i].data.replace(/(\d*)-(\d*)-(\d*).*/, '$3/$2/$1'); + "</td>";
                html += "<td>" + data[i].mes + "</td>";
                html += "<td>" + data[i].valor + "</td>";
                html += "<td><button onclick='deletar(" + data[i].id + ", " + pos + ")'>Deletar</button></td>";
                html += "<td><button onclick='edit(" + data[i].id + ", \"" + data[i].mes + "\", " + data[i].valor + ", \"" + data[i].data + "\")'>Editar</button></td>";
                html += "</tr>";
                
                total += data[i].valor;
            }
            html += "</table>";
            html += "<br>";
            html += "<h1>Total: " + total + "</h1>";
            document.getElementById("demo").innerHTML = html;
            document.getElementById("atualizar").innerHTML = "";
        }
    )
        .catch((error) => {

            console.error('Error:', error);
        }
    );

}

function edit(id, mes, valor, data) {    
    var html = "<form>";
    html += "<select id='mes2' onchange='showDate2()'> <option value='" + mes + "'>" + mes + "</option>";
    if (mes != "janeiro") {
        html += "<option value='janeiro'>janeiro</option>";
    }
    if (mes != "fevereiro") {
        html += "<option value='fevereiro'>fevereiro</option>";
    }
    if (mes != "marco") {
        html += "<option value='marco'>marco</option>";
    }
    if (mes != "abril") {
        html += "<option value='abril'>abril</option>";
    }
    if (mes != "maio") {
        html += "<option value='maio'>maio</option>";
    }
    if (mes != "junho") {
        html += "<option value='junho'>junho</option>";
    }
    if (mes != "julho") {
        html += "<option value='julho'>julho</option>";
    }
    if (mes != "agosto") {
        html += "<option value='agosto'>agosto</option>";
    }
    if (mes != "setembro") {
        html += "<option value='setembro'>setembro</option>";
    }
    if (mes != "outubro") {
        html += "<option value='outubro'>outubro</option>";
    }
    if (mes != "novembro") {
        html += "<option value='novembro'>novembro</option>";
    }
    if (mes != "dezembro") {
        html += "<option value='dezembro'>dezembro</option>";
    }
    html += "</select><br>";

    html += "<input type='text' id='valor2' value='" + valor + "'><br>";
    html += "<input type='date' id='data2' value='" + data.slice(0, 10) + "'><br>";
    html += "</form>";
    html += "<button onclick='atualizar(" + id + ", \"atualizar\")'>Atualizar</button>";

    document.getElementById("atualizar").innerHTML = html;

}

function deletar(id, pos) {
    if (window.confirm("Você tem certeza que deseja apagar o " + pos + "º item?")){
        atualizar(id, "deletar");
    }
}


function atualizar(id, acao) {

    if (acao == "atualizar") {
        var mes = document.getElementById('mes2').value;
        var valor = document.getElementById('valor2').value;
        valor = parseFloat(valor);

        var dia1 = document.getElementById('data2').value;
        var dia = new Date(dia1);

        var data = {
            mes: mes,
            valor: valor,
            data: dia
        };

        fetch('http://localhost:3000/contas/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                document.getElementById('atualizar').innerHTML = ""
                mostrar();

            }
            )
            .catch((error) => {
                console.error('Error:', error);
            }
            );
    }
    else {
        fetch('http://localhost:3000/contas/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                document.getElementById('atualizar').innerHTML = ""
                mostrar();

            }
            )
            .catch((error) => {
                console.error('Error:', error);
            }
            );

    }

}

function showDate(){
    var data = new Date();
    var dia = data.getDate();

    if(document.getElementById('mes').value == "janeiro"){
        var mes = 1;
    }
    else if(document.getElementById('mes').value == "fevereiro"){
        var mes = 2;
    }
    else if(document.getElementById('mes').value == "marco"){
        var mes = 3;
    }
    else if(document.getElementById('mes').value == "abril"){
        var mes = 4;
    }
    else if(document.getElementById('mes').value == "maio"){
        var mes = 5;
    }
    else if(document.getElementById('mes').value == "junho"){
        var mes = 6;
    }
    else if(document.getElementById('mes').value == "julho"){
        var mes = 7;
    }
    else if(document.getElementById('mes').value == "agosto"){
        var mes = 8;
    }
    else if(document.getElementById('mes').value == "setembro"){
        var mes = 9;
    }
    else if(document.getElementById('mes').value == "outubro"){
        var mes = 10;
    }
    else if(document.getElementById('mes').value == "novembro"){
        var mes = 11;
    }
    else {
        var mes = 12;
    }



    var ano = data.getFullYear();

    if (dia.toString().length == 1) {
        dia = "0" + dia;
    }
    if (mes.toString().length == 1) {
        mes = "0" + mes;
    }

    var dataAtual = ano + "-" + mes + "-" + dia;
    document.getElementById('data').value = dataAtual;

    if(mes == 2){
        document.getElementById('data').max = ano + "-" + mes + "-" + '28';
    }
    else if(mes == 4 || mes == 6 || mes == 9 || mes == 11){
        document.getElementById('data').max = ano + "-" + mes + "-" + '30';
    }
    else{
        document.getElementById('data').max = ano + "-" + mes + "-" + '31';
    }

}

function showDate2(){
    var data = document.getElementById('data2').value;
    var dia = data.slice(8, 10);
    var ano = data.slice(0, 4);

    if(document.getElementById('mes2').value == "janeiro"){
        var mes = 1;
    }
    else if(document.getElementById('mes2').value == "fevereiro"){
        var mes = 2;
    }
    else if(document.getElementById('mes2').value == "marco"){
        var mes = 3;
    }
    else if(document.getElementById('mes2').value == "abril"){
        var mes = 4;
    }
    else if(document.getElementById('mes2').value == "maio"){
        var mes = 5;
    }
    else if(document.getElementById('mes2').value == "junho"){
        var mes = 6;
    }
    else if(document.getElementById('mes2').value == "julho"){
        var mes = 7;
    }
    else if(document.getElementById('mes2').value == "agosto"){
        var mes = 8;
    }
    else if(document.getElementById('mes2').value == "setembro"){
        var mes = 9;
    }
    else if(document.getElementById('mes2').value == "outubro"){
        var mes = 10;
    }
    else if(document.getElementById('mes2').value == "novembro"){
        var mes = 11;
    }
    else {
        var mes = 12;
    }

    if (mes.toString().length == 1) {
        mes = "0" + mes;
    }
    
    var dataAtual = ano + "-" + mes + "-" + dia;
    document.getElementById('data2').value = dataAtual;

    document.getElementById('data2').min = ano + "-" + mes + "-" + '01';
    if(mes == 2){
        document.getElementById('data2').max = ano + "-" + mes + "-" + '28';
    }
    else if(mes == 4 || mes == 6 || mes == 9 || mes == 11){
        document.getElementById('data2').max = ano + "-" + mes + "-" + '30';
    }
    else{
        document.getElementById('data2').max = ano + "-" + mes + "-" + '31';
    }

}

// Comparativo do seu gasto com o mes atual, pedir input ao inserir gastos e mostrar um botao editar do lado do valor que ele tem como caixa
// Colocar se é fixo e variavel
// Fixo -> pede o valor
// Variavel -> pedir o valor e qnts meses ele passou