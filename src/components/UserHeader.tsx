import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'; // Importa l'icona specifica
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Colors } from '../constants';
import { useAppSelector } from '../hooks/useAppSelector';
import { logout } from '../redux/authSlice';
import { AppDispatch } from '../redux/store';

const UserHeader: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const fullName = useAppSelector(state => state.auth.full_name);
  const email = useAppSelector(state => state.auth.email);

  // TEST REACTOTRON
  //-----------------------------------------------
  // Reactotron.onCustomCommand({
  //   title: 'Reset Navigation State',
  //   description: 'Resets the navigation state',
  //   command: 'resetNavigation',
  //   handler: () => {
  //     dispatch(logout());
  //   }
  // });

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.header}>
      <View style={styles.infoContainer}>
        <Text style={styles.userName}>{fullName}</Text>
        <Text style={styles.userEmail}>{email}</Text>
      </View>
      <Pressable style={styles.iconContainer} onPress={handleLogout}>
        <FontAwesomeIcon icon={faArrowRightFromBracket} color={Colors.backgroundSurfaces} />
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
    borderBottomWidth: 5,
    borderBottomColor: Colors.darkRose,
    borderLeftColor: Colors.darkRose,
    borderRightColor: Colors.darkRose,
    borderTopColor: Colors.darkRose
  },
  infoContainer: {
    flex: 1
  },
  iconContainer: {
    backgroundColor: Colors.azure,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.lightRose
  },
  userEmail: {
    fontSize: 16,
    color: Colors.light,
    marginBottom: 8,
    opacity: 0.7
  }
});

export default UserHeader;
