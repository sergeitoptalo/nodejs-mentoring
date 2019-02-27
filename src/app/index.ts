import app from './app';
import { connectToDatabase } from './db';

const port = process.env.PORT || 8080;

connectToDatabase()
    .then(() => {
        app.listen(port, () => console.log(`App listening on port ​${port}​!`));
    });
