import React from 'react'
import { StyleSheet, TouchableOpacity, Button, ListView, Text, Image, View } from 'react-native'
// import styles from './Styles/LaunchScreenStyles'
import Swiper from 'react-native-deck-swiper';

// api call to get this data
const DummyData = {
  date: new Date(),
  recommendations: [
    'restaurant bar roman',
    'la-restaurant bar keisha',
    'restaurant bar richard',
    'restaurant bar kevin'
  ]
}

export default class SwipeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      recommendations: ['default', 'options'],
      swipedAllCards: false
    };
  }

  requestGridData() {
    // return fetch('https://localhost:4000/eventDate?username={this.state.username}')
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //     // set the response to dummy data
    //     responseJson = DummyData; // remove this line after api endpoint returns live data
    //     this.setState({dataSource: ds.cloneWithRows(responseJson)});
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // set the response to dummy data
    const response = DummyData; // remove this line after api endpoint returns live data
    const recommendations = response.recommendations; // remove this line after api endpoint returns live data
    const today = response.date; // remove this line after api endpoint returns live data
    const ready = response.ready; // remove this line after api endpoint returns live data
    this.setState({
      // dataSource: ds.cloneWithRows(users),
      date: today,
      recommendations: recommendations
    });

    // const statuses = users.map(function(user) {
    //   return user.status;
    // });
  }

  componentDidMount() {
    this.requestGridData();
  }

  finishedSwiping = () => {
    this.setState({
      swipedAllCards: true
    });

    // make api call
    // api post that this user is done swiping

    this.props.navigation.navigate('RecommendationScreen')
  }

  swipeRight = (cardIndex) => {
  }

  swipeLeft = (cardIndex) => {
  }

  doNothing = (cardIndex) => {}

  render() {
    return(
      <View style={styles.container}>
        <Swiper
          cards={this.state.recommendations}
          renderCard={(card) => {
            return (
              <View style={styles.card}>
                <Text style={styles.text}>{card}</Text>
              </View>
            )
          }}
          onSwiped={(cardIndex) => this.doNothing(cardIndex)}
          onSwipedRight={(cardIndex) => this.swipeRight(cardIndex)}
          onSwipedLeft={(cardIndex) => this.swipeLeft(cardIndex)}
          onSwipedAll={this.finishedSwiping}
          cardIndex={0}
        >
          <Button 
            onPress={() => this.props.navigation.goBack()} 
            title="Cancel">
          </Button>
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box1: {
    flex: 1
  },
  container: {
    // backgroundColor: "#F5FCFF"
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  },
  done: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
    backgroundColor: "transparent"
  }
});
