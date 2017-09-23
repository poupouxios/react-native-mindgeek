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
  View
} from 'react-native';

import Modal from 'react-native-modalbox';
import CssStyle from './classes/stylesheet';
import QuestionView from './classes/forms/questionform'

export default class Mindgeek extends Component {

  constructor(){
    super();
    this.finalAnswer = 10;
    this.state = {
      swipeToClose: true,
      sliderValue: 0.3,
      isModalOpen: false,
    }
  }

  onUpdate(key,value){
    console.log("updating " + key + " with value = " + value);
    this.setState({[key]: value});
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
        <View style={CssStyle.viewPlayButton}>
          <Button
            title="Play now!"
            color="#fff"
            onPress = {() => this.onUpdate('isModalOpen',true)}
          />
        </View>
        <Image
          source={require('./images/BB8.jpg')}
        />
        <Modal style={CssStyle.modal} position={"center"} ref={"questionModal"} isOpen={this.state.isModalOpen}>
          <QuestionView finalAnswer={this.finalAnswer} onUpdate={(k,v) => this.onUpdate(k,v)}/>
        </Modal>
      </View>
    );
  }

}

AppRegistry.registerComponent('Mindgeek', () => Mindgeek);