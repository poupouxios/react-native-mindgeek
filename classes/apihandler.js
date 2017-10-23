'use strict';

var {NetInfo,Alert} = require('react-native');
import logger from './logger';

let apiUrl = "https://0cd0db95.ngrok.io";
let authenticationParams = {
  grant_type : "password",
  client_id  : 4,
  client_secret : "hxyhk5IuXwmjyrSujoYQns7PcpljyjMtYdvcERu8",
  scope : "",
  username: "mindgeek@pavids.com",
  password: "test1234!"
};
let verbs = ['get','post'];
let errorOption = {
  message: "Oops. Something went wrong. Try again.",
  title: "Error"
};

const ApiHandler = {

  authenticateApp: (token: String) => {
    let authenticateAppPromise = new Promise(function(success,failure){
      logger.logMessage("token = " + token);
      if(token === null || token === "" || token === undefined){
        logger.logMessage("Fetching token");
        ApiHandler.processApi("post","/oauth/token",authenticationParams)
                  .then(function(response){
                    if(response.access_token){
                      success({token: response.access_token});
                    }else{
                      throw {status: "500", message:errorOption.message + response};
                    }
                  })
                  .catch(function(response){
                    failure(response);
                  });
      }else{
        logger.logMessage("Token exists?? token = " + token);
        setTimeout(
          () => { success({token: token}); },
          500
        );
      }
    });
    return authenticateAppPromise;
  },

  processApi: (verb: String, route: String, parameters: Object, token: String) => {
    let apiCallPromise = new Promise(function(success,failure){
      ApiHandler.checkConnection()
                .then((response) => {
                    logger.logMessage("------------------connection exists--------------");
                    if(verbs.indexOf(verb) === -1){
                      failure({status: "405", message: "Method Not Allowed. Available Http Verbs are " + verbs.join()});
                    }else{
                      let url = apiUrl + route;
                      let urlOptions = {
                        method: verb,
                        headers: ApiHandler.generateHeaders(token)
                      };

                      if(verb === "get"){
                        url += ApiHandler.generateParameters(parameters);
                      }else{
                        urlOptions['body'] = JSON.stringify(parameters);
                      }

                      fetch(url, urlOptions)
                      .then(function(response){
                        logger.logMessage("---------------");
                        logger.logMessage("URL to call = " + url);
                        logger.logMessage(response);
                        logger.logMessage("-------------------");
                        logger.logMessage("URL options");
                        logger.logMessage(urlOptions);
                        if(!response.ok){
                          throw {status: response.status, message:errorOption.message};
                        }else{
                          return response.json();
                        }
                      })
                      .then(function(response){
                        logger.logMessage("final response");
                        logger.logMessage(response);
                        success(response);
                      })
                      .catch(function(error){
                        failure(error);
                      });
                    }
                })
                .catch(function(error) {
                  logger.logMessage(error);
                  failure(error);
                });
    });
    return apiCallPromise;
  },

  generateParameters: (parameters: Object) => {
    if(!parameters){
      return "";
    }

    let urlParams = "?";
    Object.keys(parameters).forEach(function (key){
      let value = parameters[key];
      urlParams = urlParams + key + '=' + value + '&';
    });
    urlParams = urlParams.replace(/\&$/,'');
    return urlParams;
  },

  checkConnection: () => {
    let promise = new Promise(function(success,failure){
      NetInfo.isConnected.fetch().done((isConnected) => {
        logger.logMessage("Checking if connection exists = " + isConnected);
        if(!isConnected){
          logger.logMessage("-------check internet connection--------");
          failure({status:"503", message:"Please check your Internet Connection and try again."});
        }else{
          logger.logMessage("-------You have internet connection--------");
          success({status:"200", message: 'Continue'});
        }
      });
    });
    return promise;
  },

  generateHeaders: (token: String) => {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    if(token !== null && token !== ''){
      headers.append('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

}

module.exports = ApiHandler;
