import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    View, 
    StyleSheet,
    Text,
    TouchableHighlight,
    TextInput,
    Image,
    Platform,
} from 'react-native';


const FakeAccount = ({navigation}) => {

    return(
        <View style={styles.container}>
            <Text>Account</Text>
        </View>
    )
}

export default FakeAccount;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      backgroundColor: '#eee',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
});