import React from 'react'
import { TouchableOpacity, Button, ListView, Text, Image, View } from 'react-native'
import styles from './Styles/LaunchScreenStyles'
import Calendar from '../Components/Calendar'

// api call to get this data
const DummyData = {
  date: new Date(),
  ready: true,
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

export default class CalendarScreen extends React.Component {
    constructor(props) {
      super(props);

      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        date: new Date(),
        dataSource: ds.cloneWithRows([{}])
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
      const users = response.users; // remove this line after api endpoint returns live data
      const today = response.date; // remove this line after api endpoint returns live data
      const ready = response.ready; // remove this line after api endpoint returns live data
      this.setState({
        dataSource: ds.cloneWithRows(users),
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

    handleNextButtonPress() {
        const date = new Date(this.state.date);
        date.setMonth(date.getMonth() + 1);
        this.setState({
            date
        });
    }

    handlePrevButtonPress() {
        const date = new Date(this.state.date);
        date.setMonth(date.getMonth() - 1);
        this.setState({
            date
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
            <Text>{today.getUTCDay()}/{today.getUTCDate()}/2017</Text>

            <ListView
              contentContainerStyle={styles.listView}
              dataSource={this.state.dataSource}
              initialListSize={35}
              renderRow={this.renderRow}
            />

            <Button
              onPress={this.swipeVote}
              title="SwipeVote!"
            >
            </Button>
          </View>
        );
      } else {
        return (
          <View>
            <Text>{today.getUTCDay()}/{today.getUTCDate()}/2017</Text>

            <ListView
              contentContainerStyle={styles.listView}
              dataSource={this.state.dataSource}
              initialListSize={35}
              renderRow={this.renderRow}
            />
          </View>
        );
      }
    }
}