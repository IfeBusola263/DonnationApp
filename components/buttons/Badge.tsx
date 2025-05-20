import {StyleSheet, Text, View} from 'react-native';
import {type BadgeProps} from './types';
import {
  getFontFamily,
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../utils/helpers';
import {useRef, useState} from 'react';

const Badge = ({title}: BadgeProps) => {
  const [badgeWidth, setBadgeWith] = useState(0);
  const textRef = useRef<Text>(null);
  const actualBadgeWidth = {
    width: horizontalScale(12 * 2 + badgeWidth),
  };

  return (
    <View style={[styles.badge, actualBadgeWidth]}>
      <Text
        onTextLayout={({nativeEvent}) => {
          setBadgeWith(nativeEvent.lines[0].width);
        }}
        ref={textRef}
        style={styles.text}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#145855',
    borderRadius: horizontalScale(50),
    height: verticalScale(22),
    justifyContent: 'center',
  },
  text: {
    fontFamily: getFontFamily('Inter', '600'),
    textAlign: 'center',
    color: '#fff',
    fontSize: scaleFontSize(10),
    lineHeight: scaleFontSize(12),
  },
});

export default Badge;
