const logger = {
    log: (module, type, message) => {
        let moduleStr = module || '';
        let typeStr = type || '';
        let messageStr = message || '';
        console.log(`${moduleStr} | ${typeStr} | ${messageStr}`);
    }
};
export default logger;