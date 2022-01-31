import React, { useState } from 'react';
import { StyleSheet, View, Button, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Linking from "expo-linking";

const MapsScreen = ({ navigation }) => {
  let eczaneLat = navigation.state.params.items.latitude
  let eczaneLon = navigation.state.params.items.longitude
  let phoneNumber = navigation.state.params.items.Telefon;
  let location = navigation.state.params.location;

  const [mapRegion, setmapRegion] = useState({
    latitude: parseFloat(eczaneLat),
    longitude: parseFloat(eczaneLon),
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  
  return <View>
    <MapView
      region={mapRegion}
      style={styles.map}
    >
      <Marker
        coordinate={mapRegion}
        title={navigation.state.params.items.EczaneAdi}
        description={navigation.state.params.items.Adresi}
      />
    </MapView>
    <Button
      color = "black"
      title = "Yol Tarifi"
      onPress={() =>
        Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${mapRegion.latitude},${mapRegion.longitude}&origin=${location.coords.latitude},${location.coords.longitude}`)}
    />

    <Button
      color = "black"
      title = "Eczaneyi Ara"
      onPress={() =>
        Linking.openURL(`tel:${phoneNumber}`)}
    />
  </View>
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get("screen").width,
    height: 530,
  },
});

export default MapsScreen;