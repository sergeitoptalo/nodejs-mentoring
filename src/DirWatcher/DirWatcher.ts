import EventEmitter from 'events';
import fs from 'fs';
import { IDirWatcherState, IFileState } from './models/DirWatcherState';
import { compareStates } from './utilities/stateComparison';

export default class DirWatcher extends EventEmitter {
    private state: IDirWatcherState;

    constructor() {
        super();
        this.state = {
            delay: 0,
            folderContent: {
                fileNames: [],
                files: [],
            },
            path: '',
            timers: [],
        };
    }

    public watch(path: string, delay: number) {
        this.state.path = path;
        this.state.delay = delay;
        setInterval(() => {
            this.detectChanges();
        }, this.state.delay);
    }

    private readDirectory() {
        return new Promise((resolve, reject) => {
            fs.readdir(this.state.path, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    private readFiles(fileNames: string[]) {
        const filePromises: Array<Promise<IFileState>> = [];
        fileNames.forEach((fileName: string) => {
            filePromises.push(new Promise<IFileState>((resolve, reject) => {
                fs.readFile(`${this.state.path}/${fileName}`, (err, fileContent) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            fileContent,
                            fileName,
                        });
                    }
                });
            }));
        });

        return Promise.all(filePromises);
    }

    private getNewFolderState() {
        let newFolderState: string[] = [];
        let newFilesState: IFileState[] = [];

        return this.readDirectory().then((fileNames: string[]) => {
            newFolderState = fileNames;
            return this.readFiles(fileNames);
        })
            .then((files) => {
                newFilesState = files;
                return {
                    fileNames: newFolderState,
                    files: newFilesState,
                };
            });

    }

    private detectChanges() {
        this.getNewFolderState()
            .then((newFolderState) => {
                const changes = compareStates(this.state.folderContent, newFolderState);
                this.state = {
                    ...this.state,
                    folderContent: newFolderState,
                };

                if (changes.length > 0) {
                    this.emit('changed', {
                        changes,
                        path: this.state.path,
                    });
                }
            });
    }
}
