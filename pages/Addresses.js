// AddressesScreen.js
import React, { useState,useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity,ScrollView,Share, Linking ,Platform ,Modal} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import axios from 'axios';
import { useLocation } from '../components/LocationContext';

const JangoAddressScreen = () => {
  const [jangoAddresses, setJangoAddresses] = useState([]);
  const { userLocation, getLocation } = useLocation();

  useEffect(() => {
    // Access userLocation here
    console.log('User Location:', userLocation);
  }, [userLocation]);
 
  useEffect(() => {
    const fetchJangoAddresses = async () => {
      try {
        const response = await axios.get('https://jango-api-dev.jangoaddress.com/getMyJanGoAddresses.php?created_by=e5b8868dd8a9877b');
        if (response.status === 200) {
          setJangoAddresses(response.data.list); // Assuming the addresses are in the response.data.list
          console.log('Jango Screen API Response:', response.data); // Log the API response
        } else {
          console.error('Failed to fetch Jango addresses. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching Jango addresses:', error);
      }
    };

    fetchJangoAddresses();
  }, []);



  


  
  //home address end

  const handlegetDirections = (destinationLatitude, destinationLongitude) => {
    console.log('Getting directions...');
  
    // Define the map URL scheme based on the platform
    const scheme = Platform.select({
      ios: 'maps://',
      android: 'geo:',
    });
  
    // Check if the device supports the map URL scheme
    Linking.canOpenURL(scheme).then((supported) => {
      if (!supported) {
        setError(`Maps app is not installed for scheme: ${scheme}`);
        return;
      }
  
      // Construct the maps URL with origin and destination coordinates
      const mapsUrl = `${scheme}origin=${userLocation.latitude},${userLocation.longitude}&destination=${destinationLatitude},${destinationLongitude}`;
      
      // Open the maps app with the constructed URL
      Linking.openURL(mapsUrl);
    });
  
    // Log the coordinates for reference
    console.log('API Call Coordinates:', {
      originLatitude: userLocation.latitude,
      originLongitude: userLocation.longitude,
      destinationLatitude,
      destinationLongitude,
    });
  };

  const handleShareAddressJango = (jangoAddress) => {
    const shareMessage = `Address: ${jangoAddress.modified_formatted_address}`;

    Share.share({
      message: shareMessage,
    })
      .then(result => console.log(result))
      .catch(errorMsg => console.log(errorMsg));
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}  showsVerticalScrollIndicator={false}>
    {Array.isArray(jangoAddresses) && jangoAddresses.length > 0 ? (
      jangoAddresses.map((jangoAddress, index) => (
        <View key={index} style={styles.subAddressItemContainer}>
        <TouchableOpacity onPress={() => handlegetDirections(jangoAddress.latitude, jangoAddress.longitude)} style={styles.NotificationIconcontainer}>
  <Image source={require("../assets/images/direction.png")} style={styles.directionIcon} />
</TouchableOpacity>
          <TouchableOpacity onPress={() => handleShareAddressJango(jangoAddress)}style={styles.NotificationIconcontainer}>
            <Image source={require("../assets/images/shareDirection.png")} style={styles.dotIcon} />
          </TouchableOpacity>
          <Text style={styles.addressText}> <Text style={styles.addressLine11}>{jangoAddress.modified_formatted_address.split(', ')[0]}</Text>
                  {'\n'}
          <Text style={styles.addressLine22}>{jangoAddress.modified_formatted_address.split(', ').slice(1).join(', ')}</Text></Text>
          {/* Add any other address details you want to display */}
        </View>
      ))
    ) : (
      <Text>No Jango Addresses available</Text>
    )}
  </ScrollView>
  );
};



// const JangoAddressScreen = ({ route }) => {
//   const { jangoAddresses } = route.params || {};
  
//   const handlegetDirections = () => {
//     console.log('Getting directions...');
//     // Implement your logic for getting directions
//   };

//   const handleshareAddress = () => {
//     console.log('Sharing address...');
//     // Implement your logic for sharing the address
//   };

//   return (
//     <View style={[styles.scene, styles.jangoScene]}>
//       <View style={styles.SubsaveAddressContainer}>
//         {Array.isArray(jangoAddresses) && jangoAddresses.length > 0 ? (
//           jangoAddresses.map((jangoAddress, index) => (
//             <View key={index} style={styles.subAddressItemContainer}>
//               <TouchableOpacity onPress={handlegetDirections} style={styles.NotificationIconcontainer}>
//                 <Image source={require("../assets/images/direction.png")} style={styles.directionIcon} />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={handleshareAddress} style={styles.NotificationIconcontainer}>
//                 <Image source={require("../assets/images/shareDirection.png")} style={styles.dotIcon} />
//               </TouchableOpacity>
//               <Text style={styles.addressText}>
//                 {jangoAddress.modified_formatted_address || 'Address Not Available'}
//               </Text>
//               {/* Add any other address details you want to display */}
//             </View>
//           ))
//         ) : (
//           <Text>No Jango Addresses available</Text>
//         )}
//       </View>
//     </View>
//   );
// };

