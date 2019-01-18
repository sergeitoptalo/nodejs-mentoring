import csvjson from 'csvjson';
import fs from 'fs';
import { promisify } from 'util';
import { IComparisonResult } from '../DirWatcher/models/DirWatcherState';
import * as importerInterfaces from './models/ImporterState';

export default class Importer {
    public import(importConfig: importerInterfaces.IImportConfig) {
        let filePromises: Array<Promise<IComparisonResult>> = [];
        const getFileContent = promisify(fs.readFile);
        filePromises = importConfig.changes.map((change: any) => {
            if (change.status !== 'removed') {
                return getFileContent(
                    `${importConfig.path}/${change.fileName}`,
                    { encoding: 'utf8' },
                ).then((fileContent) => ({
                    fileContent: csvjson.toObject(fileContent),
                    fileName: change.fileName,
                    status: change.status,
                }));
            } else {
                return Promise.resolve({
                    fileName: change.fileName,
                    status: change.status,
                });
            }
        });

        return Promise.all(filePromises);
    }

    public importSync(importConfig: importerInterfaces.IImportConfig) {
        const importResult = importConfig.changes.map((change: any) => {
            if (change.status !== 'removed') {
                const fileData = fs.readFileSync(
                    `${importConfig.path}/${change.fileName}`,
                    { encoding: 'utf8' },
                );
                change.fileContent = csvjson.toObject(fileData);
            }
            return change;
        });

        return importResult;
    }

    public convertToJSON(data: Buffer | string) {
        return csvjson.toObject(data);
    }
}
