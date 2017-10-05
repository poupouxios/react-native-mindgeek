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
  TouchableOpacity
} from 'react-native';

import Modal from 'react-native-modalbox';
import CssStyle from './classes/stylesheet';
import QuestionView from './classes/forms/questionform'
import UserDetailsView from './classes/forms/userdetailsform'

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
    }
  }

  onUpdate(key,value){
    console.log("updating " + key + " with value = " + value);
    this.setState({[key]: value});
  }

  renderCorrectForm(){
    var form;
    if(this.state.isUserAnsweredQuestion){
      form = <UserDetailsView mistakes={this.state.retries} onUpdate={(k,v) => this.onUpdate(k,v)} />
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
        <TouchableOpacity
          onPress={() => this.onUpdate('isModalOpen',true)}
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
            //this.onUpdate('isUserAnsweredQuestion',false);
          }}
        >
          {this.renderCorrectForm()}
        </Modal>
      </View>
    );
  }

}

AppRegistry.registerComponent('Mindgeek', () => Mindgeek);
