import express, { request } from 'express';
import mongoose from 'mongoose';
import Cards from './dbCards.js';
import Cors from 'cors';

// Add config
const app = express();
const port = process.env.PORT || 8001;
const connection_url =
  'mongodb+srv://admin:IDbOF717hWQ7zjHx@cluster0.nhdh0.mongodb.net/kinderdb?retryWrites=true&w=majority';

// Middleware
app.use(express.json());
app.use(Cors());

// DB config
mongoose.connect(connection_url, {
  useNewUrlParcer: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// API Endpoints
app.get('/', (req, res) => res.status(200).send('Hello There from Express!'));

app.post('/kinder/cards', (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get('/kinder/cards', (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));
