'use strict';

const logger = {
  logMessage: (message) => {
    if(message instanceof Object){
      message = JSON.stringify(message);
    }
    console.log("MindBug: " + message);
  }
}

export default logger;
