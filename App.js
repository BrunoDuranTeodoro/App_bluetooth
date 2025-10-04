import React, { useState, useEffect} from "react";
import {View, Text, Button, Flatlist, StyleSheet, PermissionsAndroid, Platform} from 'react-native';

const manager =  new BleManeger();

function BleScannerComponent(){

  const [devices, setDevices] = useState([]);

  const[radioPowerOn, setRadioPowerOn] = useState(false);


  useEffect(() => {
    const subscription = manager.onStateChange((state) => {
      if(state === 'PoweredOn'){
        setRadioPowerOn(true);
        subscription.remove();
      }
  }, true);
  return () => {
    subscription.remove();
    manager.destroy();
  }
}, []);

  const resquestBluetoothPermission = async () => {
      const apiLevel = parseInt(Platform.Version.toString(),10);

      if(apiLevel , 31){
        const grant = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permissão de Localização',
            message: 'O app precisa de acesso à sua localização para scannear dispositivos bluetooth',
            buttonPositive: 'Ok'
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      
      else{
        const result = await PermissionsAndroid.requestMultiple(
          [
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ]);
          return (
            result[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] === PermissionsAndroid.RESULTS.GRANTED && 
            result[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] === PermissionsAndroid.RESULTS.GRANTED &&
            result[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] === PermissionsAndroid.RESULTS.GRANTED
          ) 
      }
  }
}export default BleScannerComponent;