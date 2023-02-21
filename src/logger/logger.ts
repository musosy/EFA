import chalk from 'chalk';

// eslint-disable-next-line no-console
const log = console.log;

const colors = {
    red: chalk.hex('#ab2121'),
    yellow: chalk.hex('#fad96a'),
    blue: chalk.hex('#5bb1e1'),
};

const Logger = (name: string) => {
    const loggerName = '[' + chalk.bold.hex('#0096FF')(name.toUpperCase()) + ' | ' + chalk.hex('#FFC300 ')`${(process.env.NODE_ENV ?? 'dev').toUpperCase()}` + ']';
    return {
        error: (s: any): void => log(loggerName + ' ' + colors.red('ERROR -'), s instanceof String ? colors.red(s) : s),
        warning: (s: any): void => log(loggerName + ' ' + colors.yellow('WARNING -'), s instanceof String ? colors.yellow(s) : s),
        notice: (s: any): void => log(loggerName + ' ' + colors.blue('NOTICE -'), s instanceof String ? colors.blue(s) : s),
        info: (s: any): void => log(loggerName + ' ' + 'INFO -', s),
    };
};

export default Logger;