import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import Header from '../../components/common/Header';
import {useAuth} from '../../../shared/hooks/useAuth';

const {width} = Dimensions.get('window');

const EmailVerificationScreen = ({navigation, route}) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const {verifyEmail, loading} = useAuth();
  
  const email = route?.params?.email || '';

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // FIXED: Navigation to main app after verification
  const handleVerifyCode = async () => {
    setError('');
    
    if (!verificationCode) {
      setError('Please enter verification code');
      return;
    }

    if (verificationCode.length !== 6) {
      setError('Verification code must be 6 digits');
      return;
    }

    const result = await verifyEmail(email, verificationCode);
    if (result.success) {
      Alert.alert(
        'Success', 
        'Email verified successfully!', 
        [
          {
            text: 'Continue',
            onPress: () => {
              // FIXED: Navigate to main app
              navigation.reset({
                index: 0,
                routes: [{name: 'Main'}],
              });
            },
          },
        ]
      );
    } else {
      setError(result.error || 'Verification failed');
    }
  };

  const handleResendCode = () => {
    if (canResend) {
      setCountdown(60);
      setCanResend(false);
      Alert.alert('Code Sent', 'A new verification code has been sent to your email');
    }
  };

  const formatEmail = (email) => {
    if (!email) return '';
    const [username, domain] = email.split('@');
    if (username.length <= 2) return email;
    const maskedUsername = username[0] + '*'.repeat(username.length - 2) + username[username.length - 1];
    return maskedUsername + '@' + domain;
  };

  return (
    <View style={styles.container}>
      <Header
        title="Email Verification"
        showBack={true}
        navigation={navigation}
      />
      
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.iconPlaceholder}>
            <Text style={styles.iconText}>📧</Text>
          </View>
        </View>

        <Text style={styles.title}>Check Your Email</Text>
        <Text style={styles.subtitle}>
          We've sent a verification code to{'\n'}
          <Text style={styles.emailText}>{formatEmail(email)}</Text>
        </Text>

        <Card style={styles.formCard}>
          <Input
            label="Verification Code"
            placeholder="Enter 6-digit code"
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="number-pad"
            maxLength={6}
            error={error}
            style={styles.codeInput}
          />

          <Button
            title="Verify Email"
            onPress={handleVerifyCode}
            loading={loading}
            style={styles.verifyButton}
          />

          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>
              Didn't receive the code?{' '}
            </Text>
            {canResend ? (
              <Text style={styles.resendLink} onPress={handleResendCode}>
                Resend Code
              </Text>
            ) : (
              <Text style={styles.countdownText}>
                Resend in {countdown}s
              </Text>
            )}
          </View>
        </Card>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>📱 Auto-Verification</Text>
          <Text style={styles.infoText}>
            For Gmail accounts, we'll automatically detect and verify the code when you receive the email.
          </Text>
        </View>

        {/* ADDED: Quick verification for testing */}
        <View style={styles.testingBox}>
          <Text style={styles.testingTitle}>🔧 For Testing</Text>
          <Text style={styles.testingText}>
            Use code: 123456 for quick testing
          </Text>
          <Button
            title="Quick Verify (Testing)"
            onPress={() => {
              setVerificationCode('123456');
              setTimeout(() => handleVerifyCode(), 100);
            }}
            variant="outline"
            size="small"
            style={styles.testButton}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212121',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  emailText: {
    fontWeight: '600',
    color: '#2196F3',
  },
  formCard: {
    padding: 24,
    marginBottom: 24,
  },
  codeInput: {
    marginBottom: 16,
  },
  verifyButton: {
    marginBottom: 16,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendText: {
    fontSize: 14,
    color: '#757575',
  },
  resendLink: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '600',
  },
  countdownText: {
    fontSize: 14,
    color: '#9E9E9E',
  },
  infoBox: {
    backgroundColor: '#E8F5E8',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#00BCD4',
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#757575',
    lineHeight: 16,
  },
  // ADDED: Testing section
  testingBox: {
    backgroundColor: '#FFF3E0',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
    alignItems: 'center',
  },
  testingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  testingText: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 12,
    textAlign: 'center',
  },
  testButton: {
    minWidth: 150,
  },
});

export default EmailVerificationScreen;
