import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  getFontFamily,
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../utils/helpers';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../utils/types';
import {StackRoutes} from '../../navigation/routes';
import BackButton from '../../components/buttons/BackButton';
import Badge from '../../components/buttons/Badge';
import Header from '../../components/Header/Header';
import PrimaryButton from '../../components/buttons/PrimaryButton';

type DonationSceenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof StackRoutes.donation
>;

const DonationDetailsScreen = ({navigation, route}: DonationSceenProps) => {
  const {image, category, name, description, price} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <BackButton />

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image */}
        <Image
          source={{uri: image}}
          style={styles.image}
          //   resizeMode="contain"
        />

        {/* Badge */}
        <Badge title={category} />

        {/* Donation Details */}
        <View style={styles.donationHeader}>
          <Header size="big" title={name} />
        </View>

        {/* Description */}
        <Text style={styles.description}>{description}</Text>
      </ScrollView>

      {/* Button */}
      <PrimaryButton
        use="button"
        text="Donate"
        onPress={() =>
          navigation.navigate(StackRoutes.payment, {amount: price})
        }
      />
    </SafeAreaView>
  );
};

export default DonationDetailsScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(7),
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: verticalScale(240),
    marginTop: verticalScale(12),
    marginBottom: verticalScale(24),
    backgroundColor: '#D9D9D9',
    borderRadius: horizontalScale(5),
  },
  donationHeader: {
    marginTop: verticalScale(16),
  },
  description: {
    padding: horizontalScale(7),
    letterSpacing: scaleFontSize(0.5),
    lineHeight: scaleFontSize(22),
    fontSize: scaleFontSize(14),
    fontFamily: getFontFamily(),
  },
});
