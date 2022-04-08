const express = require("express")

const app = express()


app.get('/', (req, res) => {
    res.send("Tracking your climbing made easy")
})

app.listen(process.env.PORT || 3000)
