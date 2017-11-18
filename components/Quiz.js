import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { white, purple, black, red, green } from '../utils/colors';
import { Ionicons } from '@expo/vector-icons';


export default class Quiz extends React.Component {
  state = {
    index: 0,
    viewing: 'question',
    correct: 0
  }

  componentDidMount() {
    console.log(this.props.navigation.state.params);
  }

  render() {
    const { cards } = this.props.navigation.state.params;
    const { index, viewing, correct } = this.state;
    if(index < cards.length) {
      return (
        <View style={{flex: 1}}>
          <View style={styles.indexContainer}>
            <Text style={styles.index}>{index + 1} / {cards.length}</Text>
          </View>
          <View style={styles.container}>
            <View>
              {viewing === 'question' ?
                (<Text style={styles.mainText}>{cards[index].question}</Text>)
                :
                (<Text style={styles.mainText}>{cards[index].answer}</Text>)
              }
              <TouchableOpacity onPress={() => this.setState({viewing: viewing === 'question' ? 'answer' : 'question'})}><Text style={styles.subText}>{viewing === 'question' ? 'Answer' : 'Question'}</Text></TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => this.setState({index: index+1, correct: correct+1, viewing:'question'})} style={[styles.btn, {backgroundColor: green}]}>
                <Text style={styles.btnText}>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({index: index+1, correct, viewing: 'question'})} style={[styles.btn, {backgroundColor:red}]}>
                <Text style={styles.btnText}>Incorrect</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <View>
            <Text style={styles.mainText}>{correct}/{cards.length} Correct</Text>
            <Text style={styles.subText}>{((correct/cards.length)*100).toFixed(2)}%</Text>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
  indexContainer: {
    padding: 10
  },
  index: {
    fontSize: 16
  },
  mainText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subText: {
    textAlign: 'center',
    color: red,
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 16
  },
  btn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginHorizontal: 40,
    marginTop: 20
  },
  btnText: {
    color: white,
    fontSize: 18,
    textAlign: 'center'
  }
});
