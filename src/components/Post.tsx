import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, formatReadableDate } from '../constants';
import { HomeNavigationProp, PostType } from '../types';

// Sarebbe bello implementare una funzione che fa allargare il post se si vuole vedere di più, mi serve tempo però non riesco immedita. Pensavo di si

const Post: React.FC<PostType> = (item: PostType) => {
  const { id, user, created_at, title, text, comments_count } = item;
  const navigation = useNavigation<HomeNavigationProp>();

  return (
    <Pressable style={styles.post} onPress={() => navigation.navigate('PostDetails', { postId: id })}>
      <View style={styles.userPostTopInfo}>
        <View style={styles.postHeader}>
          <Image source={{ uri: user.picture }} style={styles.profilePicture} />
          <Text style={styles.userName}>{user.full_name}</Text>
        </View>
        <Text style={styles.info}>{formatReadableDate(created_at)}</Text>
      </View>
      <View style={styles.postSeparatorLine} />
      <Text style={styles.postTitle}>{title}</Text>
      <Text style={styles.postContent}>{text}</Text>
      <Text style={styles.info}>Comments: {comments_count}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  post: {
    padding: 16,
    backgroundColor: Colors.backgroundSurfaces,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden'
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.lilla
  },
  postContent: {
    fontSize: 16,
    color: Colors.light,
    marginBottom: 4
  },
  userName: {
    fontSize: 14,
    color: Colors.lightRose,
    fontWeight: 'bold'
  },
  info: {
    fontSize: 12,
    color: Colors.lightRose,
    opacity: 0.7
  },
  postSeparatorLine: {
    marginTop: 5,
    marginBottom: 5,
    width: '100%',
    height: 1,
    backgroundColor: Colors.lightRose,
    opacity: 0.3
  },
  userPostTopInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.darkRose
  },
  postHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  }
});

export default Post;
