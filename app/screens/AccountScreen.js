import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../config/colors';
import useAuth from '../auth/useAuth';

import ListItem from '../components/ListItem';
import Screen from '../components/Screen';
import Icon from '../components/Icon';
import ListItemSeparator from '../components/ListItemSeparator';

import avatar from '../assets/avatar.png';

const menuItems = [
    { 
        title: "My Listings",
        icon: {
            name: 'format-list-bulleted',
            backgroundColor: colors.primary
        },
        targetScreen: 'Messages'
    },
    { 
        title: "My Messages",
        icon: {
            name: 'email',
            backgroundColor: colors.secondary
        },
        targetScreen: 'Messages'
    }
];

function AccountScreen({ navigation, route = {} }) {
    const { user, logOut } = useAuth();

    const netInfo = useNetInfo();
    const demo = async () => {
        try {
            await AsyncStorage.setItem('person', JSON.stringify({ id: 1 }));
            const value = await AsyncStorage.getItem('person');
            const person = JSON.parse(value);
            console.log(person);
        } catch(err) {
            console.log(err);
        }
    }    

    demo();

    return (
        <Screen style={styles.screen}>
            <View style={styles.container}>
                <ListItem
                    title={user.name}
                    subTitle={user.email}
                    image={avatar}
                />
            </View>
            <View style={styles.container}>
                <FlatList 
                    data={menuItems}
                    keyExtractor={item => item.title}
                    ItemSeparatorComponent={ListItemSeparator}
                    renderItem={({item}) => 
                      <ListItem 
                        title={item.title}
                        IconComponent={
                            <Icon 
                                name={item.icon.name} 
                                backgroundColor={item.icon.backgroundColor} />
                        }
                        onPress={() => navigation.navigate(item.targetScreen)}
                      />
                    }                
                />
            </View>
            <ListItem 
                title='Log Out'
                IconComponent={
                    <Icon name='logout' backgroundColor='#ffe66d' />
                }
                onPress={logOut}
            />
            {
                netInfo.isInternetReachable ? <Text>Internet is reachable</Text> : <Text>Offline mode</Text>
            }
        </Screen>
    );
};

const styles = StyleSheet.create({
   container: {
       marginVertical: 20
   },
   screen: {
       backgroundColor: colors.light
   }
});

export default AccountScreen;