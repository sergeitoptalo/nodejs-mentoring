import { IComparisonResult, IFileState, IFolderContent } from '../models/DirWatcherState';

export const compareStates = (previousState: IFolderContent, nextState: IFolderContent) => {
    let result: IComparisonResult[] = [];
    const previousFileNames = previousState.fileNames;
    const nextFileNames = nextState.fileNames;

    // File removed
    if (previousFileNames.length > nextFileNames.length) {
        const deletedFileName = previousFileNames
            .filter((fileName: string) => !nextFileNames.includes(fileName));

        result = deletedFileName.map((fileName: string) => ({
            fileName,
            status: 'removed',
        }));

        previousState = {
            ...previousState,
            fileNames: previousState.fileNames
                .filter((fileName: string) => !deletedFileName.includes(fileName)),
            files: previousState.files
                .filter((file: IFileState) => !deletedFileName.includes(file.fileName)),
        };
    }

    // File added
    if (previousFileNames.length < nextFileNames.length) {
        const addedFileName = nextFileNames
            .filter((fileName: string) => !previousFileNames.includes(fileName));
        result = addedFileName.map((fileName: string) => ({
            fileName,
            status: 'added',
        }));

        nextState = {
            ...nextState,
            fileNames: nextState.fileNames
                .filter((fileName: string) => !addedFileName.includes(fileName)),
            files: nextState.files
                .filter((file: IFileState) => !addedFileName.indexOf(file.fileName)),
        };
    }

    const previousFiles = previousState.files.sort((a: any, b: any) => a.fileName - b.fileName);
    const nextFiles = nextState.files.sort((a: any, b: any) => a.fileName - b.fileName);

    const modifiedFiles = previousFiles
        .filter((file: IFileState, index: number) =>
            Buffer.compare(file.fileContent, nextFiles[index].fileContent) !== 0);

    if (modifiedFiles.length > 0) {
        result = modifiedFiles
            .map((file: IFileState) => ({ fileName: file.fileName, status: 'modified' }));
    }

    return result;

};
