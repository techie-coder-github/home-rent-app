
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../services/supabase';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { colors, spacing, typography } from '../../uikit/theme';

const SignupScreen = ({ navigation }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [aadhar, setAadhar] = useState('');
    const [dob, setDob] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const validate = () => {
        if (!fullName || !email || !password || !aadhar || !dob) {
            setError('All fields are required');
            return false;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }
        // Simple email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Invalid email address');
            return false;
        }
        return true;
    };

    const handleSignup = async () => {
        if (!validate()) return;

        setLoading(true);
        setError('');

        try {
            // 1. Sign up auth user
            const { data: { user }, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (signUpError) throw signUpError;

            if (user) {
                // 2. Create Profile
                // Note: In a real app, you might handle this with a Postgres Trigger to ensure atomicity
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert([
                        {
                            id: user.id,
                            full_name: fullName,
                            email: email,
                            aadhar_number: aadhar,
                            dob: dob,
                            created_at: new Date(),
                        }
                    ]);

                if (profileError) {
                    // If profile creation fails, we might want to alert or retry.
                    console.error("Profile creation failed", profileError);
                    throw new Error('Failed to create user profile. ' + profileError.message);
                }

                // Success! 
                // AuthContext should pick up the session change.
                // But we might need to manually ensure we query the profile in AuthContext
                Alert.alert('Success', 'Account created successfully!');
            }

        } catch (e) {
            setError(e.message);
            Alert.alert('Signup Failed', e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Sign up to get started</Text>
                </View>

                <View style={styles.form}>
                    <Input
                        label="Full Name"
                        placeholder="John Doe"
                        value={fullName}
                        onChangeText={setFullName}
                    />
                    <Input
                        label="Email Address"
                        placeholder="john@example.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Input
                        label="Aadhar Number"
                        placeholder="1234 5678 9012"
                        value={aadhar}
                        onChangeText={setAadhar}
                        keyboardType="numeric"
                    />
                    <Input
                        label="Date of Birth (YYYY-MM-DD)"
                        placeholder="1990-01-01"
                        value={dob}
                        onChangeText={setDob}
                    />
                    <Input
                        label="Password"
                        placeholder="At least 6 characters"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <Button
                        title="Sign Up"
                        onPress={handleSignup}
                        loading={loading}
                        style={styles.marginTop}
                    />
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.linkText}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        padding: spacing.l,
        paddingBottom: spacing.xl,
    },
    header: {
        marginBottom: spacing.l,
        marginTop: spacing.m,
    },
    title: {
        ...typography.h1,
        color: colors.text,
        marginBottom: spacing.s,
    },
    subtitle: {
        ...typography.body,
        color: colors.textSecondary,
    },
    form: {
        marginBottom: spacing.xl,
    },
    marginTop: {
        marginTop: spacing.m,
    },
    errorText: {
        color: colors.error,
        marginBottom: spacing.m,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: spacing.l,
    },
    footerText: {
        color: colors.textSecondary,
        fontSize: 16,
    },
    linkText: {
        color: colors.primary,
        fontWeight: '600',
        fontSize: 16,
    }
});

export default SignupScreen;
