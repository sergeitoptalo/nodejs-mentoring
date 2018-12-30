import through2 from 'through2';

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
};
