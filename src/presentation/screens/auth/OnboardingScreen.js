import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const OnboardingScreen = ({navigation}) => {
  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2196F3" />
      
      {/* Background */}
      <View style={styles.backgroundGradient} />
      
      {/* Main Content */}
      <View style={styles.mainContent}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>PM</Text>
          </View>
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>Project Management</Text>
          <Text style={styles.subtitle}>
            Organize, track, and manage your projects efficiently
          </Text>
          <View style={styles.featuresContainer}>
            <Text style={styles.featureItem}>📊 Dashboard with project overview</Text>
            <Text style={styles.featureItem}>📋 Kanban board for task management</Text>
            <Text style={styles.featureItem}>⏰ Time tracking and reporting</Text>
            <Text style={styles.featureItem}>👥 Team collaboration workspace</Text>
          </View>
        </View>
      </View>

      {/* Swipe Indicator */}
      <View style={styles.swipeContainer}>
        <View style={styles.swipeIndicator}>
          <Text style={styles.swipeText}>Tap to continue</Text>
          <Text style={styles.arrowText}>→</Text>
        </View>
      </View>

      {/* Get Started Button */}
      <TouchableOpacity 
        style={styles.getStartedButton} 
        onPress={navigateToLogin}
        activeOpacity={0.8}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      {/* Skip Button */}
      <TouchableOpacity 
        style={styles.skipButton} 
        onPress={navigateToLogin}
        activeOpacity={0.7}>
        <Text style={styles.skipText}>Skip →</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2196F3',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#2196F3',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logoContainer: {
    marginBottom: 48,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  featuresContainer: {
    alignItems: 'flex-start',
  },
  featureItem: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 12,
    lineHeight: 24,
  },
  swipeContainer: {
    position: 'absolute',
    bottom: 140,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  swipeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  swipeText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    marginRight: 10,
  },
  arrowText: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  getStartedButton: {
    position: 'absolute',
    bottom: 70,
    left: 32,
    right: 32,
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: '#2196F3',
    fontSize: 18,
    fontWeight: 'bold',
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 10,
  },
  skipText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OnboardingScreen;