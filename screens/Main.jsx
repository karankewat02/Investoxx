import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Profolio from "../components/Profolio";
import Watchlist from "../components/Watchlist";
import Profile from "../components/Profile";


const Tab = createMaterialBottomTabNavigator();
const Main = () => {
  return (
    <Tab.Navigator
      initialRouteName="Portfolio"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: "#694fad" }}
    >
      <Tab.Screen name="Portfolio" component={Profolio} />
      <Tab.Screen name="Watchlist" component={Watchlist} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Main;

const styles = StyleSheet.create({});
