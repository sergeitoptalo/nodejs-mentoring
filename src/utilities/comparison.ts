export const compareStates = (previousState: any, nextState: any) => {
    const result = [];
    const previousFileNames = previousState.folderContent.fileNames;
    const nextFileNames = nextState.folderContent.fileNames;

    // File removed
    if (previousFileNames.length > nextFileNames.length) {
        const uniqueValue = new Set(previousFileNames.concat(nextFileNames));
        const deletedFileName = previousFileNames
            .filter((fileName: string) => !uniqueValue.has(fileName));
        result.push({
            fileName: deletedFileName,
            status: 'removed',
        });
    }

    // File added
    if (previousFileNames.length < nextFileNames.length) {
        const uniqueValue = new Set(previousFileNames.concat(nextFileNames));
        const addedFileName = nextFileNames
            .filter((fileName: string) => !uniqueValue.has(fileName));
        result.push({
            fileName: addedFileName,
            status: 'added',
        });
    }
};
