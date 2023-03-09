const cors = require('cors');
const express = require('express');
const { router } = require('./routers/v1/routers');

const app = express();

// Parse body to json
app.use(express.json());

// Cross origins enabled
app.use(cors());

app.use('/api/v1/books', router);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started running on port ${process.env.PORT || 3000}`);
});
