const app = require('./app');
const config = require('./utils/config');

// starting server
app.listen(config.PORT,  () => {
  console.log(`server running on port ${config.PORT}`);
})