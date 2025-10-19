const express = require('express');
const path = require('path');
const app = express();
const PORT = 3303;

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, './public')));

// Optional endpoint to simulate backend confirmation after payment
app.get('/payment-success', (req, res) => {
  // This is where backend would handle confirmation
  console.log('Payment successful callback received');
  res.send('Payment confirmed by backend!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
