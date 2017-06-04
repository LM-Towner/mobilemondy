 import React, { Component } from 'react';
 import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   TextInput,
   ScrollView
 } from 'react-native';
import {Images, Metrics} from '../Themes'
import styles from '../Containers/Styles/LoginScreenStyles'

export default class YelpSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleHeight: Metrics.screenHeight,
      yelpSearch: 'Galvanize',
      locationState: "New York"
    };
  }
  handleYelpApiSearch() {
    const Yelp = require('node-yelp-fusion');
    const yelp = new Yelp({
      id:'Z6DVIQ71WCKVMBpIkLceww',
      secret:'Q36N1FBaRqu39gNQOewKIiLvfZ5R1wudOUe4tk1j3GRBX8rlZMg5T4IUDiLadj8m'
    });

    yelp.search("term="+this.state.yelpSearch+"&location="+this.state.locationState).then(function(result){
      this.setState({
        result: result
      });
      console.log(result);
    });
  }

  handleChangeYelpSearch = (text) => {
    this.setState({ yelpSearch: text })
  }

  handleChangelocationState = (text) => {
    this.setState({ locationState: text })
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[styles.container, {height: this.state.visibleHeight/1.5}]} keyboardShouldPersistTaps='always'>
        <View style={[styles.form]}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Place Search</Text>
            <TextInput
              style={styles.textInput}
              editable={true}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.handleChangeYelpSearch}
              underlineColorAndroid='transparent'
              placeholder={this.state.yelpSearch}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Location</Text>
            <TextInput
              style={styles.textInput}
              editable={true}
              keyboardType='default'
              returnKeyType='go'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.handleChangelocationState}
              underlineColorAndroid='transparent'
              placeholder={this.state.locationState}
            />
          </View>

          <View style={[styles.loginRow]}>
            <TouchableOpacity
              style={styles.loginButtonWrapper}
              onPress={this.handleYelpApiSearch.bind(this)}
            >
              <View style={styles.loginButton}>
                <Text style={styles.loginText}>Search</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

