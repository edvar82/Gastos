
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
    html += "<select id='mes2'> <option value='" + mes + "'>" + mes + "</option>";

    html += "<option value='janeiro'>janeiro</option>";
    html += "<option value='fevereiro'>fevereiro</option>";
    html += "<option value='março'>março</option>";
    html += "<option value='abril'>abril</option>";
    html += "<option value='maio'>maio</option>";
    html += "<option value='junho'>junho</option>";
    html += "<option value='julho'>julho</option>";
    html += "<option value='agosto'>agosto</option>";
    html += "<option value='setembro'>setembro</option>";
    html += "<option value='outubro'>outubro</option>";
    html += "<option value='novembro'>novembro</option>";
    html += "<option value='dezembro'>dezembro</option>";
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



