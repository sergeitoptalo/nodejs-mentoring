import csvjson from 'csvjson';
import fs from 'fs';
import { IComparisonResult } from '../DirWatcher/models/DirWatcherState';

interface IImporterState {
    imported: boolean;
}

interface IImportConfig {
    path: string;
    changes: Array<{
        fileName: string[],
        status: string,
    }>;
}

export interface IFolderChange {
    fileName: string;
    status: string;
}

export default class Importer {
    public import(importConfig: IImportConfig) {
        const filePromises: Array<Promise<IComparisonResult>> = [];
        importConfig.changes.forEach((change: any) => {
            if (change.status !== 'removed') {
                filePromises.push(new Promise<IComparisonResult>((resolve, reject) => {
                    fs.readFile(
                        `${importConfig.path}/${change.fileName}`,
                        { encoding: 'utf8' },
                        (err, fileContent) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve({
                                    fileContent: csvjson.toObject(fileContent)[0],
                                    fileName: change.fileName,
                                    status: change.status,
                                });
                            }
                        });
                }));
            } else {
                filePromises.push(Promise.resolve({
                    fileName: change.fileName,
                    status: change.status,
                }));
            }
        });

        return Promise.all(filePromises);
    }

    public importSync(importConfig: IImportConfig) {
        const importResult = importConfig.changes.map((change: any) => {
            if (change.status !== 'removed') {
                const fileData = fs.readFileSync(
                    `${importConfig.path}/${change.fileName}`,
                    { encoding: 'utf8' },
                );
                change.fileContent = csvjson.toObject(fileData)[0];
            }
            return change;
        });

        return importResult;
    }
}
