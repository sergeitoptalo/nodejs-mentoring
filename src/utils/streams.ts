import { optionsConfig } from './config/optionsConfig';

const checkForHelpAction = (options: string[]) => {
    const a = 0;
};

const parseParams = (argv: string[]) => {
    const unparsedParams = argv.slice(2);
    console.log(unparsedParams);
    for (const param of unparsedParams) {
        console.log(param);
    }
};

parseParams(process.argv);
