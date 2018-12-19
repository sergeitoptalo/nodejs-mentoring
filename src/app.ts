import appConfig from './config/appConfig.json';
import DirWatcher from './DirWatcher/DirWatcher';
import Importer from './Importer/Importer';
import { Product, User } from './models';

console.log(appConfig.name);

new User();
new Product();

const watcher = new DirWatcher();
const importer = new Importer();
watcher.watch('./src/data', 2000);
watcher.on('changed', (importConfig) => {
    importer.import(importConfig)
        .then((data) => {
            data.forEach((file) => console.log(file));
        })
        .catch((error) => console.log(error));

    /* --- Sync import ---
    const data = importer.importSync(importConfig)
    data.forEach((file) => console.log(file));
    */
});
