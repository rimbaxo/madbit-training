import { faArrowLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TextInputComponent from '../components/TextInputComponent';
import { Colors, ENDPOINT_POST, formatReadableDate } from '../constants';
import { useAppSelector } from '../hooks/useAppSelector';
import useFetch from '../hooks/useFetch';
import { CommentType, FetchParams, PostType } from '../types';

export type PostDetailsScreenProps = {
  postId: number;
};

const PostDetailsScreen: React.FC = () => {
  const route = useRoute();
  const { postId } = route.params as PostDetailsScreenProps;

  const userId = useAppSelector(state => state.auth.id);
  const userFullName = useAppSelector(state => state.auth.fullName);
  const userEmail = useAppSelector(state => state.auth.email);

  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<CommentType[]>([]);

  const fetchPost: FetchParams = {
    endpoint: ENDPOINT_POST + '/' + postId.toString(),
    method: 'GET'
  };
  const fetchPostComments: FetchParams = {
    endpoint: ENDPOINT_POST + '/' + postId.toString() + '/comments',
    method: 'GET'
  };

  const { loading, error, data, fetchData } = useFetch<PostType>(fetchPost);
  const {
    loading: commentLoading,
    error: commentError,
    data: commentData,
    fetchData: fetchCommentData
  } = useFetch<CommentType[]>(fetchPostComments);

  useEffect(() => {
    fetchData();
    fetchCommentData();
  }, [fetchData, fetchCommentData]);

  useEffect(() => {
    if (commentData) setComments(commentData);
  }, [commentData]);

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  console.log('[], commentData', commentData);

  const backgroundStyle = {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    paddingTop: insets.top,
    paddingLeft: insets.left,
    paddingRight: insets.right
  };

  /*
  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj: CommentType = {
        id: Number(Date.now().toString()),
        text: newComment,
        created_at: Date.now().toString(),
        updated_at: Date.now().toString(),
        user: {
            id: userId ? userId : 999,
            email: userEmail ? userEmail : '',



        }
      };
      setComments([...comments, newCommentObj]);
      setNewComment('');
    } else {
      Alert.alert('Comment cannot be empty');
    }
  };*/

  return (
    <View style={backgroundStyle}>
      <ScrollView>
        <View style={styles.postHeader}>
          <Pressable style={styles.goBackButton} onPress={() => navigation.goBack()}>
            <FontAwesomeIcon icon={faArrowLeft} color={Colors.backgroundSurfaces} />
          </Pressable>
          <Text style={styles.h2Text}>Posts</Text>
        </View>

        {data ? (
          <View style={styles.postInfoContainer}>
            <View style={styles.userPostTopInfo}>
              <Text style={styles.userName}>{data.user.full_name}</Text>
              <Text style={styles.postDate}>{formatReadableDate(data.created_at)}</Text>
            </View>
            <View style={styles.separator} />
            <Text style={styles.postTitle}>{data.title}</Text>
            <Text style={styles.postContent}>{data.text}</Text>
          </View>
        ) : null}

        <Text style={styles.h1Text}>Comments</Text>
        <View style={styles.commentsContainer}>
          <View style={styles.commentsContainer}>
            {comments?.reverse().map(comment => (
              <View key={comment.id} style={styles.commentContainer}>
                <View style={styles.commentHeader}>
                  <Image source={{ uri: comment.user.picture }} style={styles.profilePicture} />
                  <Text style={{ color: Colors.lightRose, fontWeight: 'bold' }}>{comment.user.full_name}</Text>
                </View>
                <Text style={styles.commentText}>{comment.text}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.commentInputContainer}>
        <View style={styles.addCommentComponent}>
          <TextInputComponent
            style={{ flex: 1 }}
            value={newComment}
            placeholder="Add a comment..."
            onChangeText={setNewComment}
          />

          <Pressable style={styles.goBackButton}>
            <FontAwesomeIcon icon={faPaperPlane} color={Colors.backgroundSurfaces} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingBottom: 10
  },
  goBackButton: {
    backgroundColor: Colors.azure,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  h2Text: {
    color: Colors.light,
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 12
  },
  h1Text: {
    color: Colors.light,
    fontSize: 24,
    fontWeight: 'bold',
    paddingLeft: 12,
    marginBottom: 5
  },
  postInfoContainer: {
    padding: 20,
    backgroundColor: Colors.backgroundSurfaces,
    marginTop: 0,
    marginBottom: 20
  },
  postTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.lilla
  },
  postContent: {
    fontSize: 16,
    color: Colors.light
  },
  separator: {
    height: 1,
    marginTop: 5,
    marginBottom: 5,
    opacity: 0.5,
    backgroundColor: Colors.darkRose
  },
  postDate: {
    fontSize: 12,
    color: Colors.lightRose
  },
  addCommentComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  commentsContainer: {
    backgroundColor: Colors.backgroundSurfaces
  },
  commentInputContainer: {
    padding: 10,
    backgroundColor: Colors.backgroundSurfaces,
    borderTopWidth: 1,
    borderRadius: 5
  },
  commentContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark,
    borderRadius: 15
  },
  commentText: {
    color: Colors.light,
    opacity: 0.75,
    fontSize: 14
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.darkRose
  },
  commentHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  userName: {
    fontSize: 14,
    color: Colors.lightRose,
    fontWeight: 'bold'
  },
  userPostTopInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default PostDetailsScreen;
