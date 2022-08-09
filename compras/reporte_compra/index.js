const express = require('express')
const cors = require('cors')
const app = express()

const port = process.env.PORT || 3004

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.get('/api/compras/historial_compras', (req, res) => {
    try{
        // Start y end con formato YYYY-MM-DD
        const { id } = req.query
        if (!id) {
            res.status(400).send({
                status: 400,
                message: 'Bad request'
            })
            return
        }
        // Respuesta de la base de datos usando uid BETWEEN start y end
        const item = {
            id,
            date: '2022-07-29',
            uid: 'user' + Date.now().toString(36) + Math.random().toString(36).slice(2),
            method: 'DEBIT CARD',
            items: [{
                id: 'SEDAN-300445321',
                model: 'Toyota Corolla',
                brand: 'Toyota',
                description: 'Sedán Toyota semi nuevo con el cual podrás recorrer la ciudad con estilo',
                date: '2022-07-29',
                status: 'AVAILABLE',
                sellState: 'Defectuoso',
                provider: 'Subasta',
                costPrice: 100000
            }],
            total: 110000,
        }
        res.status(200).send({
            status: 200,
            item,
        })
    } catch (e) {
     res.status(500).send({
         status: 500,
         message: 'Internal server error',
     })
    }
  })

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })