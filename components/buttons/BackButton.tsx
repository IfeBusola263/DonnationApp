import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import {Pressable, StyleSheet} from 'react-native';
import {horizontalScale} from '../../utils/helpers';

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.buttonContainer}
      onPress={() => navigation.goBack()}>
      <FontAwesomeIcon icon={faArrowLeft} size={18} />
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: horizontalScale(44),
    height: horizontalScale(44),
    borderRadius: '50%',
    // borderColor: 'black',
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
});
