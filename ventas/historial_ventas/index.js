const express = require('express')
const cors = require('cors')
const app = express()

const port = process.env.PORT || 3006

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.get('/api/ventas/historial_ventas', (req, res) => {
    try{
        // Start y end con formato YYYY-MM-DD
        const { uid, start, end } = req.query
        if (!uid) {
            res.status(400).send({
                status: 400,
                message: 'Bad request'
            })
            return
        }

        let message = start && end ? `Resultados desde ${start} hasta ${end}` : 'Todos los resultados'
        // Respuesta de la base de datos usando uid BETWEEN start y end
        const items = [
            {
                id: Date.now().toString(36) + Math.random().toString(36).slice(2),
                date: '2022-07-29',
                items: [{
                    id: 'SEDAN-300445321',
                    model: 'Toyota Corolla',
                    brand: 'Toyota',
                    description: 'Sedán Toyota semi nuevo con el cual podrás recorrer la ciudad con estilo',
                    date: '2022-07-29',
                    price: 110000
                }],
                total: 110000,
            },
            {
                id: Date.now().toString(36) + Math.random().toString(36).slice(2),
                date: '2021-4-17',
                items: [{
                        id: 'HATCHBACK-300445321',
                        model: 'Toyota Hatchback',
                        brand: 'Toyota',
                        description: 'Toyota Hatchback estilo juvenil semi nuevo con el cual podrás recorrer la ciudad sin problemas',
                        date: '2021-07-29',
                        price: 150000
                    }],
                total: 150000,
            },
            {
                id: Date.now().toString(36) + Math.random().toString(36).slice(2),
                date: '2020-11-06',
                items: [{
                        id: 'TESLA-300445321',
                        model: 'Model S',
                        brand: 'Tesla',
                        description: 'Tesla modelo S completamente eléctrico para que puedas rodar en la ciudad con alta tecnología',
                        date: '2020-07-29',
                        price: 250000
                    }],
                total: 250000,
            }
        ]
        res.status(200).send({
            status: 200,
            message,
            items,
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