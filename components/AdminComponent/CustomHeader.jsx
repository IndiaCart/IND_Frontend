// components/CustomHeader.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
// import LinearGradient from 'react-native-linear-gradient';

const CustomHeader = ({ title, onSearch }) => {
  return (
    <View colors={['#4c669f', '#3b5998']} style={styles.header}>
      <View style={styles.topRow}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.rightIcons}>
          <TouchableOpacity onPress={() => console.log('Toggle Theme')}>
            <Icon name="moon" size={22} color="#fff" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Notifications')}>
            <Icon name="bell" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="search" size={18} color="#888" style={styles.searchIcon} />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#888"
          style={styles.searchInput}
          onChangeText={onSearch}
        />
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  icon: {
    marginRight: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#333',
    fontSize: 16,
  },
});
