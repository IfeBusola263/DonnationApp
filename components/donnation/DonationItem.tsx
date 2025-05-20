import {Image, Pressable, StyleSheet, View} from 'react-native';
import Badge from '../buttons/Badge';
import {type Donnation} from './types';
import Header from '../Header/Header';
import {horizontalScale, verticalScale} from '../../utils/helpers';

const DonationItem = ({
  imageUri,
  badgeTitle,
  donnationTitle,
  price,
  onPress,
}: Donnation) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [pressed && {opacity: 0.8}]}>
      <View style={styles.badge}>
        <Badge title={badgeTitle} />
      </View>
      <Image style={styles.image} source={{uri: imageUri}} resizeMode="cover" />
      <View style={styles.donationDetails}>
        <Header
          title={donnationTitle}
          size="medium"
          color="#0A043C"
          numberOfLines={1}
        />
        <Header title={`$${price.toFixed(2)}`} size="medium" color="#156CF7" />
      </View>
    </Pressable>
  );
};

export default DonationItem;

const styles = StyleSheet.create({
  image: {
    width: horizontalScale(155),
    height: horizontalScale(170),
    borderRadius: horizontalScale(20),
  },
  badge: {
    position: 'absolute',
    zIndex: 1,
    top: verticalScale(13),
    left: horizontalScale(10),
  },
  donationDetails: {
    marginTop: verticalScale(16),
    gap: verticalScale(5),
  },
});
