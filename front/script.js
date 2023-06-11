
function enviar() {
    var mes = document.getElementById('mes').value;
    var valor = document.getElementById('valor').value;
    valor = parseFloat(valor);

    var dia1 = document.getElementById('data').value;
    var dia = new Date(dia1);

    var data = {
        mes: mes,
        valor: valor,
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
            console.log('Success:', data);
            var total = 0;
            var html = "<table border='1|1'>";
            html += "<tr>";
            html += "<th>Posição</th>";
            html += "<th>Dia da compra</th>";
            html += "<th>Mês</th>";
            html += "<th>Valor</th>";
            html += "</tr>";
            for (var i = 0; i < data.length; i++) {
                var pos = i + 1;
                html += "<tr>";
                html += "<td>" + pos + "</td>";
                html += "<td>" + data[i].data.replace(/(\d*)-(\d*)-(\d*).*/, '$3/$2/$1'); + "</td>";
                html += "<td>" + data[i].mes + "</td>";
                html += "<td>" + data[i].valor + "</td>";
                html += "<td><button>Deletar</button></td>";
                html += "<td><button onclick='edit(" + data[i].id  + data[i].mes +")'>Editar</button></td>";
                html += "</tr>";
                
                total += data[i].valor;
            }
            html += "</table>";
            html += "<br>";
            html += "<h1>Total: " + total + "</h1>";
            document.getElementById("demo").innerHTML = html;
        }
    )
        .catch((error) => {

            console.error('Error:', error);
        }
    );

}

function edit(id, mes) {    
    var html = "<form>";
    html += "<label for='mes'>Mês:</label>";
    html += "<input type='text' id='mes' name='mes' value='" + mes + "'><br><br>";
    html += "<label for='valor'>Valor:</label>";
    html += "<input type='text' id='valor' name='valor'><br><br>";
    html += "<label for='data'>Data:</label>";
    html += "<input type='date' id='data' name='data'><br><br>";
    html += "<button onclick='atualizar(" + id + ")'>Atualizar</button>";
    html += "</form>";
    document.getElementById("atualizar").innerHTML = html;

}



