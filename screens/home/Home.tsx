import {
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
import Badge from '../../components/buttons/Badge';
import SearchBar from '../../components/search/SeacrhBar';
// import {SearchBar as Bar} from 'react-native-screens';
import DonationItem from '../../components/donnation/DonationItem';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {updateUser} from '../../store/slices/userSlice';
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

const ITEM_PER_PAGE = 4;

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [uiData, setUiData] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {firstName, lastName, avatar} = useAppSelector(
    (state: RootState) => state.user,
  );
  const {categories, activeCatId} = useAppSelector(
    (state: RootState) => state.category,
  );

  useEffect(() => {
    const fetchCategories = () => {
      setIsLoading(true);
      const data = pagination(categories, ITEM_PER_PAGE, 1);
      setUiData(data);
      setCurrentPage(currentPage + 1);
      setIsLoading(false);
    };

    fetchCategories();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.usernameContainer}>
            <Text style={styles.greetingText}>Hello,</Text>
            <Header size="big" title={`${firstName} .${lastName[0]}👋🏾`} />
          </View>
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
            data={uiData}
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
                setUiData(prevData => [...prevData, ...data]);
                setCurrentPage(currentPage + 1);
                setIsLoading(false);
              }
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: verticalScale(16),
    paddingHorizontal: horizontalScale(24),
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
});
