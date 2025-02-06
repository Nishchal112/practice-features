const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Sample poll data
let poll = {
    question: "What's your favorite programming language?",
    options: ["JavaScript", "Python", "C++"],
    responses: []
};

// Route to render the poll
app.get('/', (req, res) => {
    // Count votes for each option
    let voteCounts = poll.options.map(option => ({
        option,
        count: poll.responses.filter(response => response.option === option).length
    }));

    res.render('index', { poll, voteCounts });
});

// Route to handle voting
app.post('/vote', (req, res) => {
    const { userId, selectedOption } = req.body;
    
    if (userId && selectedOption) {
        poll.responses.push({ userId, option: selectedOption });
    }

    res.redirect('/');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
