import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStackNavigator, createAppContainer, createSwitchNavigator, TabBarBottom, createBottomTabNavigator } from 'react-navigation';
import LoginScreen from './components/screens/LoginScreen';
import { createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import RecoveryScreen from './components/screens/RecoveryScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import ScheduleScreen from './components/screens/ScheduleScreen';
import DashboardScreen from './components/screens/DashboardScreen';
import MessageScreen from './components/screens/MessageScreen';
import RegistrationScreen from './components/screens/RegistrationScreen';

export class App extends Component {
  render() {
    //const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={createStore(reducers)}>
        <StackNavigator />
      </Provider>
    );
  }
}

const StackNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    ForgotUser: RecoveryScreen,
    ForgotPassword: RecoveryScreen,
    Signup: RegistrationScreen
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Dashboard: DashboardScreen,
    Schedule: ScheduleScreen,
    Message: MessageScreen,
    Profile: ProfileScreen,
  },
  {
    initialRouteName: "Dashboard",
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
);

const SwitchNavigator = createSwitchNavigator(
  {
    Auth: StackNavigator,
    Main: TabNavigator
  }
)

export default createAppContainer(SwitchNavigator);