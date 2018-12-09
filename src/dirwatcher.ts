import EventEmitter from 'events';
import fs from 'fs';
import { promisify } from 'util';

interface IDirWatcherState {
    path: string | null;
    delay: number;
    dirState: string[];
    filesState: any;
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
            path: null,
            timers: [],
        };
    }

    public watch(path: string, delay: number) {
        this.init(path, delay)
            .then((data: any) => {
                console.log(this.state);
            })
            .catch((err: any) => {
                console.log(err);
            });
    }

    private init(path: string, delay: number) {
        this.state.path = path;
        this.state.delay = delay;
        return new Promise((resolve, reject) => {
            fs.readdir(path, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    this.state.dirState = data;
                    resolve(data);
                }
            });
        });
    }

    private readDirectory(path: string) {
        fs.readdir(path, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                if (this.state.dirState.length !== data.length) {
                    this.state.dirState = data;
                    console.log('Changed');
                }
            }
        });
    }
}
