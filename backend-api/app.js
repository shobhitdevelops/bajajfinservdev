const express = require('express');
const app = express();

app.use(express.json());

const userId = 'john_doe_17091999';
const email = 'john@xyz.com';
const rollNumber = 'ABCD123';

app.post('/bfhl', (req, res) => {
  const { data } = req.body;
  const numbers = [];
  const alphabets = [];
  let highestAlphabet = [];

  data.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else {
      alphabets.push(item);
      if (item.toUpperCase() > highestAlphabet[0]?.toUpperCase()) {
        highestAlphabet = [item];
      } else if (item.toUpperCase() === highestAlphabet[0]?.toUpperCase()) {
        highestAlphabet.push(item);
      }
    }
  });

  res.json({
    is_success: true,
    user_id: userId,
    email,
    roll_number: rollNumber,
    numbers,
    alphabets,
    highest_alphabet: highestAlphabet,
  });
});

app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});