import { StackNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from '../Containers/LoginScreen'
import CalendarScreen from '../Containers/CalendarScreen'
import RecommendationScreen from '../Containers/RecommendationScreen'
import DayScreen from '../Containers/DayScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  CalendarScreen: { screen: CalendarScreen },
  RecommendationScreen: { screen: RecommendationScreen },
  DayScreen: { screen: DayScreen },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: { title: 'Login' }
  }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'DayScreen',
  navigationOptions: {
    header: {
      style: styles.header
    }
  }
})

export default PrimaryNav
