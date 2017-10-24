'use strict';

var React = require('react');
var createReactClass = require('create-react-class');
var {View,Text,Button,Alert,TouchableOpacity} = require('react-native');
var NativeForm = require('tcomb-form-native');
var CssStyle = require('../stylesheet');
var RadioButtonView = require('./radioform');
var UserDetailsView = require('./userdetailsform');
var QuestionForm = NativeForm.form.Form;

var Question = "How many years did Pornhub celebrate recently?";

var QuestionModel = NativeForm.struct({
  answer: NativeForm.Number
});

var options = {
  fields: {
    answer: {
      error: 'Insert a valid value',
      hidden: true,

    }
  }
};

var QuestionView = createReactClass({

  getInitialState: function(){
    return {
      value: {
        answer: 0
      },
      radioValue: 0
    }
  },

  onPress: function(event){
    var value = this.refs.questionForm.getValue();
    if(value){
      if(value.answer == this.props.finalAnswer){
        Alert.alert(
          "Congratulations!",
          "The force is with you now. Press OK to fill up your details to be one step closer to win our price.",
          [{
            text: "OK", onPress: () =>
            {
              this.props.onUpdate('isUserAnsweredQuestion',true);
            }
          }]
        );
      }else{
        var retries = this.props.retries + 1;
        this.props.onUpdate('retries',retries);
        Alert.alert(
          "Sorry!",
          "Wrong answer. You made " + retries + " mistake(s)"
        );
      }
    }
  },

  onChange: function(value){
    this.setState({value});
  },

  onRadioButtonUpdate: function(radioValue){
    var value = {
      answer: radioValue
    };
    this.setState({value:value});
  },

  render: function(){
    return (
      <View style={CssStyle.questionView}>
        <Text style={[CssStyle.heading,CssStyle.questionViewHeading]}>
          {Question}
        </Text>
        <QuestionForm
          ref="questionForm"
          type={QuestionModel}
          options={options}
          value={this.state.value}
          onChange={this.onChange}
        />
        <RadioButtonView onUpdate={(value) => this.onRadioButtonUpdate(value)} />
        <TouchableOpacity
          onPress={this.onPress}
          style={[CssStyle.viewPlayButton,CssStyle.questionViewButton]}
          activeOpacity={0.8}
        >
          <View>
            <Text style={CssStyle.generalButtonText}>
              Submit
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

});

module.exports = QuestionView;
