import React from 'react'
import { TouchableOpacity, Button, ListView, Text, Image, View } from 'react-native'
import styles from './Styles/LaunchScreenStyles'
import Swiper from 'react-native-deck-swiper';

// api call to get this data
const DummyData = {
  date: new Date(),
  recommendations: [
    {
      name: 'restaurant bar roman',
      location: 'location address goes here'
    },
    {
      name: 'la-restaurant bar keisha',
      location: 'location address goes here'
    },
    {
      name: 'restaurant bar richard',
      location: 'location address goes here'
    },
    {
      name: 'restaurant bar kevin',
      location: 'location address goes here'
    }
  ]
}

export default class SwipeScreen extends React.Component {
    constructor(props) {
      super(props);
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
      const users = response.users; // remove this line after api endpoint returns live data
      const today = response.date; // remove this line after api endpoint returns live data
      const ready = response.ready; // remove this line after api endpoint returns live data
      this.setState({
        // dataSource: ds.cloneWithRows(users),
        date: today,
        ready: ready
      });

      // const statuses = users.map(function(user) {
      //   return user.status;
      // });
    }

    componentDidMount() {
      this.requestGridData();
    }

    swipeVote = () => {
      this.props.navigation.navigate('RecommendationScreen')
    }

    render() {
      return(
        <View style={styles.container}>
          <Swiper
            cards={['DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY']}
            renderCard={(card) => {
              return (
                <View style={styles.card}>
                  <Text style={styles.text}>{card}</Text>
                </View>
              )
            }}
            onSwiped={(cardIndex) => {console.log(cardIndex)}}
            onSwipedAll={() => {console.log('onSwipedAll')}}
            cardIndex={0}
            backgroundColor={'#4FD0E9'}>
            <Button 
              onPress={() => {console.log('oulala')}} 
              title="Press me">
              You can press me
            </Button>
          </Swiper>
        </View>
      );
    }
}