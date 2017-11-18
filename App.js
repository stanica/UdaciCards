import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Decks from './components/Decks';
import NewDeck from './components/NewDeck';
import Deck from './components/Deck';
import Quiz from './components/Quiz';
import NewQuestion from './components/NewQuestion';
import { white, purple } from './utils/colors';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { getDecks } from './utils/db';

function UdaciStatusBar ({ backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'DECKS',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-browsers' size={30} color={tintColor} />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'NEW DECK',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add-circle' size={30} color={tintColor} />
    }
  }
},{
  tabBarOptions: {
    activeTintColor: purple,
    style: {
      backgroundColor: white,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen : Tabs,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
      headerTitle: 'All Decks'
    }
  },
  Deck: {
    screen: Deck,
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
      headerTitle: `${navigation.state.params.item}`
    })
  },
  NewQuestion: {
    screen: NewQuestion,
    headerMode: 'float',
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
      headerTitle: 'New Question'
    }
  },
  Quiz: {
    screen: Quiz,
    headerMode: 'float',
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
      headerTitle: 'Quiz'
    }
  }
});

export default class App extends React.Component {
  state = {
    decks: ''
  }
  getAllDecks() {
    getDecks().then((results) => {
      const decks = JSON.parse(results);
      this.setState({decks});
    })
  }

  render() {
    return (
      <View style={{flex:1}}>
        <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
        <MainNavigator
          screenProps={this.getAllDecks.bind(this)}
        />
      </View>
    );
  }
}
