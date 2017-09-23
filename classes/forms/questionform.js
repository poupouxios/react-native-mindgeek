'use strict';

var React = require('react');
var {View,Text,Button,Alert} = require('react-native');
var NativeForm = require('tcomb-form-native');
var CssStyle = require('../stylesheet');
var QuestionForm = NativeForm.form.Form;

var Question = "How many years did Pornhub celebrate recently?";

var QuestionModel = NativeForm.struct({
  answer: NativeForm.Number
});

var options = {
  fields: {
    answer: {
      error: 'Insert a valid value'
    }
  }
};

var QuestionView = React.createClass({

  getInitialState: function(){
    return {
      value: {
        answer: 0
      },
      props: this.props
    }
  },

  onPress: function(event){
    var value = this.refs.questionForm.getValue();
    if(value){
      if(value.answer == this.props.finalAnswer){
        Alert.alert(
          "Congratulations!",
          "The force is with you now. Press OK to fill up your details to be one step closer to win our price."
        );
        this.props.onUpdate('isModalOpen',false);
      }
    }
  },

  onChange: function(value){
    this.setState({value});
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
        <View style={[CssStyle.viewPlayButton,CssStyle.questionViewButton]}>
          <Button
            title="Submit"
            color="#fff"
            onPress = {this.onPress}
          />
        </View>
      </View>
    )
  }

});

module.exports = QuestionView;
