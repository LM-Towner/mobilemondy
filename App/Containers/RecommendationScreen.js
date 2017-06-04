import React, { PropTypes } from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  LayoutAnimation
} from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/LoginScreenStyles'
import {Images, Metrics} from '../Themes'
import LoginActions from '../Redux/LoginRedux'

// api call to check if everyone is done swiping
// if everyone is done swiping
// show top recommendations
// but if some people are still swiping
// this.props.navigation.navigate('CalendarScreen')
// and show who still hasnt finished swiping

class RecommendationScreen extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    attemptLogin: PropTypes.func
  }

  // isAttempting = false
  // keyboardDidShowListener = {}
  // keyboardDidHideListener = {}

  constructor (props) {
    super(props)
    this.state = {
      resultName: '',
      resultsUrl: ''
    }
    // this.isAttempting = false
  }

  requestData() {
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

        const winner = recommendations[0];

        this.setState({
          // dataSource: ds.cloneWithRows(users),
          resultUrl: winner[0],
          resultName: winner[1]
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

  componentWillReceiveProps (newProps) {
    // this.forceUpdate()
    // Did the login attempt complete?
    // if (this.isAttempting && !newProps.fetching) {
    //   this.props.navigation.goBack()
    // }
  }

  componentWillMount () {
    this.requestData();
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    // this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    // this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount () {
    // this.keyboardDidShowListener.remove()
    // this.keyboardDidHideListener.remove()
  }

  keyboardDidShow = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    let newSize = Metrics.screenHeight - e.endCoordinates.height
    this.setState({
      visibleHeight: newSize,
      topLogo: {width: 100, height: 70}
    })
  }

  keyboardDidHide = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight,
      topLogo: {width: Metrics.screenWidth}
    })
  }

  render () {
    const { username, password } = this.state
    const { fetching } = this.props
    const editable = !fetching
    const textInputStyle = editable ? styles.textInput : styles.textInputReadonly
    return (
      <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[styles.container, {height: this.state.visibleHeight}]} keyboardShouldPersistTaps='always'>
        <View style={[styles.row, {alignContent: 'center'}]}>
          <Text style={[styles.rowLabel, {textAlign: 'center', fontSize: 20}]}>
            {this.state.resultName}
          </Text>

          <Image
            style={{width: 250, height: 250}}
            source={{uri: this.state.resultUrl}}
          />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendationScreen)
