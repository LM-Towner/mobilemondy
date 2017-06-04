import React from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, TextInput, TouchableOpacity, Image} from 'react-native'
import { connect } from 'react-redux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../Containers/Styles/LoginScreenStyles'

// const yelp = require('yelp-fusion');

// const searchRequest = {
//   term:'Four Barrel Coffee',
//   location: 'san francisco, ca'
// };

// yelp.accessToken(clientId, clientSecret).then(response => {
//   const client = yelp.client(response.jsonBody.access_token);

//   client.search(searchRequest).then(response => {
//     const firstResult = response.jsonBody.businesses[0];
//     const prettyJson = JSON.stringify(firstResult, null, 4);
//     console.log(prettyJson);
//   });
// }).catch(e => {
//   console.log(e);
// });

class YelpSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      search: "",
      resultName: "",
      resultImage: "",
      recomendations: [],
    };
  }


  handlePressLogin = () => {
    const yelpApiResult = {
      "id": "four-barrel-coffee-san-francisco",
      "name": "Four Barrel Coffee",
      "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/xs4GEA2BOpPYG7bh7o6GrA/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/four-barrel-coffee-san-francisco?adjust_creative=Z6DVIQ71WCKVMBpIkLceww&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Z6DVIQ71WCKVMBpIkLceww",
      "review_count": 1833,
      "categories": [
          {
              "alias": "coffee",
              "title": "Coffee & Tea"
          }
      ],
      "rating": 4,
      "coordinates": {
          "latitude": 37.7670169511878,
          "longitude": -122.42184275
      },
      "transactions": [],
      "price": "$",
      "location": {
          "address1": "375 Valencia St",
          "address2": "",
          "address3": "",
          "city": "San Francisco",
          "zip_code": "94103",
          "country": "US",
          "state": "CA",
          "display_address": [
              "375 Valencia St",
              "San Francisco, CA 94103"
          ]
      },
      "phone": "+14152520800",
      "display_phone": "(415) 252-0800",
      "distance": 1452.798210728
    }

    this.setState({
      resultName: yelpApiResult.name,
      resultImage: yelpApiResult.image_url
    })
  }

  addToRecommendation() {}

  render () {
    return (
      <ScrollView style={styles.container}>
        <TextInput
          style={{height: 40}}
          placeholder="Search!"
          onChangeText={(val) => this.setState({search: val})}
        />

       <TouchableOpacity style={styles.loginButtonWrapper} onPress={this.handlePressLogin.bind(this)}>
          <View style={styles.loginButton}>
            <Text style={styles.loginText}>Search</Text>
          </View>
        </TouchableOpacity>

        <Text>
          {this.state.resultName}
          {this.state.resultImage}
        </Text>

        <Image
          style={{height:130, width:130}}
          source={{uri: this.state.resultImage}}
        />

        <KeyboardAvoidingView behavior='position'>
          <Text>YelpSearchScreen Screen</Text>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(YelpSearch)
