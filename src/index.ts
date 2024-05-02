import express from 'express'
import { createEvent, getMetrics} from './controllers/event-controller'
import { processEvent } from './services/consumers/processEvent'

const app = express()
const PORT = 3008

app.use(express.json())
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//HealthCheck
app.get('/', (_, res) => {
    res.status(200).send('[Health Check] Service Running')
})

//POST event
app.post('/events', (req, res) => createEvent(req, res))

//GET metrics
//domain - id - subdomain
app.get('/accounts/:accountId/event-summary', (req, res) =>  getMetrics(req, res))


app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`)
})

//Start Up consumers
processEvent().then(() => {
    console.log('########## Consumer is running')
  })
  
  