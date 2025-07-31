import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { ThemeContext } from '../../../design/ThemeContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { X } from 'lucide-react-native';

import BackButton from '../../../components/BackButton';
import CustomInputField from '../../../components/CustomInputField';
import UniversalDropdown from '../../../components/UniversalDropdown';
import ImageUploadShimmer from '../../../components/Shimmer/ImageUploadShimmer';
import { deleteImageFromServer , pickImageAndUpload } from '../../../utils/deleteImageFromServer';
import { useDispatch, useSelector } from 'react-redux';

const EditProductScreen = () => {

  const { theme } = useContext(ThemeContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);
const {currentSelectedProduct} = useSelector((state) => state.manage);
const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    brand: '',
    selectedCategory: '',
    selectedSubCategory: '',
    stock: '',
    images: [],
    variations: [],
  });

  useEffect(() => {
    if (currentSelectedProduct) {
      setForm({
        name: currentSelectedProduct.name || '',
        description: currentSelectedProduct.description || '',
        price: String(currentSelectedProduct.price || ''),
        brand: currentSelectedProduct.brand || '',
        selectedCategory: currentSelectedProduct.category || '',
        selectedSubCategory: currentSelectedProduct.subCategory || '',
        stock: String(currentSelectedProduct.stock || ''),
        images: currentSelectedProduct.images || [],
        variations: currentSelectedProduct.variations || [],
      });
    }
  }, [currentSelectedProduct]);

  const pickAndUpload = async () => {
    setLoadingImages(true);
    const uploadedImage = await pickImageAndUpload(dispatch);
    if (uploadedImage?.url) {
      setForm((prev) => ({
        ...prev,
        images: [...prev.images, uploadedImage],
      }));
    }
    setLoadingImages(false);
  };

  const handleDeleteImage = async (uri, index) => {
    await deleteImageFromServer(dispatch, uri?.fileId);
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    // Validate and submit form logic
    Alert.alert('Saved', 'Product updated successfully!');
    setIsEditMode(false);
  };

  if (!currentSelectedProduct) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: theme.text }}>No product selected</Text>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.headerRow}>
        <BackButton />
        <TouchableOpacity onPress={() => setIsEditMode((prev) => !prev)}>
          <Text style={{ color: theme.primary, fontWeight: 'bold' }}>
            {isEditMode ? 'Cancel Edit' : 'Edit'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.formWrapper} keyboardShouldPersistTaps="handled">
        <CustomInputField
          label="Product Name"
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
          editable={isEditMode}
        />

        <CustomInputField
          label="Description"
          value={form.description}
          onChangeText={(text) => setForm({ ...form, description: text })}
          editable={isEditMode}
          multiline
        />

        <CustomInputField
          label="Price"
          value={form.price}
          onChangeText={(text) => setForm({ ...form, price: text })}
          editable={isEditMode}
          keyboardType="numeric"
        />

        <CustomInputField
          label="Brand"
          value={form.brand}
          onChangeText={(text) => setForm({ ...form, brand: text })}
          editable={isEditMode}
        />

        <CustomInputField
          label="Stock"
          value={form.stock}
          onChangeText={(text) => setForm({ ...form, stock: text })}
          editable={isEditMode}
          keyboardType="numeric"
        />

        <UniversalDropdown
          label="Category"
          value={form.selectedCategory}
          onSelectChange={(val) => setForm({ ...form, selectedCategory: val })}
          disabled={!isEditMode}
        />

        <UniversalDropdown
          label="SubCategory"
          value={form.selectedSubCategory}
          onSelectChange={(val) => setForm({ ...form, selectedSubCategory: val })}
          disabled={!isEditMode}
        />

        <Text style={[styles.label, { color: theme.text }]}>Images</Text>
        <View style={styles.imageRow}>
          {loadingImages && <ImageUploadShimmer style={styles.imageThumb} />}
          {form.images.map((img, idx) => (
            <View key={idx} style={styles.imageWrapper}>
              <Image source={{ uri: img.url }} style={styles.imageThumb} />
              {isEditMode && (
                <TouchableOpacity style={styles.deleteIcon} onPress={() => handleDeleteImage(img, idx)}>
                  <X size={16} color="red" />
                </TouchableOpacity>
              )}
            </View>
          ))}
          {isEditMode && !loadingImages && (
            <TouchableOpacity style={styles.fakeUpload} onPress={pickAndUpload}>
              <Text style={{ color: theme.primary }}>+ Add</Text>
            </TouchableOpacity>
          )}
        </View>

        {isEditMode && (
          <TouchableOpacity style={[styles.submitBtn, { backgroundColor: theme.primary }]} onPress={handleSubmit}>
            <Text style={styles.submitText}>Save Changes</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  formWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  label: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  imageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  imageThumb: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  imageWrapper: {
    position: 'relative',
  },
  deleteIcon: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 2,
  },
  fakeUpload: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtn: {
    marginTop: 24,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