const AliasAddressScreen = () => {
  const [myAliasAddresses, setMyAliasAddresses] = useState([]);
  const { userLocation, getLocation } = useLocation();

  useEffect(() => {
    // Access userLocation here
    console.log('User Location:', userLocation);
  }, [userLocation]);
  useEffect(() => {
    const fetchMyAliasAddresses = async () => {
      try {
        const userId = 'e5b8868dd8a9877b'; // Your user ID, replace with the actual value
        const response = await axios.get(`https://jango-api-dev.jangoaddress.com/getMyAliasAddresses.php?id=${userId}`);
        if (response.status === 200) {
          setMyAliasAddresses(response.data.list); // Assuming the addresses are in the response.data.list
          console.log('My Alias Addresses API Response:', response.data); // Log the API response
        } else {
          console.error('Failed to fetch MyAliasAddresses. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching MyAliasAddresses:', error);
      }
    };

    fetchMyAliasAddresses();
  }, []);

  const handlegetDirections = (latitude, longitude) => {
    console.log("Alias Latitude:", latitude);
    console.log("Alias Longitude:", longitude);
  
    const scheme = Platform.select({
      ios: 'maps://',
      android: 'geo:',
    });
  
    Linking.canOpenURL(scheme).then((supported) => {
      if (!supported) {
        setError(`Maps app is not installed for scheme: ${scheme}`);
        return;
      }
  
      const currentLatitude = userLocation.latitude; // Assuming userLocation is accessible here
      const currentLongitude = userLocation.longitude;
  
      const mapsUrl = `${scheme}origin=${currentLatitude},${currentLongitude}&destination=${latitude},${longitude}`;
      
      // Uncomment the next line if you want to use the Google Maps URL directly
      // const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${currentLatitude},${currentLongitude}&destination=${latitude},${longitude}`;
      
      console.log('Opening Maps with URL:', mapsUrl);
  
      Linking.openURL(mapsUrl);
    });
  };
  

  const handleShareAddress = (formattedAddress) => {
    Share.share({
      message: formattedAddress,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}  showsVerticalScrollIndicator={false}>
    {Array.isArray(myAliasAddresses) && myAliasAddresses.length > 0 ? (
      myAliasAddresses.map((aliasAddress, index) => (
        <View key={index} style={styles.subAddressItemContainer}>
   <TouchableOpacity onPress={() => handlegetDirections(aliasAddress.latitude, aliasAddress.longitude)} style={styles.NotificationIconcontainer}>
  <Image source={require("../assets/images/direction.png")} style={styles.directionIcon} />
</TouchableOpacity>


          {/* <TouchableOpacity onPress={handlegetDirections} style={styles.NotificationIconcontainer}>
            <Image source={require("../assets/images/direction.png")} style={styles.directionIcon} />
          </TouchableOpacity> */}
          {/* onPress={() => handleShareAddress(jangoAddress)} */}
          <TouchableOpacity onPress={() => handleShareAddress(aliasAddress.formatted_address)} style={styles.NotificationIconcontainer}>
              <Image source={require("../assets/images/shareDirection.png")} style={styles.dotIcon} />
            </TouchableOpacity>
          <Text style={styles.addressTextAlias}>{aliasAddress.alias_name}</Text>
          {/* Add any other address details you want to display */}
        </View>
      ))
    ) : (
      <Text>No Alias Addresses available</Text>
    )}
  </ScrollView>
  );
};
const HomeWorkScreen = () => {
  const [homeAddresses, setHomeAddresses] = useState([]);
  const [workAddresses, setWorkAddresses] = useState([]);
  const [workAddressExists, setWorkAddressExists] = useState(false);
  const [workAddress, setWorkAddress] = useState('');

  const [moreModalVisible, setMoreModalVisible] = useState(false);
  // Define userId outside the useEffect so that it's accessible
  const userId = 'e5b8868dd8a9877b';

  useEffect(() => {
    const fetchHomeAddresses = async () => {
      try {
        const response = await axios.get(`https://jango-api-dev.jangoaddress.com/getMyHomeAddresses.php?id=${userId}`);
        setHomeAddresses(response.data);
        console.log('Home Addresses:', response.data);
      } catch (error) {
        console.error('Error fetching home addresses:', error);
      }
    };

    const fetchWorkAddresses = async () => {
      try {
        const response = await axios.get(`https://jango-api-dev.jangoaddress.com/getMyWorkAddresses.php?id=${userId}`);
        setWorkAddresses(response.data);

        // Check if work addresses exist
        setWorkAddressExists(response.data && response.data.list && response.data.list.length > 0);

        // Set the first work address if available
        if (response.data.list && response.data.list.length > 0) {
          setWorkAddress(response.data.list[0].formatted_address);
        }

        console.log('Work Addresses:', response.data);
      } catch (error) {
        console.error('Error fetching work addresses:', error);
      }
    };

    // Fetch both home and work addresses
    fetchHomeAddresses();
    fetchWorkAddresses();
  }, [userId]);// Dependency array includes userId so that it re-fetches when userId changes
// Empty dependency array to fetch data only once when the component mounts

const handleMore = () => {
  console.log("Received a more5");
  setMoreModalVisible((prevVisibility) => !prevVisibility); // Toggle modal visibility
};
  const createUserWorkAddress = () => {
    // Implement the logic for handling 'More' button press
  };
  return (
    <View style={[styles.scene, styles.homeWorkScene]}>
      <View style={styles.homeAddressContainer}>
        <Text style={styles.homeAddressText}>Home Address</Text>
        <TouchableOpacity onPress={handleMore} style={styles.NotificationIconcontainer}>
          <Image source={require("../assets/images/dots.png")} style={styles.dotIcon} />
        </TouchableOpacity>
       
        {homeAddresses.list && homeAddresses.list.length > 0 && (
          <View style={styles.addressDetailsContainer}>
              {/* <Text style={styles.HomeaddressText}>
  <Text style={styles.homeAddressLine1}>{homeAddresses.list[0].formatted_address.split(',')[0]}</Text>
  {'\n'}
  <Text style={styles.homeAddressLine2}>{homeAddresses.list[0].formatted_address.split(',').slice(1).join(',')}</Text>
           
           
            </Text> */}
            <View style={styles.addressDetailsContainer}>
  <Text style={styles.addressLine1}>{homeAddresses.list[0].formatted_address.split(',')[0]}</Text>
  <Text style={styles.addressLine2}>{homeAddresses.list[0].formatted_address.split(',').slice(1).join(',')}</Text>
</View>

            
          </View>
        )}
            <Modal
        transparent
        visible={moreModalVisible}
        animationType="slide"
        onRequestClose={() => setMoreModalVisible(false)}
      >
        <View style={styles.moreModalContainer}>
        <TouchableOpacity style={styles.moreOption} onPress={() => console.log("Edit pressed")}>
      <View style={styles.editContainer}>
        <Image
          source={require('../assets/images/deleteModelIcon.png')}
          style={styles.editImage}
        />
        <Text style={styles.moreOptionText}>Edit</Text>
      </View>
              </TouchableOpacity>
              <View style={styles.line} />
          <TouchableOpacity style={styles.moreOption} onPress={() => console.log("Delete pressed")}>
          <View style={styles.editContainer}>
        <Image
          source={require('../assets/images/deleteModelIcon.png')}
          style={styles.editImage}
        />
        <Text style={styles.moreOptionText}>Delete</Text>
      </View>
          </TouchableOpacity>
        </View>
      </Modal>
      </View>


      <View style={styles.workAddressContainer}>
  <Text style={styles.homeAddressText}>Work Address</Text>
        <TouchableOpacity onPress={handleMore} style={styles.NotificationIconcontainer}></TouchableOpacity>
        
        {/* workAddressExists */}
        
  {false ? (
    <View style={styles.addressDetailsContainer}>
      <Text style={styles.addressTextWork}>{workAddress}</Text>
    </View>
  ) : (
    <View style={styles.noAddressContainer}>
      <Text style={styles.noAddressText}>No Work Address</Text>
      <TouchableOpacity style={styles.editButton} onPress={createUserWorkAddress}>
        <Text style={styles.addAddressText}>+ Add</Text>
      </TouchableOpacity>
    </View>
  )}
</View>



{/* 
     
      <View style={styles.workAddressContainer}>
        <Text style={styles.homeAddressText}>Work Address</Text>
        <TouchableOpacity onPress={handleMore} style={styles.NotificationIconcontainer}></TouchableOpacity>
     
        {workAddressExists ? (
          <View style={styles.addressDetailsContainer}>
            <Text style={styles.addressTextWork}>{workAddress}</Text>
          </View>
        ) : (
          <View style={styles.workAddressContainer}>
            <Text style={styles.noAddressText}>No Work Address</Text>
            <TouchableOpacity style={styles.editButton} onPress={ createUserWorkAddress}>
                <Text style={styles.addAddressText}>+ Add</Text>
                
              </TouchableOpacity>
             
              


          </View>
        )}
      </View> */}
    
    </View>
  );
};


// const initialLayout = { width: Dimensions.get("window").width };

const Addresses = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "jango",
      title: "Jango Address",
      icon: require("../assets/images/circle.png"),
    },
    {
      key: "alias",
      title: "Alias Address",
      icon: require("../assets/images/AlisIcon.png"),
    },
    {
      key: "homeWork",
      title: "Home & Work",
      icon: require("../assets/images/homes.png"),
    },
  ]);

  const renderScene = SceneMap({
    jango: JangoAddressScreen,
    alias: AliasAddressScreen,
    homeWork: HomeWorkScreen,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      renderLabel={({ route, focused }) => (
        <View style={styles.tab}>
          <Image
            source={route.icon}
            style={[
              styles.tabIcon,
              { tintColor: focused ? "#00E" : "rgba(0, 0, 0, 0.75)" },
            ]}
          />
          <Text
            style={[
              styles.tabText,
              { color: focused ? "#00E" : "rgba(0, 0, 0, 0.75)" },
            ]}
          >
            {route.title}
          </Text>
        </View>
      )}
      style={styles.tabBar}
      indicatorStyle={styles.tabIndicator}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      // initialLayout={initialLayout}
    />
  );
};

