const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  // TO DO: implement POST logic
});

router.get('/', (req, res) => {
  res.json({ operation_code: 1 });
});

module.exports = router;
const userInfo = {
    fullname: 'john_doe',
    email: 'john@xyz.com',
    roll_number: 'ABCD123',
    dob: '17091999'
  };
  
  function extractData(data) {
    const numbers = [];
    const alphabets = [];
    let highestAlphabet = '';
  
    data.forEach((item) => {
      if (!isNaN(item)) {
        numbers.push(item);
      } else if (/[a-zA-Z]/.test(item)) {
        alphabets.push(item);
        if (item.toLowerCase() > highestAlphabet.toLowerCase()) {
          highestAlphabet = item;
        }
      }
    });
  
    return { numbers, alphabets, highestAlphabet };
  }
  
  router.post('/', (req, res) => {
    try {
      const { data } = req.body;
      if (!data || !Array.isArray(data)) {
        throw new Error('Invalid request body');
      }
  
      const { numbers, alphabets, highestAlphabet } = extractData(data);
      const userId = `${userInfo.fullname}_${userInfo.dob}`;
  
      res.json({
        is_success: true,
        user_id: userId,
        email: userInfo.email,
        roll_number: userInfo.roll_number,
        numbers,
        alphabets,
        highest_alphabet: [highestAlphabet]
      });
    } catch (error) {
      res.status(400).json({ is_success: false, error: error.message });
    }
  });