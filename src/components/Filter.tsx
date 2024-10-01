import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants';

const data = [
  { label: 'Data crescente', value: '1' },
  { label: 'Data decrescente', value: '2' },
  { label: 'A-Z utenti', value: '3' },
  { label: 'Z-A utenti', value: '4' }
];

const Filter = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const renderItem = ({ item }: { item: { label: string; value: string } }) => (
    <View style={styles.pressableContainer}>
      <Pressable>
        <Text style={styles.text}>{item.label}</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.value}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    height: 'auto'
  },
  flatListContent: {
    paddingVertical: 16
  },
  text: {
    color: Colors.light
  },
  pressableContainer: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.light,
    marginHorizontal: 5
  }
});
