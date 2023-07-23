const mongoose = require('mongoose');


const mongoURI = 'mongodb://localhost:27017/E-commerce';
const connectDatabase =  () => {
// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Mongodb connected with server: ${data.connection.host}');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
}
module.exports = connectDatabase