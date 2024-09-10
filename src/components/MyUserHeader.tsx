import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Colors} from '../constants';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons'; // Importa l'icona specifica
import {useDispatch} from 'react-redux';
import {logout} from '../redux/authSlice';

type HeaderProps = {
  name: string;
  email: string;
};

const MyUserHeader: React.FC<HeaderProps> = ({name, email}) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.header}>
      <View style={styles.infoContainer}>
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.userEmail}>{email}</Text>
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
    marginTop: 20,
    borderBottomWidth: 5,
    borderBottomColor: Colors.darkRose,
    borderLeftColor: Colors.darkRose,
    borderRightColor: Colors.darkRose,
    borderTopColor: Colors.darkRose,
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
    color: Colors.lightRose,
  },
  userEmail: {
    fontSize: 16,
    color: Colors.light,
    marginBottom: 8,
  },
});

export default MyUserHeader;
