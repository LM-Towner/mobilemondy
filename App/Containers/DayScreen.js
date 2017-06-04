import React from 'react'
import { TouchableOpacity, Button, ListView, Text, Image, View } from 'react-native'
import styles from './Styles/LoginScreenStyles'
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
      ready: false,
      date: this.props.navigation.state.params.selectedDate,
      username: this.props.navigation.state.params.username,
      dataSource: ds.cloneWithRows([{}])
    };
  }

  requestData() {
    const queryUrl = JSON.stringify({
      "where": {
        "date": this.state.date
      }
    });

    console.log(queryUrl);

    return fetch('http://localhost:3000/api/rounds?filter=' + queryUrl)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // set the response to dummy data
        // responseJson = DummyData; // remove this line after api endpoint returns live data
        this.setState({dataSource: ds.cloneWithRows(responseJson)});
      })
      .catch((error) => {
        console.error(error);
      });
    // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // set the response to dummy data
    // const response = DummyData; // remove this line after api endpoint returns live data
    // const users = response.users; // remove this line after api endpoint returns live data
    // const today = response.date; // remove this line after api endpoint returns live data
    // const ready = response.ready; // remove this line after api endpoint returns live data
    // console.log(response);
    // console.log(users);
    // this.setState({
    //   dataSource: ds.cloneWithRows(users),
    //   username: this.props.navigation.state.params.username,
    //   ready: ready
    // });

    // const statuses = users.map(function(user) {
    //   return user.status;
    // });
  }

  componentDidMount() {
    this.requestData();
  }

  handleSubmitButtonPress = () => {
    this.setState({
      ready: true
    });
    const date = this.state.date;
    const deviceId = DeviceInfo.getUniqueID();
    const dummyArray = [
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
    ];

    const postBody = {
      date: date,
      deviceId: deviceId,
      username: this.state.username,
      test: dummyArray,
      status: 'ready',
    };

    fetch('http://localhost:3000/api/rounds', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postBody)
    });
  }

  swipeVote = () => {
    this.props.navigation.navigate('SwipeScreen', {date: this.state.date, username: this.state.username})
  }

  renderRow(data) {
    console.log(data);

    const status = typeof data.status === 'undefined' ? 'not ready' : data.status;

    return (
      <View style={styles.form}>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>{data.username} - {status}</Text>
        </View>
      </View>
    );
  }

  render() {
    const today = this.state.date;
    const ready = this.state.ready;

    if(ready) {
      return (
        <View style={{flex: 1, marginTop: 20}}>
          <Text style={[styles.rowLabel, {textAlign: 'center', fontSize: 20}]}>{today.getUTCMonth() + 1}/{today.getUTCDate()}/2017</Text>

          <ListView
            contentContainerStyle={styles.listView}
            dataSource={this.state.dataSource}
            // initialListSize={35}
            renderRow={(rowData) => this.renderRow(rowData)}
          />

          <Button onPress={this.swipeVote} title="Everyone is ready!" />

          <Button onPress={this.swipeVote} title="SwipeVote!" />
          <Button onPress={() => this.props.navigation.goBack()} title="Back"/>
        </View>
      );
    } else {
      return (
        <View style={{flex: 1, marginTop: 20}}>
          <Text style={[styles.rowLabel, {textAlign: 'center', fontSize: 20}]}>{today.getUTCMonth() + 1}/{today.getUTCDate()}/2017</Text>

          <ListView
            contentContainerStyle={styles.listView}
            dataSource={this.state.dataSource}
            // initialListSize={35}
            renderRow={(rowData) => this.renderRow(rowData)}
          />

          <YelpSearch date={this.state.date} username={this.state.username}/>
          
          <Button onPress={this.handleSubmitButtonPress} title="Submit" />
          <Button onPress={() => this.props.navigation.goBack()} title="Back"/>
        </View>
      );
    }
  }
}
