import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    View, 
    StyleSheet,
    Text,
    Image,
    TouchableHighlight,
    ScrollView,
} from 'react-native';
import NormalButton from '../components/normalButton';
import { useSelector } from 'react-redux';
import Navbar from './../components/navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData } from '../localStorage';

const AuthHome = ({navigation}) => {

    const { baseUrl } = useSelector(state=>state.state);
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    const fetchFakeProfiles = async ()=>{
        await axios.get(
            `${baseUrl}getFakeProfiles/`,
            {
                headers: {
                'Content-Type': "application/json",
                'Accept': "application/json",
                'Authorization': `Token ${await getData('token')}` 
                }  
            }        
        ).then(res=>{
            console.log(res.data);
            if (res.data.status==="success"){
                setData(res.data.earlierProfiles);
            }else{
                setError(res.data.message);
            }
        }).catch(err=>console.log(err));
    }

    useEffect(()=>{
        fetchFakeProfiles();
    },[]);


    return(
        <View style={styles.container}>
            <Navbar navigation={navigation} />
            <View style={{flex:1, width: "100%", marginTop: 70}}>
                <ScrollView contentContainerStyle={{...styles.buttonsContainer}}>
                {data.map((profile)=>{
                    return(<>
                        <View key={profile.id} style={styles.buttonView}>
                            <TouchableHighlight onPress={()=>navigation.navigate('AuthHome')}>
                                <View style={styles.button}>
                                    <Image source={{uri:profile.profilePicture}}/>
                                    <Text style={styles.buttonText}>{profile.displayName}</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </>)
                })}

                {/* <View style={styles.buttonView}>
                    <TouchableHighlight onPress={()=>navigation.navigate('Login')}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>College</Text>
                        </View>
                    </TouchableHighlight>
                </View> */}

                </ScrollView>
            </View>
        </View>
    )
}

export default AuthHome;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    buttonsContainer: {
        // flex: 1,
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