// XeMayList.js
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

const XeMayList = ({ data, onEdit, onDelete }) => {
  const renderItem = ({ item }) => (
    <Animated.View
      entering={FadeIn.duration(500)} // Thêm hiệu ứng fade-in khi phần tử xuất hiện
      style={{ padding: 10, backgroundColor: '#d3d3d3', margin: 10, borderRadius: 10 }}
    >
      <View style={styles.actions}>
        <Image style={{ width: 120, height: 120, borderRadius: 10 }} source={{ uri: item.hinh_anh_ph45160 }} />
        <TouchableOpacity style={styles.button} onPress={() => onEdit(item)}>
          <Text style={{ color: '#fff' }}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onDelete(item.id)}>
          <Text style={{ color: '#fff' }}>Delete</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={{ color: '#000' }}>Name: {item.ten_xe_ph45160}</Text>
        <Text style={{ color: '#000' }}>Color: {item.mau_sac_ph45160}</Text>
        <Text style={{ color: '#000' }}>Price: {item.gia_ban_ph45160}</Text>
        <Text style={{ color: '#000' }}>Description: {item.mo_ta_ph45160}</Text>
      </View>
    </Animated.View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row', // Các nút nằm ngang
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
    marginLeft: 10,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default XeMayList;
