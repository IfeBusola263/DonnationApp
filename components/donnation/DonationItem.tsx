import {Image, StyleSheet, View} from 'react-native';
import Badge from '../buttons/Badge';
import {type Donnation} from './types';
import Header from '../Header/Header';
import {horizontalScale, verticalScale} from '../../utils/helpers';

const DonationItem = ({
  imageUri,
  badgeTitle,
  donnationTitle,
  price,
}: Donnation) => {
  return (
    <View>
      <View style={styles.badge}>
        <Badge title={badgeTitle} />
      </View>
      <Image
        style={styles.image}
        source={{uri: imageUri}}
        resizeMode="contain"
      />
      <View style={styles.donationDetails}>
        <Header title={donnationTitle} size="medium" color="#0A043C" />
        <Header title={`$${price.toFixed(2)}`} size="medium" color="#156CF7" />
      </View>
    </View>
  );
};

export default DonationItem;

const styles = StyleSheet.create({
  image: {
    width: horizontalScale(155),
    height: horizontalScale(170),
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
