import express from 'express'

const app = express()
const port = 3008

app.use(express.json())

app.get('/', (_, res) => {
    res.status(200).send('[Health Check] Service Running')
} )

app.listen(port, () => { console.log(`Listening on port http://localhost:${port}`) })