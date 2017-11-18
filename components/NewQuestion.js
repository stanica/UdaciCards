import React from 'react';
import { addCardToDeck } from '../utils/db';
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

class NewQuestion extends React.Component {
  state = {
    question: '',
    answer: '',
    status: '',
    message: ''
  }

  submit = () => {
    if(this.state.question.length > 0 && this.state.answer.length > 0){
      let card = {
        question: this.state.question,
        answer: this.state.answer
      }
      addCardToDeck(this.props.navigation.state.params.item, card, (result) => {
        this.setState({status: result.status, message: result.message});
        this.props.navigation.state.params.onNavigateBack(this.props.navigation.state.params.item);
        this.setState({question: '', answer: ''});
      });
    }
    else {
      this.setState({status:'Error', message:'Please enter a question and an answer'});
    }
  }

  render() {
    const { message } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <Text style={{fontSize:30, textAlign:'center'}}>New Question</Text>
          <Text style={{fontSize:16, textAlign:'center', color: gray}}>Enter a question and an answer</Text>
          <Text style={styles.titleText}>Question</Text>
          <TextInput
            style={styles.input}
            onChangeText={(question) => this.setState({question})}
            value={this.state.question}
            autoFocus={true}
          />
          <Text style={styles.titleText}>Answer</Text>
          <TextInput
            style={styles.input}
            onChangeText={(answer) => this.setState({answer})}
            value={this.state.answer}
          />
          <Text style={{paddingTop: 10, fontSize: 16, textAlign:'center', display: this.state.message ? 'flex' : 'none', color: this.state.status === 'Success' ? green : red}}>
            {message}
          </Text>

          <Text style={{paddingTop: 10, fontSize: 16, textAlign:'center', display: this.state.message ? 'none' : 'flex', color: 'transparent'}}>
            Debug
          </Text>

          <SubmitBtn onPress={this.submit}/>
      </View>

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
    justifyContent: 'flex-start'
  },
  input: {
    height: 40,
    borderColor: gray,
    borderWidth: 1,
    paddingLeft: 10
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginHorizontal: 40,
    marginTop: 30
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
  titleText: {
    marginTop: 30,
    fontSize: 16,
    color: gray
  }
})

export default NewQuestion;
