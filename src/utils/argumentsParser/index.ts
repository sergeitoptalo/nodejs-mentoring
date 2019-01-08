import { config, helpConfig } from '../config/optionsConfig';
import { errorMessages, errorStatus } from './constants';

export default class Parser {
    private args: string[];
    private errors: string[];
    private showHelp: boolean;
    private stack: any;

    constructor(args: string[]) {
        this.args = args.filter((arg) => arg !== '');
        this.errors = [];
        this.showHelp = false;
        this.stack = {};
    }

    public parseArguments() {
        if (!this.args.length) {
            this.errors.push(errorMessages.getNoArgumentsError());

            return {
                errors: this.errors,
                showHelp: true,
            };
        }

        this.checkForHelpOption();

        if (this.showHelp) {
            return { showHelp: true };
        }

        this.parseFullOptions();
        this.buildStack();

        if (this.errors.length) {
            return { errors: this.errors };
        }

        return this.stack;
    }

    private parseFullOptions() {
        const tempArgs = this.args.map((arg) => {
            if (/\=/.test(arg)) {
                return arg.split('=');
            }
            return arg;
        });

        this.args = [].concat.apply([], tempArgs);
    }

    private checkForHelpOption() {
        const helpOption = this.args.reduce((acc, currentArg, index) => {
            if (helpConfig.option.includes(currentArg)) {
                return acc + index === 0 ? index + 1 : index;
            }

            return acc;
        }, -1);

        if (helpOption > 0) {
            this.args = this.args.filter((arg, index) => index !== helpOption);
        }

        if (helpOption === 0) {
            this.args = this.args.filter((arg, index) => index === helpOption);
            this.showHelp = true;
        }
    }

    private validateOption(option: string, argument: string) {
        if (!argument || /^(\-|\-\-)/.test(argument)) {
            this.errors.push(errorMessages.getMissedArgumentError(option));
            return errorStatus.error;
        }

        return argument;
    }

    private buildStack() {
        const optionsIndexes: number[] = [];
        let options = {};
        for (let item in config) {
            if (config.hasOwnProperty(item)) {
                let option = this.args.forEach((element, index, array) => {
                    if (config[item].option.split(',').map((opt) => opt.trim()).includes(element)) {
                        options = {
                            ...options,
                            [item]: this.validateOption(item, array[index + 1]),
                        };
                        optionsIndexes.push(index);
                        if (array[index + 1]) {
                            optionsIndexes.push(index + 1);
                        }
                    }
                });
            }
        }

        let textParams = this.args.filter(
            (arg, index) => !optionsIndexes.includes(index),
        );

        if (textParams) {
            options = { ...options, text: textParams.join(' ') };
        }

        this.stack = options;

        if (this.stack.file) {
            this.validateFileName(this.stack.file);
        }
    }

    private validateFileName(fileName: string) {
        console.log(fileName);
        if (fileName !== errorStatus.error && !/\S*\.\S*$/.test(fileName)) {
            this.errors.push(errorMessages.getInvalidFileNameError(fileName));
        }
    }
}
