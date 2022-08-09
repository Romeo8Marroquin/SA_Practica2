const express = require('express')
const cors = require('cors')
const app = express()

const port = process.env.PORT || 3001

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))


app.put('/api/compras/actualizar_compra', (req, res) => {
  try{
    const { id, items, total } = req.body
    if (!id || !items || items.length === 0 || !total) {
      res.status(400).send({
          status: 400,
          message: 'Bad request'
      })
      return
    }
    items.forEach(element => {
      // Consulta con la base de datos para realizar los cambios de estados de ventas antes y después del cambio
      element.status = 'AVAILABLE'
    })
    res.status(200).send({
      status: 200,
      message: 'Compra actualizada exitosamente',
      id,
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