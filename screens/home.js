import React, { useEffect } from 'react';
import axios from 'axios';
import { 
    View, 
    StyleSheet,
    Text,
    ImageBackground,
} from 'react-native';
import NormalButton from '../components/normalButton';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLogin } from './../redux/states';
import { getData } from '../localStorage';


const Home = ({navigation}) => {

    const { baseUrl } = useSelector(state=>state.state);
    const dispatch = useDispatch();

    useEffect(async ()=>{
        user = await getData('username');
        token = await getData('token');
        if (!!!user && !!!token){
            dispatch(setIsLogin(true));
            navigation.navigate('AuthHome');
        }
    },[]);
    return(
        <View style={styles.container}>
            <ImageBackground style={styles.bcImageContainer} resizeMode="cover" source={require('./../assets/icon.png')} >
                <View style={styles.extraTextContainer}>
                    <Text>
                        
                    </Text>
                </View>
                <View style={styles.extraTextContainer}>
                    <Text>
                        
                    </Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <NormalButton
                        buttonText="CREATE ACCOUNT"
                        extendedStyle={{backgroundColor:"#DDDDDD", color: "#000000", borderColor:"#DDDDDD"}}
                        onPress={()=>navigation.navigate('Signup')}
                    />
                    <NormalButton
                        buttonText="LOGIN"
                        extendedStyle={{backgroundColor:"rgba(52, 52, 52, 0)", color: "#000000", borderColor:"#000000"}}
                        onPress={()=>navigation.navigate('Login')}
                    />
                </View>
            </ImageBackground>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      width: '100%',
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    bcImageContainer: {
      flex: 1,
      height: '60%',
      width: '100%',
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    extraTextContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonsContainer: {
        flex: 1,
        // flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
  });