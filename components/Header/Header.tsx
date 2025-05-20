import {StyleSheet, Text, View} from 'react-native';
import {HeaderProps, sizeProps} from './types';
import {getFontFamily, scaleFontSize} from '../../utils/helpers';

const getHeaderStyle = (size: sizeProps) => {
  switch (size) {
    case 'small':
      return styles.smallHeader;
    case 'medium':
      return styles.mediumHeader;
    case 'big':
      return styles.bigHeader;
    default:
      return styles.bigHeader;
  }
};

const Header = ({title, size, color}: HeaderProps) => {
  return (
    <View>
      <Text style={[getHeaderStyle(size), color && {color: color}]}>
        {title}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  smallHeader: {
    fontSize: scaleFontSize(16),
    fontFamily: getFontFamily('Inter', '600'),
    lineHeight: scaleFontSize(19),
    letterSpacing: 0.1,
  },
  mediumHeader: {
    fontSize: scaleFontSize(18),
    fontFamily: getFontFamily('Inter', '600'),
    lineHeight: scaleFontSize(22),
  },
  bigHeader: {
    fontSize: scaleFontSize(24),
    fontFamily: getFontFamily('Inter', '600'),
    lineHeight: scaleFontSize(29),
  },
});
