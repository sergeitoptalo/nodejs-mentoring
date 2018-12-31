import Parser from './argumentsParser';
import { config } from './config/optionsConfig';

const parseParams = (argv: string[]) => {
    return argv.slice(2);
};

let params = parseParams(process.argv);

let args: any = new Parser(params).parseArguments();

if (args.errors) {
    console.log(args.errors.join(' '));
} else {
    config.action.handler[args.action](args.text || args.file);
}
if (args.showHelp) {
    console.log('help');
}
