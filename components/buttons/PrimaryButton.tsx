import {Pressable, StyleSheet, Text, View} from 'react-native';
import {type PrimaryButtonProps} from './types';
import {
  getFontFamily,
  horizontalScale,
  scaleFontSize,
  switchButtonColor,
  verticalScale,
} from '../../utils/helpers';
import {useEffect, useRef, useState} from 'react';

const PrimaryButton = (props: PrimaryButtonProps) => {
  const isTab = props.use === 'tab';
  const [tabWidth, setTabWidth] = useState(0);
  const textRef = useRef<Text>(null);
  const [bgColor, setBgColor] = useState('blue');

  // useEffect(() => {
  //   let interval;
  //   interval = setInterval(() => {
  //     setBgColor(switchButtonColor());
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  if (isTab) {
    const {isActive, label, onPress} = props;
    const actualTabWith = {
      width: horizontalScale(33 * 2 + tabWidth),
    };

    return (
      <Pressable
        style={[
          styles.button,
          {height: verticalScale(50), ...actualTabWith},
          //   {...actualTabWith},
          !isActive && styles.inactiveTab,
        ]}
        onPress={onPress}>
        <Text
          onTextLayout={({nativeEvent}) =>
            setTabWidth(nativeEvent.lines[0].width)
          }
          ref={textRef}
          style={[
            styles.text,
            {fontSize: scaleFontSize(14), lineHeight: scaleFontSize(17)},
            !isActive && styles.inactiveTitle,
          ]}>
          {label}
        </Text>
      </Pressable>
    );
  }

  const {isDisabled, text, onPress} = props;

  return (
    <Pressable
      style={({pressed}) => [
        styles.button,
        isDisabled && styles.disabled,
        pressed && {opacity: 0.6},
        // {backgroundColor: bgColor},
      ]}
      disabled={isDisabled}
      onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2979F2',
    borderRadius: horizontalScale(50),
    height: verticalScale(55),
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontFamily: getFontFamily('Inter', '500'),
    textAlign: 'center',
    color: '#fff',
    fontSize: scaleFontSize(16),
    lineHeight: scaleFontSize(19),
  },
  inactiveTab: {
    backgroundColor: '#F3F5F9',
  },
  inactiveTitle: {
    color: '#79869F',
  },
});
