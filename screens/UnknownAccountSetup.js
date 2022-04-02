import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    View, 
    StyleSheet,
    Text,
    TouchableHighlight,
} from 'react-native';
import Navbar from '../components/navbar';
import { getData } from '../localStorage';
import { useDispatch, useSelector } from 'react-redux';
import { setFakeProfileIdToOpen } from '../redux/states';

const PlatformSelection = ({navigation}) => {

    const dispatch = useDispatch();

    const { baseUrl } = useSelector(state=>state.state);

    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    const fetchPlateforms = async ()=>{
        await axios.get(
            `${baseUrl}getChatingPlatforms/`,
            {
                headers: {
                'Content-Type': "application/json",
                'Accept': "application/json",
                'Authorization': `Token ${await getData('token')}` 
                }  
            }        
        ).then(res=>{
            if (res.data.status==="success"){
                setData(res.data.data);
            }else{
                setError(res.data.message);
                console.log(res.data.message);
            }
        }).catch(err=>console.log(err));
    }

    const setPlateform = async (id, platformNumber)=>{
        await axios.post(
            `${baseUrl}setTypeInFakeProfile/`,{
                id:id
            },
            {
                headers: {
                'Content-Type': "application/json",
                'Accept': "application/json",
                'Authorization': `Token ${await getData('token')}` 
                }  
            }        
        ).then(res=>{
            if (res.data.status==="success"){
                setData(res.data.data);
                if(platformNumber==="2"){
                    navigation.navigate('CollegeSelection');
                }else{
                    dispatch(setFakeProfileIdToOpen(res.data.id));
                    navigation.navigate('UnknownAccountSetup');
                }
            }else{
                setError(res.data.message);
                console.log(res.data.message);
            }
        }).catch(err=>console.log(err));
    }

    useEffect(()=>{
        fetchPlateforms();
    },[]);

    return(
        <View style={styles.container}>
            <Navbar navigation={navigation} />
            <View style={styles.buttonsContainer}>
                {data.map(platform=>
                    <View key={platform.id} style={styles.buttonView}>
                        <TouchableHighlight onPress={()=>setPlateform(platform.id, platform.platformNumber)}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>{platform.platformName}</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                )}
            </View>
        </View>
    )
}

export default PlatformSelection;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      backgroundColor: '#eee',
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
        backgroundColor: "#FFF",
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