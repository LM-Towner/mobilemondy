 import React, { Component } from 'react';
 import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   TextInput,
   ScrollView,
   Image
 } from 'react-native';
import {Images, Metrics} from '../Themes'
import DeviceInfo from 'react-native-device-info'
import styles from '../Containers/Styles/LoginScreenStyles'

export default class YelpSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleHeight: Metrics.screenHeight,
      yelpSearch: 'Galvanize',
      locationState: "New York",
      resultUrl: 'https://s3-media4.fl.yelpcdn.com/bphoto/EqbDXneMuQP6pw6GemVdQA/o.jpg',
      resultName: 'pizza'
    };
  }

  handleYelpApiSearch = () => {
    // yelp search is bugging out
    // so hard coding search results for now
    let resultUrl = '';
    let resultName ='';
    const Yelp = require('node-yelp-fusion');
    const yelp = new Yelp({
      id:'Z6DVIQ71WCKVMBpIkLceww',
      secret:'Q36N1FBaRqu39gNQOewKIiLvfZ5R1wudOUe4tk1j3GRBX8rlZMg5T4IUDiLadj8m'
    });

    yelp.search("term="+this.state.yelpSearch+"&location="+this.state.locationState+"&limit=3").then(function(result){
      console.log(result);

      const businesses = result.businesses;
      const business = result.businesses[0];
      console.log(business);

      resultUrl = business.image_url;
      resultName = business.name;

      results.resultUrl = business.image_url;
      results.resultName = business.name;

      this.setYelpResults(results);
      this.setState({
        resultUrl: resultUrl,
        resultName: resultName
      });
    });
  }

  setYelpResults = (results) => {
    this.setState({
      resultUrl: resultUrl,
      resultName: resultName
    });
  }

  handleChangeYelpSearch = (text) => {
    this.setState({ yelpSearch: text })
  }

  handleChangelocationState = (text) => {
    this.setState({ locationState: text })
  }

  saveRecommendation = (data) => {
    console.log(data);
    const deviceId = DeviceInfo.getUniqueID();

    const dataBody = {
      date: this.props.date,
      deviceId: deviceId,
      username: this.props.username,
      imageUrl: this.state.resultUrl,
      name: this.state.resultName,
      vote: 0
    }

    fetch('http://localhost:3000/api/recommendations', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataBody)
    });
  }

  renderYelpRow = (data) => {
    <TouchableOpacity
      style={styles.loginButtonWrapper}
      onPress={this.saveRecommendation.bind(this)}
    >
      <Text style={[styles.rowLabel, {textAlign: 'center', fontSize: 20}]}>
        {data.resultName}
      </Text>

      <Image
        style={{width: 250, height: 250}}
        source={{uri: data.resultUrl}}
      />
    </TouchableOpacity>
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

        <View style={[styles.row, {alignContent: 'center'}]}>
          <TouchableOpacity
            style={styles.loginButtonWrapper}
            onPress={this.saveRecommendation.bind(this)}
          >
            <Text style={[styles.rowLabel, {textAlign: 'center', fontSize: 20}]}>
              {this.state.resultName}
            </Text>

            <Image
              style={{width: 250, height: 250}}
              source={{uri: this.state.resultUrl}}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

