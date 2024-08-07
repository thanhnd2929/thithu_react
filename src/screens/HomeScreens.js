import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Modal, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../component/Banner';
import { addXeMayApi, fetchXeMay, updateXeMayApi, deleteXeMayApi } from '../redux/action/XeMayAction';
import XeMayList from '../component/XeMayList';
import ModalComp from '../component/ModalComp';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import ModalEdit from '../component/ModalEdit';

const HomeScreens = () => {

  const [ten_xe_ph45160, setTen_xe_ph45160] = useState('')
  const [mau_sac_ph45160, setMau_sac_ph45160] = useState('')
  const [gia_ban_ph45160, setGia_ban_ph45160] = useState('')
  const [mo_ta_ph45160, setMo_ta_ph45160] = useState('')
  const [hinh_anh_ph45160, setHinh_anh_ph45160] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedXeMay, setSelectedXeMay] = useState(null);


  const listXeMay = useSelector(state => state.listXeMay.listXeMay);
  const dispatch = useDispatch();

  const scale = useSharedValue(1);
  const rotate = useSharedValue('0deg');
  const backgroundColor = useSharedValue('#3CB371');


  useEffect(() => {
    dispatch(fetchXeMay())
  }, [dispatch])

  // Animated style for the button
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotate: rotate.value },
      ],
      backgroundColor: backgroundColor.value,
    };
  });

  // Handle button press in
  const handlePressIn = () => {
    scale.value = withSpring(1.2, { damping: 2, stiffness: 100 });
    rotate.value = withTiming('180deg', { duration: 200, easing: Easing.out(Easing.ease) });
    backgroundColor.value = withTiming('#FF6347', { duration: 300, easing: Easing.out(Easing.ease) }); // Change to Tomato color
  };

  // Handle button press out
  const handlePressOut = () => {
    scale.value = withSpring(1);
    rotate.value = withTiming('0deg', { duration: 300, easing: Easing.out(Easing.ease) });
    backgroundColor.value = withTiming('#3CB371', { duration: 200, easing: Easing.out(Easing.ease) }); // Revert to original color
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const validateData = () => {
    if (!ten_xe_ph45160 || !mau_sac_ph45160 || !mo_ta_ph45160 || !hinh_anh_ph45160) {
      return "Vui lòng điền đầy đủ thông tin.";
    }

    if (isNaN(gia_ban_ph45160) || parseFloat(gia_ban_ph45160) <= 0) {
      return "Giá bán phải là số và lớn hơn 0.";
    }

    return null;
  };

  const handleAddXeMay = () => {
    const validationError = validateData();

    if (validationError) {
      alert(validationError); // Hiển thị thông báo lỗi
      return;
    }

    dispatch(addXeMayApi({
      ten_xe_ph45160,
      mau_sac_ph45160,
      gia_ban_ph45160,
      mo_ta_ph45160,
      hinh_anh_ph45160
    }));
    closeModal();
    resetFields()
  };


  // EDIT
  const handleEditXeMay = (item) => {
    console.log('Editing item:', item); // Debugging line
    setSelectedXeMay(item);
    setTen_xe_ph45160(item.ten_xe_ph45160);
    setMau_sac_ph45160(item.mau_sac_ph45160);
    setGia_ban_ph45160(item.gia_ban_ph45160);
    setMo_ta_ph45160(item.mo_ta_ph45160);
    setHinh_anh_ph45160(item.hinh_anh_ph45160);
    setIsEditModalVisible(true);
  };

  const handleEdit = () => {
    const validationError = validateData();

    if (validationError) {
      alert(validationError); // Hiển thị thông báo lỗi
      return;
    }

    let udXe = {
      id: selectedXeMay.id,
      ten_xe_ph45160,
      mau_sac_ph45160,
      gia_ban_ph45160,
      mo_ta_ph45160,
      hinh_anh_ph45160
    }
    // Dispatch action để cập nhật thông tin xe máy
    dispatch(updateXeMayApi({id: selectedXeMay.id, data: udXe}));
    closeEditModal();
    resetFields();
  };


  const closeEditModal = () => {
    setIsEditModalVisible(false);
    setSelectedXeMay(null);
  };

  const resetFields = () => {
    setTen_xe_ph45160('');
    setMau_sac_ph45160('');
    setGia_ban_ph45160('');
    setMo_ta_ph45160('');
    setHinh_anh_ph45160('');
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => dispatch(deleteXeMayApi(id))
        }
      ]
    );
  };



  return (
    <View style={{ flex: 1 }}>
      {/* BANNER */}
      <Banner imageUrl="https://bd.gaadicdn.com/upload/modellogo/649bc0cf4b3f0.jpg?tr=w-320" />

      {/* FLATLIST */}
      <XeMayList 
      data={listXeMay}
      onEdit={handleEditXeMay} // Đảm bảo bạn truyền handleEditXeMay
      onDelete={handleDelete}
      />

      {/* BUTTON */}
      <Animated.View style={[styles.addButton, animatedStyle]}>
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={openModal}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* MODAL ADD */}
      <ModalComp
        isVisible={isModalVisible}
        onClose={closeModal}
        onAdd={handleAddXeMay}
        tenXe={ten_xe_ph45160}
        setTenXe={setTen_xe_ph45160}
        mauSac={mau_sac_ph45160}
        setMauSac={setMau_sac_ph45160}
        giaBan={gia_ban_ph45160}
        setGiaBan={setGia_ban_ph45160}
        moTa={mo_ta_ph45160}
        setMoTa={setMo_ta_ph45160}
        hinhAnh={hinh_anh_ph45160}
        setHinhAnh={setHinh_anh_ph45160}
      />


      {/* Thêm modal sửa */}
      <ModalEdit
        isVisible={isEditModalVisible}
        onClose={closeEditModal}
        onSave={handleEdit}
        tenXe={ten_xe_ph45160}
        setTenXe={setTen_xe_ph45160}
        mauSac={mau_sac_ph45160}
        setMauSac={setMau_sac_ph45160}
        giaBan={gia_ban_ph45160}
        setGiaBan={setGia_ban_ph45160}
        moTa={mo_ta_ph45160}
        setMoTa={setMo_ta_ph45160}
        hinhAnh={hinh_anh_ph45160}
        setHinhAnh={setHinh_anh_ph45160}
      />



    </View>
  )
}

export default HomeScreens

const styles = StyleSheet.create({

  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 80,
    height: 80,
    borderRadius: 90,
    backgroundColor: '#3CB371',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Optional: adds shadow for Android

  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },

})