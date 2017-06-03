import React from 'react'
import { ListView, Text, Image, View } from 'react-native'
import styles from './Styles/LaunchScreenStyles'
import Calendar from '../Components/Calendar'

export default class CalendarScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date()
        };
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

    handleDateSelect(date) {
      this.props.navigation.navigate('DayScreen')
    }

    render() {
        return (
            <Calendar
                date={this.state.date}
                onPrevButtonPress={() => this.handlePrevButtonPress()}
                onNextButtonPress={() => this.handleNextButtonPress()}
                onDateSelect={(date) => this.handleDateSelect(date)}
            />
        );
    }
}