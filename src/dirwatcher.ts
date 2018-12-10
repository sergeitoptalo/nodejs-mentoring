import EventEmitter from 'events';
import fs from 'fs';
import { compareStates } from './utilities/comparison';

interface IDirWatcherState {
    path: string | null;
    delay: number;
    folderContent: {
        fileNames: string[],
        files: Buffer[],
    };
    initializing: boolean;
    timers: WindowTimers[];
}

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
            initializing: false,
            path: null,
            timers: [],
        };
    }

    public watch(path: string, delay: number) {
        this.init(path, delay)
            .then((data: any) => {
                this.state.initializing = false;
                // add timer
            })
            .catch((err: any) => {
                console.log(err);
            });
    }

    private async init(path: string, delay: number) {
        this.state.path = path;
        this.state.delay = delay;
        this.state.initializing = true;

        return this.readDirectory().then((data) => this.readFiles(data));
    }

    private readDirectory() {
        return new Promise((resolve, reject) => {
            fs.readdir(this.state.path, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    if (this.state.initializing) {
                        this.state.folderContent.fileNames = data;
                    }
                    resolve(data);
                }
            });
        });
    }

    private readFiles(files: any) {
        const filePromises: any = [];
        files.forEach((fileName: string) => {
            filePromises.push(new Promise((resolve, reject) => {
                fs.readFile(`${this.state.path}/${fileName}`, (err, fileContent) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (this.state.initializing) {
                            this.state.folderContent.files.push(fileContent);
                        }
                        resolve(fileContent);
                    }
                });
            }));
        });

        return Promise.all(filePromises);
    }

    private getNewState() {
        let newDirState: any = [];
        let newFilesState: any = [];

        return this.readDirectory()
            .then((data: any) => {
                newDirState = data;
            })
            .then((directoryContent) => {
                this.readFiles(directoryContent)
                    .then((files: any) => {
                        newFilesState = files;
                    });
            })
            .then(() => {
                return {
                    dirState: newDirState,
                    filesState: newFilesState,
                };
            });
    }

    private detectChanges() {
        this.getNewState()
        .then((newState) => {
            compareStates(this.state.folderContent, newState);
        });
    }
}
