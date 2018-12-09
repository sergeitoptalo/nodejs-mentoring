import appConfig from './config/appConfig.json';
import DirWatcher from './dirwatcher';
import Importer from './importer';
import { Product, User } from './models';

console.log(appConfig.name);

new User();
new Product();

const watcher = new DirWatcher();
const importer = new Importer();
watcher.watch('./src/data', 2000);
watcher.on('changed', () => importer.import());
