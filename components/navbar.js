import React from 'react';
import { 
    View, 
    StyleSheet, 
    Image,
    Text,
    TouchableOpacity,
    StatusBar,
} from 'react-native';

const Navbar = ({navigation}) => {

    return(
        <View style={styles.upperContainer}>
            <View style={styles.navContainer}>
                <Image style={styles.logo} source={require('./../assets/images/logo.png')}/>
                <Text style={styles.mainText}>
                    Unknown Chats
                </Text>
            </View>
            <View style={styles.navContainer}>
                <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                    <View style={styles.button}>
                        <Image style={styles.accountLogo} source={require('./../assets/images/account.png')}/>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Navbar;

const styles = StyleSheet.create({
    upperContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 70,
      width: "100%",
      flexDirection: 'row',
      paddingTop: StatusBar.currentHeight,
      position: 'absolute',
      top: 0,
      left: 0,
      paddingLeft: 10,
      paddingRight: 10,
      borderBottomColor: '#aaa',
      borderBottomWidth: 2,
    },
    navContainer: {
    //   flex: 1,
    //   backgroundColor: '#fff',
      alignItems: 'center',
    //   justifyContent: 'center',
      flexDirection: 'row',
    },
    logo: {
        transform: [{ scale: 1 }],
        height: 30,
        width: 30,
    },
    mainText: {
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: 'serif',
        marginLeft: 10,
    },
    accountLogo: {
        transform: [{ scale: 1 }],
        height: 30,
        width: 30,
    },
  });