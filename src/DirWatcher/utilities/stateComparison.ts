import { IComparisonResult, IFileState, IFolderContent } from '../models/DirWatcherState';

export const compareStates = (previousState: IFolderContent, nextState: IFolderContent) => {
    previousState = { ...previousState };
    nextState = { ...nextState };
    const result: IComparisonResult[] = [];
    const previousFileNames = previousState.fileNames;
    const nextFileNames = nextState.fileNames;

    // File removed
    if (previousFileNames.length > nextFileNames.length) {
        const deletedFileName = previousFileNames
            .filter((fileName: string) => nextFileNames.indexOf(fileName) === -1);

        deletedFileName.forEach((fileName: string) => {
            result.push({
                fileName,
                status: 'removed',
            });
        });

        previousState = {
            ...previousState,
            fileNames: previousState.fileNames
                .filter((fileName: string) => deletedFileName.indexOf(fileName) === -1),
            files: previousState.files
                .filter((file: IFileState) => deletedFileName.indexOf(file.fileName) === -1),
        };
    }

    // File added
    if (previousFileNames.length < nextFileNames.length) {
        const addedFileName = nextFileNames
            .filter((fileName: string) => previousFileNames.indexOf(fileName) === -1);
        addedFileName.forEach((fileName: string) => {
            result.push({
                fileName,
                status: 'added',
            });
        });

        nextState = {
            ...nextState,
            fileNames: nextState.fileNames
                .filter((fileName: string) => addedFileName.indexOf(fileName) === -1),
            files: nextState.files
                .filter((file: IFileState) => addedFileName.indexOf(file.fileName) === -1),
        };
    }

    const previousFiles = previousState.files.sort((a: any, b: any) => a.fileName - b.fileName);
    const nextFiles = nextState.files.sort((a: any, b: any) => a.fileName - b.fileName);

    const modifiedFiles = previousFiles
        .filter((file: IFileState, index: number) =>
            Buffer.compare(file.fileContent, nextFiles[index].fileContent) !== 0);

    if (modifiedFiles.length > 0) {
        modifiedFiles.forEach((file: IFileState) => {
            result.push({ fileName: file.fileName, status: 'modified' });
        });
    }

    return result;

};
