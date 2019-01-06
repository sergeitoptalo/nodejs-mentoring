import fs from 'fs';
import through2 from 'through2';
import { promisify } from 'util';
import Importer from '../../Importer/Importer';

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
                const src = fs.createReadStream(path, { encoding: 'utf8' });
                src.pipe(process.stdout);
                src.on('data', (chunk) => {
                    let transformedChunk = importer.convertToJSON(chunk);
                    process.stdout.write(JSON.stringify(transformedChunk));
                });
                src.on('end', () => {
                    process.stdout.end();
                });
            },
            convertToFile: (path: string) => {
                const importer = new Importer();
                const src = fs.createReadStream(path, { encoding: 'utf8' });
                const writeStream = fs.createWriteStream('./src/data/output.json');

                /* src.on('data', (chunk) => {
                    let transformedChunk = importer.convertToJSON(chunk);
                    writeStream.write(JSON.stringify(transformedChunk));
                }); */
                src.on('end', () => {
                    console.log('Finished');
                });
                writeStream.on('data', (chunk) => {
                    let transformedChunk = importer.convertToJSON(chunk);
                    this.push(JSON.stringify(transformedChunk));
                });
                writeStream.on('finish', () => { console.log('Done'); });
                // src.pipe(writeStream);
            },
            cssBundler: (path: string) => {
                const getCssFilesList = promisify(fs.readdir);
                getCssFilesList(path)
                    .then((filesList: string[]) => {
                        const writable = fs.createWriteStream(`${path}/bundle.css`);
                        filesList
                            .filter((fileName: string) => fileName !== 'bundle.css')
                            .forEach((fileName: string, index: number, array: string[]) => {
                                const readable = fs.createReadStream(`${path}/${fileName}`);
                                readable
                                    .pipe(writable, { end: false });
                                /* readable.on('data', (chunk) => {
                                    writable.write(chunk);
                                }); */
                                readable.on('end', () => {
                                    if (index === array.length - 1) {
                                        const readAdditionalInfo = fs.createReadStream(
                                            './src/utils/cssBundlerConfig/end.css',
                                        );
                                        readAdditionalInfo.pipe(writable);
                                        readAdditionalInfo.on('end', () => {
                                            writable.end();
                                        });
                                    }
                                });
                            });
                    })
                    .catch((error: string) => console.log(error));
            },
            outputFile: (path: string) => {
                const src = fs.createReadStream(path);
                src.pipe(process.stdout);
            },
            reverse: (str: string) => {
                function tr(buffer: Buffer, a: any, next: any) {
                    this.push(buffer
                        .toString()
                        .split('')
                        .reverse()
                        .join(''));
                    next();
                }

                process.stdin.pipe(through2(tr)).pipe(process.stdout);
            },
            transform: (str: string) => {
                if (str) {
                    console.log(str.toUpperCase());
                }
                function tr(buffer: Buffer, a: any, next: any) {
                    this.push(buffer.toString().toUpperCase());
                    next();
                }
                process.stdin.pipe(through2(tr)).pipe(process.stdout);
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