const styles = StyleSheet.create({
  scrollViewContainer:{},
  scene: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tab: {
    flexDirection: "column", // Change to column direction
    alignItems: "center",
    justifyContent: "center",
  },
  tabIcon: {
    width: scale(24),
    height: verticalScale(24),
    marginRight: scale(5),
  },
  tabText: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: scale(10),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: verticalScale(14.4),
    letterSpacing: scale(0.4),
  },
  tabBar: {
    backgroundColor: '#fff',
  },
  tabIndicator: {
    backgroundColor: '#00E',
  },
  jangoScene: {},
  SubsaveAddressContainer: {
    width: scale(360),
    height: verticalScale(62),
    backgroundColor: 'rgba(0, 0, 238, 0.02)', // or your desired color
    top: verticalScale(-280),
  },
  NotificationIconcontainer: {
    top: verticalScale(25),
    alignSelf: 'flex-end',
    zIndex: 1,
  },
  directionIcon: {
    height: verticalScale(15),
    width: scale(15),
    marginRight: scale(35),
    top: verticalScale(-15),
    zIndex: 1,
  },
  
  // SubsaveAddressContainer: {
  //   width: 328,
  //   height: 443,
  //  alignSelf: 'center',
  //   // backgroundColor: "rgba(0, 0, 238, 0.02)",
  //   top: 10,
  // },
  subAddressItemContainer: {
    width: scale(328),
    height: verticalScale(43),
    backgroundColor: 'rgba(0, 0, 238, 0.02)',
    marginTop: verticalScale(10), // Add margin-top for the first item
    marginBottom: verticalScale(10),
    alignSelf: 'center',
  },
  addressTextAlias: {
    fontFamily: 'Inter',
    fontSize: scale(10),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: verticalScale(14.4),
    letterSpacing: scale(0.48),
    alignSelf: 'flex-start',
    top: verticalScale(-18),
    marginLeft: scale(20),
  },
  addressTextHome: {
    fontFamily: 'Inter',
    fontSize: scale(14),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: verticalScale(14.4),
    letterSpacing: scale(0.56),
    alignSelf: 'flex-start',
    marginLeft: scale(15),
    top: verticalScale(10),
  },
  addressTextWork: {
    fontFamily: 'Inter',
    fontSize: scale(14),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: verticalScale(14.4),
    letterSpacing: scale(0.4),
    alignSelf: 'flex-start',
    top: verticalScale(20),
    marginLeft: scale(15),
  },
  addAddressText: {
    color: '#0000ee',
    fontFamily: 'Inter-Regular',
    fontSize: scale(10),
    fontWeight: '400',
    alignSelf: 'center',
    top: 0,
    textAlign: 'center',
  },
  addressText: {
    flexDirection: 'column',
    paddingLeft: scale(10),
    top: verticalScale(-27),
  },
  
  editButton: {
    backgroundColor: '#0000ee1a',
    borderRadius: 2,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    height: verticalScale(23),
    width: scale(84),
    justifyContent: 'center',
    alignItems: 'center',
    top: verticalScale(50),
    alignSelf: 'center',
  },
  
  noAddressText: {
    color: 'rgba(0, 0, 0, 0.50)',
    fontFamily: 'Inter',
    fontSize: scale(10),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: verticalScale(14.4),
    letterSpacing: scale(0.4),
    alignSelf: 'center',
    top: verticalScale(30),
  },
  
  AlisAddressContainer: {
    width: scale(360),
    height: verticalScale(43),
    backgroundColor: 'rgba(0, 0, 238, 0.02)',
    backgroundColor: 'red',
    top: verticalScale(-280),
  },
  
  homeAddressContainer: {
    width: scale(328),
    height: verticalScale(89),
    borderRadius: scale(3),
    borderWidth: scale(1),
    borderColor: 'rgba(0, 0, 238, 0.75)',
    backgroundColor: '#FFF',
    position: 'absolute',
   
   top: verticalScale(10),
  },
  
  workAddressContainer: {
    width: scale(328),
    height: verticalScale(128),
    backgroundColor: '#FFF',
     top: verticalScale(110),
    borderRadius: scale(3),
    borderWidth: scale(1),
    borderColor: 'rgba(0, 0, 0, 0.20)',
    position:'absolute',
  },
  
  homeAddressText: {
    color: 'rgba(0, 0, 0, 0.50)',
    fontFamily: 'Inter',
    fontSize: scale(12),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: verticalScale(17.28),
    letterSpacing: scale(0.48),
    top: verticalScale(10),
    marginLeft: scale(15),
  },
  
  addressLine11: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: scale(12),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: verticalScale(17.28),
    letterSpacing: scale(0.48),
    marginLeft: scale(13),
  },
  
  addressLine22: {
    color: 'rgba(0, 0, 0, 0.50)',
    fontFamily: 'Inter',
    fontSize: scale(10),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: verticalScale(14.4),
    letterSpacing: scale(0.4),
    marginLeft: scale(79),
  },
  
  addressLine1: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: scale(12),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: verticalScale(20.16),
    letterSpacing: scale(0.56),
    marginLeft: scale(15),
  },
  
  addressLine2: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: scale(12),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: verticalScale(20.16),
    letterSpacing: scale(0.4),
    marginLeft: scale(5),
  },
  
  dotIcon: {
    height: verticalScale(15),
    width: scale(15),
    marginRight: scale(10),
    top: verticalScale(-30),
  },
  




  moreModalContainer: {
    width: scale(67),
    height: verticalScale(50),
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: scale(0.2),
    borderColor: 'rgba(0, 0, 0, 0.12)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.4,
    shadowRadius: scale(4),
    elevation: 4, // For Android shadow
    marginVertical: verticalScale(10), // Adjust the margin as needed
    position: 'absolute',
    right: scale(10), // Adjust as needed
    top: verticalScale(220), // Adjust as needed
  },
  
  moreOption: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  moreOptionText: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: scale(12),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: verticalScale(17.28),
    letterSpacing: scale(0.48),
  },
  
  editImage: {
    height: verticalScale(10),
    width: scale(10),
    zIndex: 1,
    alignItems: 'center',
    alignSelf: 'flex-start',
    top: verticalScale(5),
    right: scale(5),
  },
  
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  line: {
    width: scale(67),
    height: 0.2,
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    // Add any additional styles for the line if needed
  },
  

});

