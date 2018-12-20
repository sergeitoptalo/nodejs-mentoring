export interface IDirWatcherState {
    path: string;
    delay: number;
    folderContent: {
        fileNames: string[],
        files: Array<{
            fileName: string,
            fileContent: Buffer,
        }>,
    };
    timers: WindowTimers[];
}

export interface IFileState {
    fileContent: Buffer;
    fileName: string;
}

export interface IFolderContent {
    files: IFileState[];
    fileNames: string[];
}

export interface IComparisonResult {
    fileName: string;
    fileContent?: {
        [key: string]: string,
    };
    status: string;
}
