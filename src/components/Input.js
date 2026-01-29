
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { colors, borderRadius, typography, spacing } from '../uikit/theme';

const Input = ({ label, error, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[
                styles.inputContainer,
                isFocused && styles.focused,
                error && styles.errorBorder
            ]}>
                <TextInput
                    style={styles.input}
                    placeholderTextColor={colors.textSecondary}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.m,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.text,
        marginBottom: spacing.s,
    },
    inputContainer: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: borderRadius.m,
        paddingHorizontal: spacing.m,
        height: 50,
        justifyContent: 'center',
    },
    input: {
        fontSize: 16,
        color: colors.text,
        height: '100%',
        paddingVertical: 0, // Reset default padding on Android
    },
    focused: {
        borderColor: colors.primary,
        borderWidth: 2,
    },
    errorBorder: {
        borderColor: colors.error,
    },
    errorText: {
        ...typography.caption,
        color: colors.error,
        marginTop: spacing.xs,
    },
});

export default Input;
