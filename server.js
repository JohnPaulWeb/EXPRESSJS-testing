const express = require('express');
const app = express();


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening  on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello, Express!');
  });

  const data = [
    { id: 1, name: 'Item1' },
    { id: 2, name: 'Item2' },
    { id: 3, name: 'Item3' }, 
  ]


  app.use(express.json());

  app.post('/items', (req, res) => {
    const newItem = req.body;
    data.push(newItem);
    res.status(201).json(newItem);
  });

  app.get('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = data.find((item) => item.id === id);
    if (!item) {
        res.status(404).json({ error: 'Item not Found' });
    } else {
        res.json(item);
    }
  });

  app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedItem = req.body;
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) {
        res.status(404).json({ error: 'Item not found' });
    } else {
        data[index] = { ...data[index], ...updatedItem };
        res.json(data[index]);
    }
  });

  app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) {
        res.status(404).json({ error: 'Item not found' });
    } else {
        const deletedItem = data.splice(index, 1);
        res.json(deletedItem[0]);
    }
  })