import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Settings = () => {
    return(
        <View style={styles.container}>
            <Text>Settings</Text>
        </View>
    )
}

export default Settings;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });