import React from 'react';
import { saveDeckTitle } from '../utils/db';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated } from 'react-native';
import { purple, white, gray, green, red } from '../utils/colors';
import { getDeck } from '../utils/db';

class Deck extends React.Component {
  state = {
    questions: 0,
    cards: '',
    bounceValue: new Animated.Value(1)
  }

  onPress(item, nav) {
    Animated.sequence([
      Animated.timing(this.state.bounceValue, { duration: 200, toValue: 1.04,}),
      Animated.spring(this.state.bounceValue, { toValue: 1, friction: 4})
    ]).start();

    if(nav === 'Add'){
      this.props.navigation.navigate('NewQuestion', {item, onNavigateBack:this.getThisDeck.bind(this)});
    }
    else {
      this.props.navigation.navigate('Quiz', {cards: this.state.cards, item: this.props.navigation.state.params.item});
    }
  }

  getThisDeck(item){
    if(item){
      getDeck(item)
        .then((result) => {
          this.setState({questions: result.questions.length, cards: result.questions});
        });
    }
    else {
      getDeck(this.props.navigation.state.params.item)
        .then((result) => {
          this.setState({questions: result.questions.length, cards: result.questions});
        });
    }
  }

  componentDidMount() {
    this.getThisDeck();
  }

  render(){
    return(
      <View style={{transform: {scale: this.state.bounceValue}}} style={styles.container}>
        <Animated.View>
          <Text style={{fontSize:30, textAlign:'center'}}>{this.props.navigation.state.params.item}</Text>
          <Text style={{fontSize:18, textAlign:'center', color: gray, paddingTop: 10}}>{this.state.questions} cards</Text>
        </Animated.View>
        <View>
          <TouchableOpacity onPress={() => this.onPress(this.props.navigation.state.params.item, 'Add')} style={styles.addBtn}>
            <Text style={styles.addBtnText}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onPress(this.props.navigation.state.params.item, 'Start')} style={styles.startBtn}>
            <Text style={styles.startBtnText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-around',
    padding: 20,
    paddingTop: 80
  },
  addBtn: {
    backgroundColor: white,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginHorizontal: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: purple,
  },
  startBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginHorizontal: 40,
    marginTop: 20
  },
  addBtnText: {
    color: purple,
    fontSize: 22,
    textAlign: 'center'
  },
  startBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
});

export default Deck;
