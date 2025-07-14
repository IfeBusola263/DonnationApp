import {
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/Header/Header';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SearchBar from '../../components/search/SeacrhBar';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import DonationItem from '../../components/donnation/DonationItem';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {RootState} from '../../store/store';
import {
  getFontFamily,
  horizontalScale,
  pagination,
  scaleFontSize,
  verticalScale,
} from '../../utils/helpers';
import {Category, changeActiveCat} from '../../store/slices/categorySlice';
import {useEffect, useState} from 'react';
import {DonationInfo} from '../../store/slices/donationSlice';
import {type RootStackParamList} from '../../utils/types';
import {StackRoutes} from '../../navigation/routes';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMobileButton, faPowerOff} from '@fortawesome/free-solid-svg-icons';
import {logout} from '../../api/user';
import {clearUserData} from '../../store/slices/userSlice';

const ITEM_PER_PAGE = 4;

type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof StackRoutes.donation
>;

const Home = ({navigation}: HomeScreenProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [uiCatData, setUiCatData] = useState<Category[]>([]);
  const [uiDonationsData, setUiDonationsCatData] = useState<DonationInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {firstName, lastName, avatar} = useAppSelector(
    (state: RootState) => state.user,
  );
  const {categories, activeCatId} = useAppSelector(
    (state: RootState) => state.category,
  );

  const {donations} = useAppSelector((state: RootState) => state.donation);

  const activeCategory = categories.find(cat => cat.id === activeCatId);

  useEffect(() => {
    const filteredData = donations.filter(don =>
      don.categoryIds.includes(activeCatId),
    );
    setUiDonationsCatData(filteredData);
  }, [activeCatId, donations]);

  useEffect(() => {
    const fetchCategories = () => {
      setIsLoading(true);
      const data = pagination(categories, ITEM_PER_PAGE, 1);
      setUiCatData(data);
      setCurrentPage(prevPageNumber => prevPageNumber + 1);
      setIsLoading(false);
    };

    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out', [
      {
        text: 'Yes',
        onPress: async () => {
          await logout();
          dispatch(clearUserData());
        },
      },
      {text: 'No', style: 'cancel'},
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.usernameContainer}>
            <Text style={styles.greetingText}>Hello,</Text>
            <Header size="big" title={`${firstName} .${lastName[0]}👋🏾`} />
          </View>
          {/* <Pressable onPress={handleLogout}>
            <FontAwesomeIcon icon={faPowerOff} color="#36455A" />
          </Pressable> */}
          <Image
            style={styles.image}
            source={{uri: avatar}}
            resizeMode="contain"
          />
        </View>

        {/* Search Bar */}
        <SearchBar onSearch={() => {}} />

        {/* Check Now Image */}
        <Pressable style={({pressed}) => [pressed && {opacity: 0.8}]}>
          <Image
            source={require('../../assets/images/highlighted_image.png')}
            resizeMode="contain"
            style={styles.highlightedImage}
          />
        </Pressable>

        {/* Categories */}
        <View style={styles.tabsContainer}>
          <Header size="medium" title="Select Category" />
          <FlatList
            data={uiCatData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.tabButton}>
                <PrimaryButton
                  use="tab"
                  label={item.name}
                  isActive={activeCatId === item.id}
                  onPress={() => dispatch(changeActiveCat({id: item.id}))}
                />
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if (!isLoading) {
                setIsLoading(true);
                const data = pagination(categories, ITEM_PER_PAGE, currentPage);
                setUiCatData(prevData => [...prevData, ...data]);
                setCurrentPage(currentPage + 1);
                setIsLoading(false);
              }
            }}
          />
        </View>

        {/* Donations List */}
        <View style={styles.donationItemsContainer}>
          {uiDonationsData.map(don => (
            <View key={don.donationItemId} style={styles.donationItem}>
              <DonationItem
                imageUri={don.image}
                badgeTitle={activeCategory!.name}
                price={+don.price}
                donnationTitle={don.name}
                onPress={() =>
                  navigation.navigate(StackRoutes.donation, {
                    ...don,
                    category: activeCategory!.name,
                  })
                }
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: horizontalScale(14),
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  usernameContainer: {
    gap: horizontalScale(10),
  },
  greetingText: {
    fontFamily: getFontFamily(),
    color: '#636776',
    lineHeight: scaleFontSize(19),
  },
  image: {
    height: verticalScale(50),
    width: horizontalScale(50),
  },
  highlightedImage: {
    width: '100%',
    height: verticalScale(160),
  },
  tabsContainer: {
    gap: verticalScale(16),
  },
  tabButton: {
    marginRight: horizontalScale(6),
  },
  donationItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: verticalScale(16),
    // gap: horizontalScale(10),
    justifyContent: 'space-between',
    // borderColor: 'black',
    // borderWidth: 1,
  },
  donationItem: {
    width: '48%',
    marginBottom: verticalScale(23),
    //     borderColor: 'black',
    //     borderWidth: 1,
  },
});
