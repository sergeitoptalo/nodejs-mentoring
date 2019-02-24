import app from './app';
//import models from './db/models';
import { connectToDatabase } from './db';

const port = process.env.PORT || 8080;

connectToDatabase()
    .then(() => {
        // models.sequelize.sync()
        //   .then(function () {
        app.listen(port, () => console.log(`App listening on port ​${port}​!`));
        //  });

    });
