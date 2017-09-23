'use strict';

var React = require('react');
var {View,Text,Button,Alert} = require('react-native');
var NativeForm = require('tcomb-form-native');
var CssStyle = require('../stylesheet');
var UserDetailsForm = NativeForm.form.Form;

var EmailComponent = NativeForm.refinement(NativeForm.String, function(value){
  return value.includes('@');
});

var UserModel = NativeForm.struct({
  firstname: NativeForm.String,
  surname: NativeForm.String,
  email: EmailComponent,
});

var options = {
  auto: 'placeholders',
  fields: {
    firstname: {
      error: "Enter your name"
    },
    surname: {
      error: "Enter your surname"
    },
    email: {
      error: "Insert a valid email"
    }
  }
}

var UserDetailsView = React.createClass({

  getInitialState: function(){
    return{
      value: {
        firstname: "",
        surname: "",
        email: "",
      }
    }
  },

  onPress: function(event){
    var value = this.refs.UserDetailsForm.getValue();
    if(value){
      this.props.onUpdate('isUserAnsweredQuestion',false);
      this.props.onUpdate('isModalOpen',false);
    }
  },

  render: function(){
    return (
      <View style={CssStyle.questionView}>
        <Text style={[CssStyle.heading,CssStyle.questionViewHeading]}>
          Your Details
        </Text>
        <UserDetailsForm
          ref="UserDetailsForm"
          type={UserModel}
          options={options}
          value={this.state.value}
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

module.exports = UserDetailsView;
