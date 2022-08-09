const express = require('express')
const cors = require('cors')
const app = express()

const port = process.env.PORT || 3001

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.post('/api/compras/realizar_compra', (req, res) => {
    try{
      const { uid, items, total } = req.body
      if (!uid || !items || items.length === 0 || !total) {
        res.status(400).send({
            status: 400,
            message: 'Bad request'
        })
        return
      }
      items.forEach(element => {
        // Consulta con la base de datos para realizar los cambios de estados y descuentos que se necesiten
        element.status = 'SOLD'
      })
      res.status(200).send({
        status: 200,
        message: 'Compra realizada exitosamente',
        items,
        total,
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