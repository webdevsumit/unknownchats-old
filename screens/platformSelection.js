import React from 'react';
import { 
    View, 
    StyleSheet,
    Text,
    TouchableHighlight,
} from 'react-native';
import Navbar from '../components/navbar';

const PlatformSelection = ({navigation}) => {
    return(
        <View style={styles.container}>
            <Navbar navigation={navigation} />
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonView}>
                    <TouchableHighlight onPress={()=>navigation.navigate('Login')}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Open World</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.buttonView}>
                    <TouchableHighlight onPress={()=>navigation.navigate('Login')}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>College</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    )
}

export default PlatformSelection;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    buttonsContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 50,
      },
    buttonText: {
        fontSize: 36,
        fontWeight: "bold",
        fontFamily: 'serif',
    },
    buttonView: {
        paddingTop: 10,
        paddingBottom: 20,
        width: "80%",
    },
  });