import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../constants';

interface HeaderProps {
  name: string;
  email: string;
  bio: string;
}

const MyUserHeader: React.FC<HeaderProps> = ({name, email, bio}) => {
  //const dispatch = useDispatch();

  /*
  const handleLogout = () => {
    dispatch(setLoginPressed(false)); // Imposta loginPressed su false per tornare alla LoginScreen
  };
*/
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.userEmail}>{email}</Text>
        <Text style={styles.userBio}>{bio}</Text>
      </View>
      {/*
      <Pressable onPress={handleLogout}>
        <Icon name="log-out" size={30} color="#000" />
      </Pressable>
      */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: Colors.backgroundSurfaces,
    borderRadius: 25,
    margin: 16,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.darkRose,
  },
  userEmail: {
    fontSize: 16,
    color: Colors.light,
    marginBottom: 8,
  },
  userBio: {
    fontSize: 14,
    color: Colors.light,
  },
});

export default MyUserHeader;
