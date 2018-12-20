import EventEmitter from 'events';
import fs from 'fs';
import { promisify } from 'util';
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
        const getFilesList = promisify(fs.readdir);
        return getFilesList(this.state.path)
            .then((filesList: string[]) => filesList)
            .catch((error: string) => console.log(error));
    }

    private readFiles(fileNames: string[]) {
        const filePromises: any = [];
        const getFilesContent = promisify(fs.readFile);

        fileNames.forEach((fileName: string) => {
            filePromises.push(
                getFilesContent(`${this.state.path}/${fileName}`)
                    .then((fileContent: Buffer) => ({
                        fileContent,
                        fileName,
                    }))
                    .catch((error) => console.log(error)),
            );
        });

        return Promise.all(filePromises);
    }

    private getNewFolderState() {
        let newFolderState: string[] = [];
        let newFilesState = [];

        return this.readDirectory()
            .then((fileList: string[]) => {
                newFolderState = fileList;
                return this.readFiles(fileList);
            })
            .then((files) => {
                newFilesState = files;
                return {
                    fileNames: newFolderState,
                    files: newFilesState,
                };
            })
            .catch((error) => console.log(error));
    }

    private detectChanges() {
        this.getNewFolderState()
            .then((newFolderState: any) => {
                const changes = compareStates(this.state.folderContent, newFolderState);
                this.state = {
                    ...this.state,
                    folderContent: newFolderState,
                };

                if (changes.length) {
                    this.emit('changed', {
                        changes,
                        path: this.state.path,
                    });
                }
            });
    }
}
