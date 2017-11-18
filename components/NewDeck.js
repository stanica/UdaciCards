import React from 'react';
import { saveDeckTitle } from '../utils/db';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { purple, white, gray, green, red } from '../utils/colors';

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.iosSubmitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>Create</Text>
    </TouchableOpacity>
  )
}

class Decks extends React.Component {
  state = {
    text: '',
    status: '',
    message: ''
  }

  submit = () => {
    if(this.state.text.length > 0){
      saveDeckTitle(this.state.text, (result) => {
        this.setState({status: result.status, message: result.message});
        console.log(this.props);
        this.props.screenProps();
        console.log(this.state);
      });
    }
    else {
      this.setState({status:'Error', message:'Please enter a title'});
    }
  }

  render() {
    const { message } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <Text style={{fontSize:30, textAlign:'center'}}>New Deck</Text>
          <Text style={{fontSize:16, textAlign:'center', color: gray}}>Enter the title of your new deck</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            autoFocus={true}
          />
          <Text style={{paddingTop: 10, fontSize: 16, textAlign:'center', display: this.state.message ? 'flex' : 'none', color: this.state.status === 'Success' ? green : red}}>
            {message}
          </Text>

          <Text style={{paddingTop: 10, fontSize: 16, textAlign:'center', display: this.state.message ? 'none' : 'flex', color: 'transparent'}}>
            Debug
          </Text>
      </View>
        <SubmitBtn onPress={this.submit}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    paddingHorizontal: 40,
    paddingTop: 80,
    justifyContent: 'space-around'
  },
  input: {
    height: 40,
    marginTop: 30,
    borderColor: gray,
    borderWidth: 1,
    paddingLeft: 10
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
})

export default Decks;
