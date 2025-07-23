import React from 'react';
import { View } from 'react-native';
import BottomTabs from '../../navigation/AdminNavigation/BottomTabs';
import { Header } from '../../navigation/BottomTabsWithHeader';

const MainLayout = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />

      <BottomTabs />
    </View>
  );
};

export default MainLayout;
