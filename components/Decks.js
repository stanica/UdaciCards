import React from 'react';
import { getDecks } from '../utils/db';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { gray, white, purple } from '../utils/colors';
import Deck from '../components/Deck';


class Decks extends React.Component {
  state = {
    decks: {}
  }

  getAllDecks() {
    getDecks().then((results) => {
      const decks = JSON.parse(results);
      this.setState({decks});
    })
  }

  componentDidMount() {
    this.getAllDecks();
  }

  componentWillReceiveProps(nextProps){
    this.getAllDecks();
  }

  onPress(item) {
    this.props.navigation.navigate('Deck', {item});
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.onPress(item)} style={styles.card}>
        <Text style={{fontSize:25}}>{this.state.decks[item].title}</Text>
        <Text style={{fontSize:16, color: gray}}>{this.state.decks[item].questions.length} cards</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data = {Object.keys(this.state.decks)}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}
        >
        </FlatList>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 20
  },
  card: {
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: white,
    backgroundColor: white,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    }
  }
});

export default Decks;
