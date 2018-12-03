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
import NavigationService from './NavigationService';

export class App extends Component {

  render() {
    const Container = createAppContainer(SwitchNavigator);
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
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center' }
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Dashboard: DashboardScreen,
    Schedule: ScheduleScreen,
    Message: MessageScreen,
    Profile: ProfileStackNavigator,
  },
  {
    initialRouteName: "Dashboard",
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'gray',
      showIcon: true
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
export default App;