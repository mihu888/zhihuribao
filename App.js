import { Text, StyleSheet, View, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NativeDevSettings from 'react-native/Libraries/NativeModules/specs/NativeDevSettings';
import mainscreen from './screen/main';
import newsscreen from './screen/news';
import commentscreen from './screen/comment';

const stack = createNativeStackNavigator();

function MyApp() {
  // Assign this to a dev-only button or useEffect call
  const connectToRemoteDebugger = () => {
    NativeDevSettings.setIsDebuggingRemotely(true);
  };
}

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <stack.Navigator initialRouteName='main' screenOptions={{headerShown:false}}>
          <stack.Screen name='main' component={mainscreen}/>
          <stack.Screen name='news' component={newsscreen}/>
          <stack.Screen name='comment' component={commentscreen}/>
        </stack.Navigator>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  v:{
    flex:1
  },
  vu:{
    flex:1
  },
  vd:{
    flex:10
  },
})