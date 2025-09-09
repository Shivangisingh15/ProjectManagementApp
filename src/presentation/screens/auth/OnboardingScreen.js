import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Button from '../../components/common/Button';
import {ROUTES} from '../../../shared/constants/routes';
import {APP_CONSTANTS} from '../../../shared/constants/appConstants';

const {width} = Dimensions.get('window');

const OnboardingScreen = ({navigation}) => {
  const onDone = () => {
    navigation.navigate(ROUTES.LOGIN);
  };

  const onSkip = () => {
    navigation.navigate(ROUTES.LOGIN);
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>{item.image}</Text>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  };

  const renderNextButton = () => {
    return (
      <View style={styles.buttonContainer}>
        <Button title="Next" variant="primary" size="medium" />
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <View style={styles.buttonContainer}>
        <Button title="Get Started" variant="primary" size="medium" />
      </View>
    );
  };

  const renderSkipButton = () => {
    return (
      <View style={styles.skipContainer}>
        <Button title="Skip" variant="text" size="small" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AppIntroSlider
        data={APP_CONSTANTS.ONBOARDING_SLIDES}
        renderItem={renderItem}
        onDone={onDone}
        onSkip={onSkip}
        showSkipButton={true}
        renderNextButton={renderNextButton}
        renderDoneButton={renderDoneButton}
        renderSkipButton={renderSkipButton}
        activeDotStyle={styles.activeDot}
        dotStyle={styles.dot}
        dotClickEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  imageContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: width * 0.7,
    height: width * 0.5,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 14,
    color: '#9E9E9E',
    textAlign: 'center',
  },
  content: {
    flex: 0.4,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212121',
    textAlign: 'center',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipContainer: {
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: '#F5F5F5',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#2196F3',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default OnboardingScreen;

