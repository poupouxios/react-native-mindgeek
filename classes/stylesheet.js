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
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20
  },
  homeImage: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop:20,
    marginLeft:30
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    margin: 10,
    fontSize:20
  },
  textForce: {
    textAlign: 'center',
    color: '#333333',
    margin: 10,
    fontWeight: 'bold',
    fontSize:20
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
    padding: 10
  },
  generalButtonText: {
    color: "#fff",
    fontSize: 16
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
    fontSize:20
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 330,
    width: 300,
  },
})

module.exports = CssStyle;
