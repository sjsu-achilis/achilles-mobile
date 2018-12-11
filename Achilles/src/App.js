import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStackNavigator, createAppContainer, createSwitchNavigator, TabBarBottom, createBottomTabNavigator } from 'react-navigation';
import LoginScreen from './components/screens/LoginScreen';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import RecoveryScreen from './components/screens/RecoveryScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import ScheduleScreen from './components/screens/ScheduleScreen';
import DashboardScreen from './components/screens/DashboardScreen';
import MessageScreen from './components/screens/MessageScreen';
import InjuryReportScreen from './components/screens/InjuryReportScreen';
import QuestionnaireScreen from './components/screens/QuestionnaireScreen';
import RegistrationScreen from './components/screens/RegistrationScreen';
import SessionScreen from './components/screens/SessionScreen';
import NavigationService from './NavigationService';
import Ionicons from 'react-native-vector-icons/Ionicons';
export class App extends Component {

  render() {
    const Container = createAppContainer(SwitchNavigator);
    console.disableYellowBox = true;
    //const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Container ref={navigatorRef => { NavigationService.setTopLevelNavigator(navigatorRef); }} >
          <SwitchNavigator />
        </Container>
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

const ProfileStackNavigator = createStackNavigator(
  {
    Profile: ProfileScreen,
    InjuryReport: InjuryReportScreen,
    Questionnaire: QuestionnaireScreen,
  },
  {
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Dashboard: DashboardScreen,
    Schedule: ScheduleScreen,
    Session: SessionScreen,
    Message: MessageScreen,
    Profile: ProfileStackNavigator,
  },
  {
    initialRouteName: "Dashboard",
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'black',
      showIcon: true,
      activeBackgroundColor: '#f4511e',
      inactiveBackgroundColor: '#f4511e'
    },
    animationEnabled: false,
    swipeEnabled: false,

  }
);

ProfileStackNavigator.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ tintColor }) => <Ionicons name="md-person" size={25} />
};

const SwitchNavigator = createSwitchNavigator(
  {
    Auth: StackNavigator,
    Main: TabNavigator
  }
)
export default App;