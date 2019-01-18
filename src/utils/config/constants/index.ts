import chalk from 'chalk';

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

const helpMessage: any = {
    action: {
        example: '--action=reverse',
        full: '--action',
        shortcuted: '-a',
        value: [
            'reverse',
            'transform',
            'outputFile',
            'convertFromFile',
            'convertToFile',
            'cssBundler',
        ],

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

export const getHelpMessage = () => {
    const columnWidth = 25;
    const lineIndent = 2;
    const border = chalk.cyanBright('| ');

    console.log('\n');
    console.log(chalk.bgGreen(
        chalk.black(
            'OPTION'.padEnd(columnWidth) + border
            + 'FULL / SHORTCUTED'.padEnd(columnWidth + lineIndent / 2) + border
            + 'VALUE'.padEnd(30)) + '\n',
    ));

    for (let key of Object.keys(helpMessage)) {
        let optionValue = Array.isArray(helpMessage[key].value)
            ? helpMessage[key].value[0]
            : helpMessage[key].value;

        console.log(
            chalk.yellow(
                key.padEnd(columnWidth) + border
                + (helpMessage[key].full + ' / '
                    + helpMessage[key].shortcuted).padEnd(columnWidth + lineIndent / 2) + border
                + optionValue,
            ),
        );

        if (Array.isArray(helpMessage[key].value)) {
            let outputValues = helpMessage[key].value
                .filter((value: string, index: number) => index !== 0);
            outputValues.forEach((value: string) => {
                console.log(
                    chalk.yellow(
                        (border + value).padStart((columnWidth + lineIndent) * 2
                            + value.length + border.length - 1)),
                );
            });
        }
        console.log(
            chalk.bgCyanBright(
                chalk.black('Example:')) + ' '
            + chalk.cyanBright(helpMessage[key].example),
        );
        console.log('\n');
        console.log('\n');
    }
};
