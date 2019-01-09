export const errorMessages = {
    noFileOrDir: 'No such file or directory',
};

export const messages = {
    bundleSuccess: 'Bundle was created successfully',
    fileWasCreated: 'File was created successfully',
};

export const cssBundler = {
    fileEndPath: './src/utils/cssBundlerConfig/end.css',
    outputFile: 'bundle.css',
};

export const helpMessage = {
    action: {
        example: '--action=reverse',
        full: '--action',
        shortcuted: '-a',
        value: 'reverse, transform',
    },
    file: {
        example: '--action=convertToFile --file=example.js',
        full: '--file',
        shortcuted: '-f',
        value: 'path to file',
    },
    path: {
        example: '--action=cssBundler --path=data/assets/css',
        full: '--path',
        shortcuted: '-p',
        value: 'path to folder',
    },
};
