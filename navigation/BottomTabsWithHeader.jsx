import React, { useContext, useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Text,
    Platform,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import BottomTabs from './BottomTabs';
import { ThemeContext } from '../design/ThemeContext';

const Stack = createStackNavigator();

// Search Screen Placeholder
const SearchScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Search Screen</Text>
    </View>
);

// Header Search Component
const HeaderSearch = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);
    const [showSearch, setShowSearch] = useState(false);

    return (
        <View style={[styles.searchContainer, { backgroundColor: theme.card }]}>
            <TouchableOpacity onPress={() => setShowSearch(true)}>
                <Icon
                    name="search"
                    size={20}
                    color={theme.placeholder || '#888'}
                    style={styles.icon}
                />
            </TouchableOpacity>

            {showSearch && (
                <TextInput
                    placeholder="Search"
                    placeholderTextColor={theme.placeholder || '#888'}
                    style={[styles.searchInput, { color: theme.text }]}
                    autoFocus
                    onFocus={() => navigation.navigate('Search')}
                    onBlur={() => setShowSearch(false)}
                />
            )}
        </View>
    );
};

// 📱 Main Navigator with Custom Header
const BottomTabsWithHeader = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Main"
                component={BottomTabs}
                options={({ navigation }) => ({
                    headerTitle: () => <HeaderSearch navigation={navigation} />,
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

            {/* Search Screen */}
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

export default BottomTabsWithHeader;

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: Platform.OS === 'ios' ? 6 : 4,
        marginHorizontal: 10,
        maxWidth: 300,
    },
    icon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: Platform.OS === 'ios' ? 30 : 36,
        fontSize: 14,
        paddingHorizontal: 8,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
});




