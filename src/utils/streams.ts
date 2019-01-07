import Parser from './argumentsParser';
import { config } from './config/optionsConfig';

const getArgs = (argv: string[]) => {
    return argv.slice(2);
};

let args: any = new Parser(getArgs(process.argv)).parseArguments();

if (args.errors) {
    console.log(args.errors.join('\n'));
}

if (args.showHelp) {
    console.warn('help');
} else {
    config.action.handler[args.action](args.text || args.file || args.path);
}
