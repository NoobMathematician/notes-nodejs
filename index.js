const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())

let notes = [
    {
      "id": "1",
      "content": "HTML is easy",
      "important": true
    },
    {
      "content": "1569432",
      "important": true,
      "id": "2"
    },
    {
      "content": "154",
      "important": false,
      "id": "3"
    },
    {
      "content": "7562",
      "important": true,
      "id": "4"
    },
    {
      "content": "713",
      "important": true,
      "id": "5"
    },
    {
      "content": "hoang new note",
      "important": true,
      "id": "6"
    },
    {
      "id": "7",
      "content": "friday",
      "important": false
    }
  ]


const generateId = () => {
    const maxId = notes.length > 0 
        ? Math.max(...notes.map(note => Number(note.id)))
        : 0
    return String(maxId + 1)
}


app.get('/api/notes', (request, response) => {
    response.json(notes)
})


app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note =>  note.id == id)
    
    if(note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
    
})

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

app.post('/api/notes', (request, response) => {
    const body = request.body

    if(!body.content) {
        return response.status(400).json({
            error: "content missing"
        })
    }

    const note  = {
        content: body.content,
        important: Boolean(body.important) || false,
        id: generateId()
    }

    notes = notes.concat(note)
    response.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `)
})