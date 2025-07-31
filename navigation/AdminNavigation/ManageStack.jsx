import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Manage from '../../components/AdminComponent/productComponent/Manage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateProduct from '../../Screens/AdminScreen/productScreen/CreateProduct';
import ProductAction from '../../Screens/AdminScreen/productScreen/ProductAction';
import ViewProduct from '../../Screens/AdminScreen/productScreen/ViewProduct';
import EditProductScreen from '../../Screens/AdminScreen/productScreen/ProductInfoEditor';

const ManagesStack = createNativeStackNavigator();

const ManageStack = () => {
  return (
    <ManagesStack.Navigator screenOptions={{ headerShown: false }} initialRouteName='manage' >
      <ManagesStack.Screen name="manage" component={Manage} />

      {/* productAction Route */}
      <ManagesStack.Screen name="productAction" component={ProductAction} />
      <ManagesStack.Screen name="createProduct" component={CreateProduct} />
      <ManagesStack.Screen name="products" component={ViewProduct} />
      <ManagesStack.Screen name="editManageProduct" component={EditProductScreen} />
      
    
    </ManagesStack.Navigator>
  )
}

export default ManageStack

const styles = StyleSheet.create({})