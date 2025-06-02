import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/Header/Header';
import {horizontalScale, verticalScale} from '../../utils/helpers';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {type RootStackParamList} from '../../utils/types';
import {StackRoutes} from '../../navigation/routes';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import {
  CardForm,
  StripeProvider,
  useConfirmPayment,
} from '@stripe/stripe-react-native';
import {useState} from 'react';
import {useAppSelector} from '../../hooks/storeHooks';
import {STRIPE_PUB_KEY} from '../../utils/constants';

type PaymentSceenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof StackRoutes.payment
>;

const url = `http://${
  Platform.OS === 'ios' ? 'localhost' : '10.0.2.2'
}:3000/create-payment-intent`;

const Payments = ({navigation, route}: PaymentSceenProps) => {
  const [isReady, setIsReady] = useState(false);
  const {loading, confirmPayment} = useConfirmPayment();
  const {email} = useAppSelector(state => state.user);

  const {amount} = route?.params;

  const clientData = {
    email,
    amount: +amount * 100,
    currency: 'usd',
  };

  const fetchPaymentIntentClientSecret = async () => {
    try {
      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(clientData),
      });

      const {clientSecret} = await res.json();
      return clientSecret;
    } catch (error) {
      console.error(error);
    }
  };

  const handlePayment = async () => {
    const clientSecret = await fetchPaymentIntentClientSecret();
    const {error, paymentIntent} = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
    });

    if (error) {
      Alert.alert('Something Went Wrong!', error.localizedMessage);
      return;
    }

    if (paymentIntent) {
      console.log(paymentIntent);
      Alert.alert('Success', 'Payment Successful');
      navigation.popToTop();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header title="Making Donation" size="big" />
      <Text style={styles.donationDescription}>
        You are about donating ${amount}
      </Text>
      <ScrollView>
        <View>
          <StripeProvider publishableKey={STRIPE_PUB_KEY}>
            <CardForm
              style={styles.stripeForm}
              onFormComplete={() => setIsReady(true)}
            />
          </StripeProvider>
        </View>
      </ScrollView>
      <PrimaryButton
        use="button"
        isDisabled={!isReady || loading}
        onPress={handlePayment}
        text="Donate"
      />
    </SafeAreaView>
  );
};

export default Payments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: horizontalScale(16),
  },
  donationDescription: {
    marginVertical: verticalScale(12),
  },
  stripeForm: {
    height: verticalScale(200),
    marginTop: verticalScale(10),
  },
});
