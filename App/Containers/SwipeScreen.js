import React from 'react'
import { StyleSheet, TouchableOpacity, Button, ListView, Text, Image, View } from 'react-native'
// import styles from './Styles/LaunchScreenStyles'
import Swiper from 'react-native-deck-swiper';
import DeviceInfo from 'react-native-device-info'

// api call to get this data
const DummyData = {
  date: new Date(),
  recommendations: [
    'restaurant bar roman',
    'la-restaurant bar La-Keisha',
    'restaurant bar richard',
    'restaurant bar kevin'
  ]
}

export default class SwipeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.navigation.state.params.date,
      recommendations: ['default', 'options'],
      swipedAllCards: false
    };
  }

  requestGridData() {
    const queryUrl = JSON.stringify({
      "where": {
        "date": this.state.date
      }
    });

    console.log(queryUrl);

    return fetch('http://localhost:3000/api/recommendations?filter=' + queryUrl)
      .then((response) => response.json())
      .then((responseJson) => {
        // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        console.log(responseJson);
        const recommendations = [];

        responseJson.map(function(r) {
          recommendations.push([r.imageUrl, r.name]);
        })

        console.log(recommendations);

        this.setState({
          // dataSource: ds.cloneWithRows(users),
          date: this.state.date,
          recommendations: recommendations
        });

      })
      .catch((error) => {
        console.error(error);
      });
    // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // set the response to dummy data
    // const response = DummyData; // remove this line after api endpoint returns live data
    // const recommendations = response.recommendations; // remove this line after api endpoint returns live data
    // const today = response.date; // remove this line after api endpoint returns live data
    // const ready = response.ready; // remove this line after api endpoint returns live data
    // this.setState({
    //   // dataSource: ds.cloneWithRows(users),
    //   date: today,
    //   recommendations: recommendations
    // });

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

    this.props.navigation.navigate('RecommendationScreen', {date: this.state.date, username: this.state.username})
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
                <Text style={styles.text}>{card[1]}</Text>
                <Image
                  style={{width: 250, height: 250}}
                  source={{uri: card[0]}}
                />
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
