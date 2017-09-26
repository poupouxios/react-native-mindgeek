'use strict';

var React = require('react');
var {View,Text,Button,Alert} = require('react-native');
var CssStyle = require('../stylesheet');
var RadioButtonForm = require('react-native-simple-radio-button').default;

var radio_values = [
  {label: '8', value: 8},
  {label: '10', value: 10},
  {label: '12', value: 12}
];

var RadioButtonView = React.createClass({

  getInitialState: function(){
    return {
      value: -1,
    }
  },

  onChange: function(value){
    this.setState({value});
  },

  setAnswerTextBoxBasedOnRadioButtonSelection: function(value){
    this.setState({value:value});
    this.props.onUpdate(value);
  },

  render: function(){
    return (
      <View style={CssStyle.questionView}>
        <RadioButtonForm
          radio_props={radio_values}
          initial={-1}
          onPress={this.setAnswerTextBoxBasedOnRadioButtonSelection}
        />
      </View>
    )
  }

});

module.exports = RadioButtonView;
