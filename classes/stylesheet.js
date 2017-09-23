'use strict';

var {StyleSheet} = require('react-native');

var CssStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    margin: 10,
  },
  textForce: {
    textAlign: 'center',
    color: '#333333',
    margin: 10,
    fontWeight: 'bold',
  },
  viewPlayButton: {
    backgroundColor: "#333333",
    marginTop:20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#d1d1d1",
    overflow: 'hidden',
    width: "50%",
    alignItems: 'center',
  },
  questionView: {
    flex: 1,
    justifyContent: 'center',
  },
  alignCentre : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidth : {
    width: "100%",
  },
  questionViewButton: {
    width: 250,
  },
  questionViewHeading: {
    marginTop:0,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    width: 300,
  }
})

module.exports = CssStyle;
