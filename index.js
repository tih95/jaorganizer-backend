const app = require('./app');
const { PORT } = require('./utils/config');

// starting server
app.listen(PORT,  () => {
  console.log(`server running on port ${PORT}`);
})