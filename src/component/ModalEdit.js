// ModalEdit.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import InputField from './InputField';
import { launchImageLibrary } from 'react-native-image-picker';


const ModalEdit = ({ isVisible, onClose, onSave, tenXe, setTenXe, mauSac, setMauSac, giaBan, setGiaBan, moTa, setMoTa, hinhAnh, setHinhAnh }) => {
  const [imageUri, setImageUri] = useState('');

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, response => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
        setHinhAnh(response.assets[0].uri); // Set the selected image URI
      }
    });
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <InputField placeholder="Tên xe" value={tenXe} onChangeText={setTenXe} />
          <InputField placeholder="Màu sắc" value={mauSac} onChangeText={setMauSac} />
          <InputField placeholder="Giá bán" value={giaBan.toString()} onChangeText={setGiaBan} />
          <InputField placeholder="Mô tả" value={moTa} onChangeText={setMoTa} />
          <TouchableOpacity onPress={pickImage} style={styles.pickImageButton}>
            <Text style={styles.pickImageButtonText}>Chọn ảnh</Text>
          </TouchableOpacity>
          <InputField placeholder="Hình ảnh (URL)" value={hinhAnh} onChangeText={setHinhAnh} />

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonClose]}
              onPress={onClose}
            >
              <Text style={styles.modalButtonText}>Hủy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonSave]}
              onPress={onSave}
            >
              <Text style={styles.modalButtonText}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 90,
  },
  modalButtonClose: {
    backgroundColor: '#FF6347',
  },
  modalButtonSave: {
    backgroundColor: '#3CB371',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pickImageButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#3CB371',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  pickImageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ModalEdit;
