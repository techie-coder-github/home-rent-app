
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, borderRadius, typography, spacing, shadows } from '../uikit/theme';

const Button = ({ title, onPress, variant = 'primary', loading = false, style, textStyle }) => {
    const isPrimary = variant === 'primary';
    const isOutline = variant === 'outline';

    const containerStyles = [
        styles.container,
        isPrimary && styles.primary,
        isOutline && styles.outline,
        variant === 'text' && styles.text,
        style,
    ];

    const labelStyles = [
        styles.label,
        isPrimary && styles.primaryLabel,
        isOutline && styles.outlineLabel,
        variant === 'text' && styles.textLabel,
        textStyle
    ];

    return (
        <TouchableOpacity
            style={containerStyles}
            onPress={onPress}
            activeOpacity={0.8}
            disabled={loading}
        >
            {loading ? (
                <ActivityIndicator color={isPrimary ? colors.white : colors.primary} />
            ) : (
                <Text style={labelStyles}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: spacing.m,
        paddingHorizontal: spacing.l,
        borderRadius: borderRadius.l,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    primary: {
        backgroundColor: colors.primary,
        ...shadows.medium,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: colors.primary,
    },
    text: {
        backgroundColor: 'transparent',
        paddingVertical: spacing.s,
    },
    label: {
        ...typography.button,
        textAlign: 'center',
    },
    primaryLabel: {
        color: colors.white,
    },
    outlineLabel: {
        color: colors.primary,
    },
    textLabel: {
        color: colors.primary,
        fontSize: 14,
    }
});

export default Button;
