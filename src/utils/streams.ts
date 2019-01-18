import chalk from 'chalk';
import Parser from './argumentsParser';
import { getHelpMessage } from './config/constants';
import { config } from './config/optionsConfig';
import { IParsedArgs } from './models';

const getArgs = (argv: string[]) => {
    return argv.slice(2);
};

let args: IParsedArgs = new Parser(getArgs(process.argv)).parseArguments();

if (args.errors) {
    console.log(chalk.bgRed(chalk.black(args.errors.join('\n'))));
}

if (args.showHelp) {
    getHelpMessage();
}

if (!args.errors && !args.showHelp) {
    config.action.handler[args.action](args.text || args.file || args.path);
}
