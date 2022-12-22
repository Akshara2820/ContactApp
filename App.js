/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';

import {FlatList, LogBox, PermissionsAndroid, Text, View} from 'react-native';
import Contacts from 'react-native-contacts';
import Icon from 'react-native-vector-icons/Entypo';

const App = () => {
  const [contacts, setContacts] = useState([]);


  const getPermission = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    }).then(res => {
      if (res === 'granted') {
        Contacts.getAll()
          .then(con => {
            setContacts(con);
          })
          .catch(e => {
            console.log(e);
          })
          .catch(e => {
            console.log('error', e);
          });
      }
    });
  };
  useEffect(() => {
    getPermission();
  }, []);

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={contacts}
        renderItem={({item}) => {
      
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                marginTop: 10,
                backgroundColor: '#d9d9d9',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text>
                  <Icon
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    name="user"
                    size={40}
                    color={'#000'}
                  />
                </Text>

                <View>
                  <Text style={{marginLeft: 10, fontSize: 18, color: '#000'}}>
                    {item.displayName}
                  </Text>
                  <Text style={{marginLeft: 10, fontSize: 18, color: '#000'}}>
                    {item.phoneNumbers[0].number}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'flex-end',
                }}>
                <Text style={{flexDirection: 'row', marginLeft: 20}}>
                  <Icon name="phone" size={30} color={'#04b515'} />
                </Text>
                <Text style={{flexDirection: 'row', marginLeft: 20}}>
                  <Icon name="chat" size={30} color={'#0890cf'} />
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default App;
