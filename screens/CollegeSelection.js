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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


const CollegeSelection = ({navigation}) => {

    const { baseUrl } = useSelector(state=>state.state);
    const dispatch = useDispatch();
    
    const [data, setData] = useState([]);
    const [origtinalData, setOrigtinalData] = useState([]);
    const [error, setError] = useState('');

    const [search, setSearch] = useState('');

    const fetchColleges = async ()=>{
        await axios.get(
            `${baseUrl}getColleges/`,
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
                setOrigtinalData(res.data.data);
            }else{
                setError(res.data.message);
                console.log(res.data.message);
            }
        }).catch(err=>console.log(err));
    }

    const setCollege = async (college)=>{
        await axios.post(
            `${baseUrl}setCollege/`,
            {
                collegeName:college.toUpperCase(),
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
                navigation.navigate('UnknownAccountSetup');
            }else{
                setError(res.data.message);
                console.log(res.data.message);
            }
        }).catch(err=>console.log(err));
    }

    const searchCollegeFilter = (keyword)=>{
        setData(origtinalData.filter(record=>record.collegeName.toUpperCase().search(keyword.toUpperCase())>-1));
    }

    useEffect(()=>{
        fetchColleges();
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
                                    searchCollegeFilter(text);
                                }}
                                placeholder="Search by college name or use short name ex. BU"
                            />
                        </View>
                    </View>
                </View>
                <ScrollView contentContainerStyle={{...styles.buttonsContainer}}>
                    {data.length===0 && <>
                        <Text style={{...styles.buttonText, fontSize:10}}>Please try to avoid duplicates.</Text>

                        <View style={styles.buttonView}>
                            <View style={{...styles.buttonProfile, backgroundColor:"#DDDDDD"}}>
                                <TouchableOpacity onPress={()=>{
                                    setCollege(search);
                                    }}>
                                    <View style={{...styles.button, justifyContent: "center"}}>
                                        <Ionicons name="add" size={24} color="black" />
                                        <Text style={{...styles.buttonText, fontWeight:"bold"}}>Add This College Name</Text>
                                    </View>
                                            
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>}
                {data.map((college)=>{
                    return(
                        <View key={college.id} style={styles.buttonView}>
                            <View style={styles.buttonProfile}>
                                <TouchableOpacity onPress={()=>{
                                    setCollege(college.collegeName);
                                    }}>
                                    <View style={styles.button}>
                                        <Text style={styles.buttonText}>{college.collegeName}</Text>
                                        <View style={styles.member}>
                                            <MaterialCommunityIcons name="account-multiple" size={24} color="black" />
                                            <Text style={{...styles.buttonText, marginLeft: 0, paddingLeft: 2, marginRight:10, fontWeight:"bold"}}>{college.numberOfTimeSelected}</Text>
                                        </View>
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

export default CollegeSelection;

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
        // width:"100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
      },
    member: {
        // flex:1,
        // width:"50%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-start",
        marginLeft:10,
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