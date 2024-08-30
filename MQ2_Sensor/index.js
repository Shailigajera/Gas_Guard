import express from 'express';
import axios from 'axios';
import { config } from 'dotenv';
config();

const app = express();
const port = 5500;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://api.thingspeak.com/channels/2525394/feeds.json?api_key=LYTGWKDDMMHGSTHD&results=2');
    const data = response.data.feeds;

    const lpgData = data.map(feed => ({ x: feed.created_at, y: parseFloat(feed.field1) }));
    const co2Data = data.map(feed => ({ x: feed.created_at, y: parseFloat(feed.field2) }));
    const alcoholData = data.map(feed => ({ x: feed.created_at, y: parseFloat(feed.field3) }));
    const smokeData = data.map(feed => ({ x: feed.created_at, y: parseFloat(feed.field4) }));

    res.render('index', { lpgData, co2Data, alcoholData, smokeData });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
