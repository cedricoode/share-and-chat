export function getHumanReadableErrorMsg(error) {
    if (error instanceof Error) {
        return error.message || 'Unknow error';
    } else if (error instanceof Response) {
        if (error.status >= 500) {
            return 'server internal error';
        } else if (error.status >= 400) {
            return 'verify your input!';
        } else if (error.status >= 300) {
            return 'Redirection, possibly not a error';
        } else {
            return 'Uknown error';
        }
    } else {
        return 'Unknown error';
    }
}