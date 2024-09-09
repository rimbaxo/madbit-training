import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Colors} from '../constants';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons'; // Importa l'icona specifica
import {useDispatch} from 'react-redux';
import {setLoginPressed} from '../redux/authSlice';

type HeaderProps = {
  name: string;
  email: string;
  bio: string;
};

const MyUserHeader: React.FC<HeaderProps> = ({name, email, bio}) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setLoginPressed(false));
  };

  return (
    <View style={styles.header}>
      <View style={styles.infoContainer}>
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.userEmail}>{email}</Text>
        <Text style={styles.userBio}>{bio}</Text>
      </View>
      <Pressable style={styles.iconContainer} onPress={handleLogout}>
        <FontAwesomeIcon icon={faArrowRightFromBracket} color={Colors.dark} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContents: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    backgroundColor: Colors.lightRose,
    borderRadius: 25,
    marginTop: 20,
  },
  infoContainer: {
    flex: 1,
  },
  iconContainer: {
    backgroundColor: Colors.azure,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  userEmail: {
    fontSize: 16,
    color: Colors.dark,
    marginBottom: 8,
  },
  userBio: {
    fontSize: 14,
    color: Colors.dark,
  },
});

export default MyUserHeader;
