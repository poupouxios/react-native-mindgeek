/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  Image,
  Button,
  View,
  TouchableOpacity,
  NetInfo,
  Alert
} from 'react-native';

import Modal from 'react-native-modalbox';
import CssStyle from './classes/stylesheet';
import QuestionView from './classes/forms/questionform'
import UserDetailsView from './classes/forms/userdetailsform'
import ApiHandler from './classes/apihandler'
import Spinner from 'react-native-loading-spinner-overlay';

export default class Mindgeek extends Component {

  constructor(){
    super();
    this.finalAnswer = 10;
    this.state = {
      swipeToClose: true,
      sliderValue: 0.3,
      isModalOpen: false,
      retries: 0,
      isUserAnsweredQuestion: false,
      token: "",
      isProgressHudOpen: false,
      progressHubText: "Let the fun begin.."
    }
  }

  componentDidMount(){
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleFirstConnectivityChange
    );
  }

  componentWillUnmount(){
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this._handleFirstConnectivityChange
    );
  }

  _handleFirstConnectivityChange(status){
    console.log("---Internet status = " + status + "-----------------");
  }

  onUpdate(key,value){
    console.log("updating " + key + " with value = " + value);
    this.setState({[key]: value});
  }

  renderCorrectForm(){
    let form;
    if(this.state.isUserAnsweredQuestion){
      form = <UserDetailsView
                mistakes={this.state.retries}
                token={this.state.token}
                onUpdate={(k,v) => this.onUpdate(k,v)}
              />
    }else{
      form = <QuestionView retries={this.state.retries} finalAnswer={this.finalAnswer} onUpdate={(k,v) => this.onUpdate(k,v)}/>
    }
    return form;
  }

  render() {
    return (
      <View style={CssStyle.container}>
        <Text style={CssStyle.heading}>
          Welcome to Mindgeeks Dark Side
        </Text>
        <Text style={CssStyle.instructions}>
          Answer one question, fill your details and you will be automatically added to the draw for one BB8 Sphero.
        </Text>
        <Text style={CssStyle.textForce}>
          May the force be with you!
        </Text>
        <Spinner
          visible={this.state.isProgressHudOpen}
          textStyle={{color: "#fff"}}
          overlayColor="rgba(51,51,51,0.80)"
          textContent={this.state.progressHubText}
        />
        <TouchableOpacity
          onPress={() =>
            {
              this.refs.questionModal.close();
              this.onUpdate('isProgressHudOpen',true);
              this.onUpdate('progressHubText',"Let the fun begin..");

              let self = this;
              ApiHandler.authenticateApp(this.state.token)
                        .then(function(response){
                          self.onUpdate('token',response.token);
                          self.onUpdate('isProgressHudOpen',false);
                          self.onUpdate('isModalOpen',true);
                        })
                        .catch(function(error){
                          self.onUpdate('isProgressHudOpen',false);
                          Alert.alert("Error","Oops.Something went wrong and cannot communicate with server " + error);
                        });
            }
          }
          style={CssStyle.viewPlayButton}
          activeOpacity={0.8}
        >
          <View>
            <Text style={CssStyle.generalButtonText}>
              Play Now!
            </Text>
          </View>
        </TouchableOpacity>
        <Image
          source={require('./images/BB8.jpg')}
        />
        <Modal
          style={CssStyle.modal}
          position={"center"}
          ref={"questionModal"}
          isOpen={this.state.isModalOpen}
          onClosed={() => {
            this.onUpdate('isModalOpen',false);
            this.onUpdate('retries',0);
          }}
        >
          {this.renderCorrectForm()}
        </Modal>
      </View>
    );
  }

}

AppRegistry.registerComponent('Mindgeek', () => Mindgeek);
