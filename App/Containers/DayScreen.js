import React from 'react'
import { TouchableOpacity, Button, ListView, Text, Image, View } from 'react-native'
import styles from './Styles/LaunchScreenStyles'
import YelpSearch from '../Components/YelpSearch'
import DeviceInfo from 'react-native-device-info'

// api call to get this data
const DummyData = {
  date: new Date(),
  ready: false,
  users: [
    {
      username: 'roman',
      status: 'ready'
    },
    {
      username: 'la-keisha',
      status: 'ready'
    },
    {
      username: 'richard',
      status: 'ready'
    },
    {
      username: 'kevin',
      status: 'waiting for recommendations'
    }
  ]
}

export default class DayScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.navigation.state.params.selectedDate);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      date: this.props.navigation.state.params.selectedDate,
      dataSource: ds.cloneWithRows([{}])
    };
  }

  requestData() {
    // return fetch('https://localhost:3000/api/?username={this.state.username}')
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
      dataSource: ds.cloneWithRows(users),
      ready: ready
    });

    // const statuses = users.map(function(user) {
    //   return user.status;
    // });
  }

  componentDidMount() {
    this.requestData();
  }

  handleSubmitButtonPress() {
    const date = this.state.date;
    const deviceId = DeviceInfo.getUniqueID();

    fetch('http://localhost:3000/api/rounds', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: date,
        date: date,
        deviceId: deviceId,
        recommendations: [
          {
            name: 'test location 1',
            imageUrl: 'http://loopback.io/images/overview/powered-by-LB-xs.png'
          },
          {
            name: 'test location 2',
            imageUrl: 'http://loopback.io/images/overview/powered-by-LB-sm.png'
          },
          {
            name: 'test location 3',
            imageUrl: 'http://loopback.io/images/overview/powered-by-LB-med.png'
          }
        ]
      })
    });
  }

  swipeVote = () => {
    this.props.navigation.navigate('SwipeScreen')
  }

  renderRow(data) {
    return (
      <View>
        <Text>{data.username}</Text>
        <Text>{data.status}</Text>
      </View>
    );
  }

  render() {
    const today = this.state.date;
    const ready = this.state.ready;

    if(ready) {
      return (
        <View>
          <Text>{today.getUTCMonth() + 1}/{today.getUTCDate()}/2017</Text>

          <ListView
            contentContainerStyle={styles.listView}
            dataSource={this.state.dataSource}
            // initialListSize={35}
            renderRow={this.renderRow}
          />

          <Text>Everyone is ready!</Text>

          <Button onPress={this.swipeVote} title="SwipeVote!" />
        </View>
      );
    } else {
      return (
        <View>
          <Text>{today.getUTCMonth() + 1}/{today.getUTCDate()}/2017</Text>

          <ListView
            contentContainerStyle={styles.listView}
            dataSource={this.state.dataSource}
            initialListSize={35}
            renderRow={this.renderRow}
          />

          <YelpSearch />
          
          <Button onPress={this.handleSubmitButtonPress} title="Submit" />
        </View>
      );
    }
  }
}
