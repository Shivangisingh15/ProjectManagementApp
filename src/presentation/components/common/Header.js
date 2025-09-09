 import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../styles/colors';
import {typography} from '../../styles/typography';
import {spacing} from '../../styles/spacing';

const Header = ({
  title,
  subtitle,
  leftIcon = 'menu',
  rightIcon,
  onLeftPress,
  onRightPress,
  backgroundColor = colors.white,
  showBack = false,
  navigation,
}) => {
  const handleLeftPress = () => {
    if (showBack && navigation) {
      navigation.goBack();
    } else if (onLeftPress) {
      onLeftPress();
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor}]}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.iconButton} onPress={handleLeftPress}>
          <Icon
            name={showBack ? 'arrow-back' : leftIcon}
            size={24}
            color={colors.textPrimary}
          />
        </TouchableOpacity>
        
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>
        
        {rightIcon ? (
          <TouchableOpacity style={styles.iconButton} onPress={onRightPress}>
            <Icon name={rightIcon} size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconButton} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.white,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: spacing.sm,
  },
  title: {
    ...typography.h5,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});

export default Header;

