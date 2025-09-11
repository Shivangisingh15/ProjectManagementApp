import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StatusBar,
} from 'react-native';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import {useAuth} from '../../../shared/hooks/useAuth';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const {login, loading} = useAuth();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');

    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    if (!isValid) return;

    // FIXED: Proper navigation to main app
    const result = await login(email, password);
    if (result.success) {
      // Navigate to main app using the correct route structure
      navigation.getParent()?.reset({
        index: 0,
        routes: [{name: 'Main'}],
      });
    } else {
      Alert.alert('Login Failed', result.error || 'Please check your credentials');
    }
  };

  const handleGoogleSignIn = async () => {
    const result = await login('google@gmail.com', 'google123');
    if (result.success) {
      navigation.getParent()?.reset({
        index: 0,
        routes: [{name: 'Main'}],
      });
    }
  };

  const handleQuickLogin = () => {
    setEmail('test@example.com');
    setPassword('123456');
    setTimeout(async () => {
      const result = await login('test@example.com', '123456');
      if (result.success) {
        navigation.getParent()?.reset({
          index: 0,
          routes: [{name: 'Main'}],
        });
      }
    }, 100);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <View style={styles.backIcon}>
              <Text style={styles.backText}>←</Text>
            </View>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Sign in to continue to your dashboard</Text>
          </View>

          <Card style={styles.formCard}>
            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              leftIcon="email"
              error={emailError}
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              leftIcon="lock"
              error={passwordError}
            />

            <Button
              title="Sign In"
              onPress={handleLogin}
              loading={loading}
              style={styles.signInButton}
            />

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <Button
              title="Continue with Google"
              onPress={handleGoogleSignIn}
              variant="secondary"
              style={styles.googleButton}
            />

            {/* Quick Login for Testing */}
            <Button
              title="Quick Login (Demo)"
              onPress={handleQuickLogin}
              variant="outline"
              style={styles.quickButton}
            />
          </Card>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account?{' '}
              <Text style={styles.linkText} onPress={() => Alert.alert('Sign Up', 'Sign up feature coming soon!')}>
                Sign Up
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 20,
  },
  backIcon: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backText: {
    fontSize: 24,
    color: '#2196F3',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
  },
  formCard: {
    padding: 24,
    marginBottom: 24,
  },
  signInButton: {
    marginTop: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#F5F5F5',
  },
  dividerText: {
    fontSize: 12,
    color: '#9E9E9E',
    marginHorizontal: 16,
  },
  googleButton: {
    marginBottom: 12,
  },
  quickButton: {
    marginBottom: 8,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#757575',
  },
  linkText: {
    color: '#2196F3',
    fontWeight: '600',
  },
});

export default LoginScreen;
