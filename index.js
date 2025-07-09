import { connectDb } from './src/db/index.js';
import app from './app.js';

connectDb()
  .then(() => {
    app.on('error', function (error) {
      console.log('Error on setting server: ' + error);
    });

    app.listen(3000, function () {
      console.log('Server started on port 3000');
    });
  })
  .catch((err) => {
    console.error('Failed to connect to the database:', err);
  });