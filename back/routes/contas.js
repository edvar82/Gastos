let express = require('express');
let app = express();
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

app.post('/', async (req, res) => {
    
    var mes = req.body.mes;
    var valor = req.body.valor;
    var data = req.body.data;

    const newConta = await prisma.contas.create({
        data: {
            mes: mes,
            valor: valor,
            data: data
        }
    });

    return res.json(newConta);

});

app.get('/all/:mes', async (req, res) => {

    var mes = req.params.mes;

    const user = await prisma.contas.findMany({
        where: {
            mes: mes,
        },
    });
    
    return res.json(user);

});

app.put('/:id', async (req, res) => {

    var id = req.params.id;
    var mes = req.body.mes;
    var valor = req.body.valor;
    var data = req.body.data;

    const user = await prisma.contas.update({
        where: {
            id: id,
        },
        data: {
            mes: mes,
            valor: valor,
            data: data
        },
    });

    return res.json(user);

});

app.delete('/:id', async (req, res) => {

    var id = req.params.id;

    const user = await prisma.contas.delete({
        where: {
            id: id,
        },
    });

    return res.json(user);

});

module.exports = app;