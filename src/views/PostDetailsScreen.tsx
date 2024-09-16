import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, ENDPOINT_POST } from '../constants';
import useFetch from '../hooks/useFetch';
import { CommentType, FetchParams, PostType } from '../types'; // Update with actual types

export type PostDetailsScreenProps = {
  postId: number;
};

// TODO: parametrizzare questa cosa meglio
const PostDetailsScreen: React.FC = () => {
  const route = useRoute();
  const { postId } = route.params as PostDetailsScreenProps;
  const fetchObj: FetchParams = {
    endpoint: ENDPOINT_POST + '/' + postId.toString(),
    method: 'GET'
  };

  console.log('[], PostId', postId);

  const { loading, error, data, fetchData } = useFetch<PostType>(fetchObj);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<CommentType[]>([]);

  const backgroundStyle = {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    paddingTop: insets.top,
    paddingLeft: insets.left,
    paddingRight: insets.right
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj: CommentType = {
        id: Number(Date.now().toString()),
        text: newComment
      };
      setComments([...comments, newCommentObj]);
      setNewComment('');
    } else {
      Alert.alert('Comment cannot be empty');
    }
  };

  const handleDeletePost = () => {
    Alert.alert('Post deleted');
  };

  const handleEditPost = () => {
    Alert.alert('Edit post');
  };

  const renderComment = ({ item }: { item: CommentType }) => (
    <View style={styles.commentContainer}>
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <View style={backgroundStyle}>
      <Pressable style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <Text style={styles.goBackText}>Back</Text>
      </Pressable>

      <View style={styles.postInfoContainer}>
        <Text style={styles.postTitle}>{data?.title}</Text>
        <Text style={styles.postContent}>{data?.text}</Text>
        <Text style={styles.postDate}>{data?.created_at}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button} onPress={handleEditPost}>
          <Text style={styles.buttonText}>Edit Post</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleDeletePost}>
          <Text style={styles.buttonText}>Delete Post</Text>
        </Pressable>
      </View>

      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={item => item.id.toString()}
        style={styles.commentsList}
      />

      <View style={styles.commentInputContainer}>
        <TextInput
          value={newComment}
          onChangeText={setNewComment}
          placeholder="Add a comment..."
          style={styles.commentInput}
        />
        <Button title="Add Comment" onPress={handleAddComment} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  goBackButton: {
    padding: 10,
    backgroundColor: Colors.azure,
    borderRadius: 5,
    margin: 10
  },
  goBackText: {
    color: Colors.light,
    fontSize: 16,
    textAlign: 'center'
  },
  postInfoContainer: {
    padding: 20,
    backgroundColor: Colors.backgroundSurfaces,
    marginBottom: 10,
    borderRadius: 5
  },
  postTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  postContent: {
    fontSize: 16,
    marginBottom: 10
  },
  postDate: {
    fontSize: 14,
    color: Colors.backgroundSurfaces
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10
  },
  button: {
    padding: 10,
    backgroundColor: Colors.light,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5
  },
  buttonText: {
    color: Colors.light,
    textAlign: 'center'
  },
  commentsList: {
    flex: 1,
    marginVertical: 10
  },
  commentInputContainer: {
    padding: 10,
    backgroundColor: Colors.backgroundSurfaces,
    borderTopWidth: 1,
    borderColor: Colors.backgroundSurfaces
  },
  commentInput: {
    height: 40,
    borderColor: Colors.backgroundSurfaces,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10
  },
  commentContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: Colors.backgroundSurfaces
  }
});

export default PostDetailsScreen;
