const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        name: "saif",
        University: "ISET SOUSSE"
    });
})

const port = 3000;
app.listen(port, () => {
    console.log(`[+]App is running on PORT: ${port}`);
})