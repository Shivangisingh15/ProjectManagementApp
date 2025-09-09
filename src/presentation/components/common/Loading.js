import React from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import {colors} from '../../styles/colors';
import {typography} from '../../styles/typography';
import {spacing} from '../../styles/spacing';

const Loading = ({
  size = 'large',
  color = colors.primary,
  text,
  overlay = false,
  style,
}) => {
  if (overlay) {
    return (
      <View style={styles.overlay}>
        <View style={styles.overlayContent}>
          <ActivityIndicator size={size} color={color} />
          {text && <Text style={styles.overlayText}>{text}</Text>}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  text: {
    ...typography.body2,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  overlayContent: {
    backgroundColor: colors.white,
    padding: spacing.xl,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 120,
  },
  overlayText: {
    ...typography.body2,
    color: colors.textPrimary,
    marginTop: spacing.md,
    textAlign: 'center',
  },
});

export default Loading;
