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
            })
            .catch((err: any) => {
                console.log(err);
            });
    }

    private init(path: string, delay: number) {
        this.state.path = path;
        this.state.delay = delay;
        this.state.initializing = true;

        return this.readDirectory().then(() => this.readFiles());
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

    private readFiles() {
        const filePromises: any = [];
        this.state.dirState.forEach((fileName: string) => {
            filePromises.push(new Promise((resolve, reject) => {
                fs.readFile(this.state.path + '/' + fileName, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (this.state.initializing) {
                            this.state.filesState.push(data);
                        }
                        resolve(data);
                    }
                });
            }));
        });

        return Promise.all(filePromises);
    }
}
