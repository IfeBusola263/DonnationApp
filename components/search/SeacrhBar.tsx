import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useRef, useState} from 'react';
import {Pressable, StyleSheet, TextInput} from 'react-native';
import {SearchBarProps} from './types';
import {
  getFontFamily,
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../utils/helpers';

const SearchBar = ({onSearch}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const inputRef = useRef<TextInput>(null);

  const handleSeach = (searchValue: string) => {
    setSearchTerm(searchValue);
    onSearch(searchValue);
  };

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <Pressable style={styles.container} onPress={handleFocus}>
      <FontAwesomeIcon
        icon={faSearch}
        color={'#25C0FF'}
        size={scaleFontSize(22)}
      />
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={searchTerm}
        onChangeText={handleSeach}
        placeholder="Search"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#d7dff3',
    height: verticalScale(50),
    alignItems: 'center',
    borderRadius: horizontalScale(15),
    paddingHorizontal: horizontalScale(16),
  },
  input: {
    flex: 1,
    marginLeft: horizontalScale(6),
    color: '#686C7A',
    fontSize: scaleFontSize(14),
    lineHeight: scaleFontSize(14),
    fontFamily: getFontFamily('Inter'),
    height: '100%',
  },
});

export default SearchBar;
