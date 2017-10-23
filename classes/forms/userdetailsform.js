'use strict';

var React = require('react');
var {View,Text,Button,Alert,TouchableOpacity} = require('react-native');
var NativeForm = require('tcomb-form-native');
var CssStyle = require('../stylesheet');
var UserDetailsForm = NativeForm.form.Form;
var ApiHandler = require('../apihandler');

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
      this.props.onUpdate('progressHubText',"Submitting...");
      this.props.onUpdate('isProgressHudOpen',true);
      this.submitResultsToApi(value);
    }
  },

  submitResultsToApi: function(values){
    let participantData = {
      name: values.firstname,
      surname: values.surname,
      email: values.email,
      mistakes: this.props.mistakes
    };
    let self = this;
    ApiHandler.processApi('post','/api/participant/create',participantData,this.props.token)
              .then(function(response){
                Alert.alert(
                  "Good Luck",
                  "Thanks for your details.",
                  [{
                    text: "OK", onPress: () =>
                    {
                      self.props.onUpdate('isProgressHudOpen',false);
                      self.props.onUpdate('isUserAnsweredQuestion',false);
                      self.props.onUpdate('isModalOpen',false);
                    }
                  }]
                );
              })
              .catch(function(error){
                Alert.alert(
                  "Error",
                  "Oops.Something went wrong when trying to submit your answer. Try submitting it again. Thanks."
                );
              });
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

module.exports = UserDetailsView;
