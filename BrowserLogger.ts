
class BrowserLogger {
    public info(message: string) {
        console.info(message);
    }
}
const logger = new BrowserLogger;
export default logger;