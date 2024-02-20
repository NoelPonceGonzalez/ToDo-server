import fs from 'fs';

//add name logs file
const infoLogPath = 'logs/info.log';
const errorLogPath = 'logs/error.log';

//crear function
function clearLogFile(logPath: string): void {
    fs.writeFileSync(logPath, ''); 
  }
  

clearLogFile(infoLogPath);
clearLogFile(errorLogPath);  