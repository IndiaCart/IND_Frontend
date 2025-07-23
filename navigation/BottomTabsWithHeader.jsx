import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
    View,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Text,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import BottomTabs from './BottomTabs';
import { ThemeContext } from '../design/ThemeContext';

const SearchScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Search Screen</Text>
    </View>
);

const Stack = createStackNavigator();

const BottomTabsWithHeader = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Main"
                component={BottomTabs}
                options={({ navigation }) => ({
                    headerTitle: () => (
                        <View style={[styles.searchContainer, { backgroundColor: theme.card }]}>
                            <Icon
                                name="search"
                                size={20}
                                color={theme.placeholder || '#888'}
                                style={styles.icon}
                                onPress={() => {
                                    <TextInput
                                        placeholder="Search"
                                        placeholderTextColor={theme.placeholder || '#888'}
                                        style={[styles.searchInput, { color: theme.text }]}
                                        onFocus={() => navigation.navigate('Search')}
                                    />
                                }}
                            />

                        </View>
                    ),
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 15 }}
                            onPress={() => console.log('Hamburger clicked')}
                        >
                            <Icon name="menu" size={24} color={theme.text} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <View style={styles.headerRight}>
                            <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 20 }}>
                                <Icon
                                    name={theme.mode === 'dark' ? 'sun' : 'moon'}
                                    size={22}
                                    color={theme.text}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => console.log('Notifications clicked')}>
                                <Icon name="bell" size={22} color={theme.text} />
                            </TouchableOpacity>
                        </View>
                    ),
                })}
            />

            {/* Add Search screen route */}
            <Stack.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    title: 'Search',
                    headerBackTitleVisible: false,
                    headerTintColor: theme.text,
                    headerStyle: {
                        backgroundColor: theme.background,
                    },
                }}
            />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    searchInput: {
        flex: 1,
        height: Platform.OS === 'ios' ? 30 : 36,
        fontSize: 14,
        paddingVertical: 0,
        paddingHorizontal: 8,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: Platform.OS === 'ios' ? 6 : 4,
        flex: 1,
        marginHorizontal: 10,
        maxWidth: 300,
    },
    icon: {
        marginLeft: 8,
    },
});

export default BottomTabsWithHeader;