export default Addresses;


// React Native Navigation Drawer
// https://aboutreact.com/react-native-navigation-drawer/




// import * as React from 'react';
// import {
//   Button,
//   View,
//   Text,
//   SafeAreaView
// } from 'react-native';

// const Addresses = ({ navigation }) => {
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={{ flex: 1, padding: 16 }}>
//         <View
//           style={{
//             flex: 1,
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           <Text
//             style={{
//               fontSize: 25,
//               textAlign: 'center',
//               marginBottom: 16
//             }}>
//             This is Second Page under Second Page Option
//           </Text>
//           <Button
//             title="Go to First Page"
//             onPress={
//               () => navigation.navigate('FirstPage')
//             }
//           />
//           <Button
//             title="Go to Third Page"
//             onPress={
//               () => navigation.navigate('ThirdPage')
//             }
//           />
//         </View>
//         <Text
//           style={{
//             fontSize: 18,
//             textAlign: 'center',
//             color: 'grey'
//           }}>
//           React Navigate Drawer
//         </Text>
//         <Text
//           style={{
//             fontSize: 16,
//             textAlign: 'center',
//             color: 'grey'
//           }}>
//           www.aboutreact.com
//         </Text>
//       </View>
//     </SafeAreaView>
//   );
// }

// export default  Addresses;