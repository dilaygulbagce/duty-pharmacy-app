import React, { useState, useEffect } from 'react';
import { Text, Button, StyleSheet, View, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import axios from 'axios'
import * as Location from "expo-location";
import getDistance from '../utility/calculator';

const HomeScreen = ({ navigation }) => {

  const [resultDataList, setResults] = useState([]);
  const [locations, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const apiResponse = async () => {

      const response = await axios.get("https://www.nosyapi.com/apiv2/pharmacy?city=Edirne", {
        headers: {
          "authorization": "Bearer oREEm79lNZP6jwjhwIGQsYjXotgaYMiJgUc5lLDHV4VeoQYVO9VLyQsBbXLS",
          "content-type": "application/json"
        }
      });
      setResults(response.data.data);
    }
    apiResponse();
  }, [])

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMessage('Permission to access location was denied');
        console.log(errorMessage);
        return;
      }
      
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
    if(locations == null){
      return <View>
        <Text> Lütfen konum servislerine izin veriniz </Text>
      </View>
    }
      return <View style={styles.anaEkran} >
    <Image
      style={styles.gif}
      source={require('../../assets/nobetci-eczaneler.gif')}
      resizeMode='contain'
    />

    <FlatList
      data = {resultDataList}
      keyExtractor = {resultDataList => resultDataList.Telefon}
      renderItem = {({item}) => {
        return <TouchableOpacity
          onPress={() => {
            navigation.navigate('Maps', {
              items: item,
              location: locations
            });
          }}>
          <View style={styles.eczaneBilgileri}>
          <Text>Eczane Adı: {item.EczaneAdi}</Text>
          <Text>İlçe: {item.ilce}</Text>
          <Text>Adres: {item.Adresi}</Text>
          <Text>Telefon Numarası: {item.Telefon}</Text>
          <Text>Uzaklık: {Math.round(getDistance(item.latitude,item.longitude,locations.coords.latitude,locations.coords.longitude))} KM</Text>
          </View>
        </TouchableOpacity>
      }}
    ></FlatList>
  </View>
  }

const styles = StyleSheet.create({
  anaEkran: {
    backgroundColor: 'white',
  },
  gif: {
    width: Dimensions.get("screen").width,
    height: 100
  },
  eczaneBilgileri: {
    color: 'black',
    fontSize: 15,
    marginHorizontal: 10,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#800000',
    borderRadius: 8,
    margin: 5,
  },
});

export default HomeScreen;