export const compareStates = (previousState: any, nextState: any) => {
    previousState = { ...previousState };
    nextState = { ...nextState };
    const result = [];
    const previousFileNames = previousState.fileNames;
    const nextFileNames = nextState.fileNames;

    // File removed
    if (previousFileNames.length > nextFileNames.length) {
        const deletedFileName = previousFileNames
            .filter((fileName: string) => nextFileNames.indexOf(fileName) === -1);
        result.push({
            fileName: deletedFileName,
            status: 'removed',
        });

        previousState = {
            ...previousState,
            fileNames: previousState.fileNames
                .filter((fileName: string) => deletedFileName.indexOf(fileName) === -1),
            files: previousState.files
                .filter((file: any) => deletedFileName.indexOf(file.fileName) === -1),
        };
    }

    // File added
    if (previousFileNames.length < nextFileNames.length) {
        const addedFileName = nextFileNames
            .filter((fileName: string) => previousFileNames.indexOf(fileName) === -1);
        result.push({
            fileName: addedFileName,
            status: 'added',
        });

        nextState = {
            ...nextState,
            fileNames: nextState.fileNames
                .filter((fileName: string) => addedFileName.indexOf(fileName) === -1),
            files: nextState.files
                .filter((file: any) => addedFileName.indexOf(file.fileName) === -1),
        };
    }

    const previousFiles = previousState.files.sort((a: any, b: any) => a.fileName > b.fileName);
    const nextFiles = nextState.files.sort((a: any, b: any) => a.fileName > b.fileName);

    const modifiedFiles = previousFiles
        .filter((file: any, index: number) =>
            Buffer.compare(file.fileContent, nextFiles[index].fileContent) !== 0);

    if (modifiedFiles.length > 0) {
        result.push({ status: 'modified', files: modifiedFiles });
    }

    return result;

};
