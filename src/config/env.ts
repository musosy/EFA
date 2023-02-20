const DOTENV_FILE_PATH = (() => {
    switch (process.env.NODE_ENV ?? '') {
    case 'docker':
        return __dirname + '/../../.env.docker';
    default:
        return __dirname + '/../../.env';
    }
})();

export default DOTENV_FILE_PATH;
