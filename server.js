const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <h1>Number Processing Application</h1>
        <form action="/process" method="POST">
            <label for="number">Enter a number:</label>
            <input type="text" id="number" name="number" required>
            <button type="submit">Submit</button>
        </form>
    `);
});

app.post('/process', async (req, res) => {
    const number = req.body.number;

    try {
        const response = await axios.post('http://192.168.56.101:5000/process', {
            number: number
        });
        res.send(`<h1>Result:</h1><p>The square of ${number} is ${response.data.result}</p>`);
    } catch (error) {
        res.send(`<h1>Error:</h1><p>${error.response ? error.response.data.error : "Something went wrong"}</p>`);
    }
});

app.listen(3000, () => {
    console.log('Frontend running on port 3000');
});
