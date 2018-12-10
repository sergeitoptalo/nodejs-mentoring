import EventEmitter from 'events';
import fs from 'fs';
import { promisify } from 'util';

interface IDirWatcherState {
    path: string | null;
    delay: number;
    dirState: string[];
    filesState: any;
    initializing: boolean;
    timers: any;
}

export default class DirWatcher extends EventEmitter {
    private state: IDirWatcherState;

    constructor() {
        super();
        this.state = {
            delay: 0,
            dirState: [],
            filesState: [],
            initializing: false,
            path: null,
            timers: [],
        };
    }

    public watch(path: string, delay: number) {
        this.init(path, delay)
            .then((data: any) => {
                this.state.initializing = false;
                console.log(this.state);
                this.getNewState()
                .then((newState) => this.detectStateChanges(this.state, newState));
            })
            .catch((err: any) => {
                console.log(err);
            });
    }

    private init(path: string, delay: number) {
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
                        this.state.dirState = data;
                    }
                    resolve(data);
                }
            });
        });
    }

    private readFiles(data: any) {
        const filePromises: any = [];
        data.forEach((fileName: string) => {
            filePromises.push(new Promise((resolve, reject) => {
                fs.readFile(this.state.path + '/' + fileName, (err, fileContent) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (this.state.initializing) {
                            this.state.filesState.push(fileContent);
                        }
                        resolve(data);
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

    private detectStateChanges(previousState: any, newState: any) {
        console.log('Changes detected');
    }
}
