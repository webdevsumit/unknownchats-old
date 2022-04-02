import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    View, 
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './../components/navbar';
import { getData } from '../localStorage';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import ConfirmDelete from '../components/confirmDelete';
import { setFakeProfileIdToOpen } from '../redux/states';


const AuthHome = ({navigation}) => {

    const { baseUrl } = useSelector(state=>state.state);
    const dispatch = useDispatch();

    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    const [search, setSearch] = useState('');

    const searchCollegeFilter = async (keyword)=>{
        await axios.get(
            `https://api.data.gov.in/resource/44bea382-c525-4740-8a07-04bd20a99b52?api-key=579b464db66ec23bdd0000017ff1eeedbf784c764c00093b957334c6&format=json&filters=College%20Name/`,
            {
                headers: {
                'Content-Type': "application/json",
                'Accept': "application/json",
                }  
            }        
        ).then(res=>{
            setData(res.data.records.filter(record=>record.college_name.toUpperCase().search(keyword)!==-1));
            
        }).catch(err=>console.log(err));
    }

    useEffect(()=>{
        fetchFakeProfiles();
    },[]);

    return(
        <View style={styles.container}>
            <Navbar navigation={navigation} />
            <View style={{flex:1, width: "100%", marginTop: 70}}>
                <View style={styles.buttonsContainer}>
                    <View style={{...styles.buttonView}}>
                        <View style={{...styles.buttonProfile, padding: 0}}>
                            <TextInput
                                style={styles.searchTextInput}
                                value={search}
                                onChange={({ nativeEvent: { eventCount, target, text} })=>{
                                    setSearch(text);
                                    if (text.length>5){
                                        searchCollegeFilter(text);
                                    }
                                }}
                                placeholder="Search by college name"
                            />
                        </View>
                    </View>
                </View>
                <ScrollView contentContainerStyle={{...styles.buttonsContainer}}>
                {data.map((college)=>{
                    return(
                        <View key={college.s_no} style={styles.buttonView}>
                            <View style={styles.buttonProfile}>
                                <TouchableOpacity onPress={()=>{
                                    setCollege(college.college_name);
                                    navigation.navigate('UnknownAccountSetup');
                                    }}>
                                    <View style={styles.button}>
                                        <Text style={styles.buttonText}>{college.college_name}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        )
                    })}
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
      backgroundColor: '#eee',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    buttonsContainer: {
        // flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonView: {
        paddingTop: 5,
        paddingBottom: 5,
        width: "90%",
        borderRadius: 20,
    },
    buttonProfile: {
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "space-between",
      },
    button: {
        flex:1,
        alignItems: "center",
        flexDirection: "row",
        // justifyContent: "space-between",
      },
    buttonText: {
        fontSize: 18,
        // fontWeight: "bold",
        fontFamily: 'serif',
        paddingLeft: 20,
    },
    searchTextInput: {
        backgroundColor: '#fff',
        height: 40,
        margin: 5,
        // borderWidth: 1,
        padding: 10,
        paddingLeft:15,
        width: '90%',
    },
  });