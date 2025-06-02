import {useState} from 'react';
import {
  KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import {getFontFamily, scaleFontSize, verticalScale} from '../../utils/helpers';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

type InputProps = {
  // value: string;
  label: string;
  placeHolder?: string;
  onChangeText: (value: string) => void;
  secureField?: boolean;
  keyboardType?: KeyboardTypeOptions;
} & TextInputProps;

const Input = ({
  label,
  placeHolder,
  value,
  onChangeText,
  secureField,
  keyboardType,
}: InputProps) => {
  const [secureText, setSecureText] = useState(secureField);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          value={value}
          placeholder={placeHolder ?? 'Enter Data...'}
          //   onChangeText={text => onChangeText(text)}
          onChangeText={onChangeText}
          secureTextEntry={secureText}
          keyboardType={keyboardType ?? 'default'}
        />
        {secureField && (
          <Pressable
            style={styles.button}
            onPress={() => setSecureText(!secureText)}>
            <FontAwesomeIcon icon={secureText ? faEye : faEyeSlash} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(10),
  },
  label: {
    fontFamily: getFontFamily(),
    color: '#36455A',
    textTransform: 'capitalize',
    fontSize: scaleFontSize(12),
    lineHeight: scaleFontSize(15),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    paddingVertical: verticalScale(12),
    borderBottomColor: 'rgba(167, 167, 167, 0.5)',
    borderBottomWidth: 0.9,
    flex: 1,
    fontFamily: getFontFamily('Inter', '600'),
    fontSize: scaleFontSize(18),
  },
  button: {
    borderBottomColor: 'rgba(167, 167, 167, 0.5)',
    borderBottomWidth: 0.9,
    alignSelf: 'stretch',
    justifyContent: 'center',
    // height: '100%',
  },
});

export default Input;
