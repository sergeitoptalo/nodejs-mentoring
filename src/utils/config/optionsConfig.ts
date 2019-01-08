import chalk from 'chalk';
import fs from 'fs';
import through2, { TransformCallback } from 'through2';
import { promisify } from 'util';
import Importer from '../../Importer/Importer';
import { cssBundler, errorMessages, messages } from './constants/index';

export const helpConfig = {
    option: '-h, --help',
};

interface IConfig {
    [key: string]: {
        option: string,
        handler?: any,
    };
}

export const config: IConfig = {
    action: {
        handler: {
            convertFromFile: (path: string) => {
                const importer = new Importer();
                const readable = fs.createReadStream(path);

                readable.on('data', (chunk) => {
                    process.stdout.write(
                        JSON.stringify(importer.convertToJSON(chunk.toString())),
                    );
                });

                readable.on('end', () => {
                    process.exit(1);
                });

                readable.on('error', () => {
                    console.log(chalk.bgRed(errorMessages.noFileOrDir));
                });
            },
            convertToFile: (path: string) => {
                const importer = new Importer();
                const readable = fs.createReadStream(path, { encoding: 'utf8' });
                const writable = fs.createWriteStream(
                    path.substring(0, path.lastIndexOf('.')) + '.json',
                );

                readable.on('data', (chunk) => {
                    let transformedChunk = importer.convertToJSON(chunk);
                    writable.write(JSON.stringify(transformedChunk));
                });

                readable.on('end', () => {
                    writable.end();
                });

                readable.on('error', (error) => {
                    console.log(error, errorMessages.noFileOrDir);
                });

                writable.on('finish', () => {
                    console.log(chalk.bgGreen(messages.fileWasCreated));
                });
            },
            cssBundler: (path: string) => {
                const getCssFilesList = promisify(fs.readdir);
                getCssFilesList(path)
                    .then((filesList: string[]) => {
                        const writable = fs.createWriteStream(`${path}/${cssBundler.outputFile}`);
                        filesList
                            .filter((fileName: string) => fileName !== cssBundler.outputFile)
                            .forEach((fileName: string, index: number, array: string[]) => {
                                const readable = fs.createReadStream(`${path}/${fileName}`);

                                readable
                                    .pipe(writable, { end: false });

                                readable.on('end', () => {
                                    if (index === array.length - 1) {
                                        const readAdditionalInfo = fs.createReadStream(
                                            cssBundler.fileEndPath,
                                        );

                                        readAdditionalInfo.pipe(writable);

                                        readAdditionalInfo.on('end', () => {
                                            writable.end();
                                            console.log(
                                                chalk.bgGreenBright(messages.bundleSuccess),
                                            );
                                        });
                                    }
                                });

                                readable.on('error', (error) => {
                                    console.log(chalk.bgRed(errorMessages.noFileOrDir));
                                });
                            });
                    })
                    .catch((error: string) => console.log(error));
            },
            outputFile: (path: string) => {
                const readable = fs.createReadStream(path);
                readable.pipe(process.stdout);
                readable.on('error', () => {
                    console.log(errorMessages.noFileOrDir);
                });
            },
            reverse: (str: string) => {
                const reverseString = (buffer: (Buffer | string)) =>
                    buffer
                        .toString()
                        .split('')
                        .reverse()
                        .join('');

                function transformInput(chunk: Buffer, enc: string, next: TransformCallback) {
                    this.push(reverseString(chunk) + '\n');
                    next();
                }

                if (str) {
                    console.log(reverseString(str));
                }

                process.stdin
                    .pipe(through2(transformInput))
                    .pipe(process.stdout);
            },
            transform: (str: string) => {
                if (str) {
                    console.log(str.toUpperCase());
                }

                function transformInput(buffer: Buffer, enc: string, next: TransformCallback) {
                    this.push(buffer.toString().toUpperCase());
                    next();
                }

                process.stdin
                    .pipe(through2(transformInput))
                    .pipe(process.stdout);
            },
        },
        option: '-a, --action',
    },
    file: {
        option: '-f, --file',
    },
    path: {
        option: '-p, --path',
    },
};
