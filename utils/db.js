import { AsyncStorage } from 'react-native';

const CARD_STORAGE_KEY = 'UdaciCardStorageKey';

export function getDecks(){
  return AsyncStorage.getItem(CARD_STORAGE_KEY);
}

export function getDeck(id, cb){
  return AsyncStorage.getItem(CARD_STORAGE_KEY)
    .then((decks) => {
      let data = JSON.parse(decks);
      for (var key in data){
        if(key === id){
          return(data[key]);
          //break;
        }
      }
    })
}

export function saveDeckTitle(title, cb){
  getDecks().then((decks) => {
    let data = JSON.parse(decks);
    var result = {};
    if(data){
      if(!data[title]){
        data[title] = {
          title,
          questions: []
        }
        AsyncStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(data))
          .then((response) => {
            result = {
              status: 'Success',
              message: 'Deck title saved successfully'
            }
            cb(result);
          });
      }
      else {
        result = {
          status: 'Error',
          message: 'That deck already exists'
        }
        cb(result);
      }
    }
    else {
      data = {};
      data[title] = {
        title,
        questions: []
      }
      AsyncStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(data))
        .then((response) => {
          result = {
            status: 'Success',
            message: 'Hooray! Deck created successfully'
          }
          cb(result);
        });

    }

  })
}

export function addCardToDeck(title, card, cb){
  let result = {
    status: 'Error',
    message: 'There was an error adding your card'
  };
  getDecks().then((decks) => {
    let data = JSON.parse(decks);
    for(var deck in data){
      if(data[deck].title === title){
        data[deck].questions.push(card);
        AsyncStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(data))
          .then(() => {
            result.status = 'Success';
            result.message = 'Hooray! Card added successfully';
            cb(result);
          })
        break;
      }
    }
  })
}
