const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

connectDB()
  .then(() => console.log('MongoDB connected'))
  .catch((error) => {
    console.warn(`MongoDB connection skipped: ${error.message}`);
  })
  .finally(startServer);
