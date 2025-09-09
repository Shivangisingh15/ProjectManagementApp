 import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../styles/colors';
import {spacing} from '../../styles/spacing';

const Card = ({
  children,
  style,
  onPress,
  padding = spacing.md,
  margin = 0,
  elevation = 2,
}) => {
  const Component = onPress ? TouchableOpacity : View;
  
  return (
    <Component
      style={[
        styles.card,
        {
          padding,
          margin,
          elevation,
          shadowOpacity: elevation * 0.1,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={onPress ? 0.8 : 1}>
      {children}
    </Component>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 8,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    elevation: 2,
  },
});

export default Card;

