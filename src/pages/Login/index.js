import React, { useState } from 'react';
import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Alert,
  Platform
} from 'react-native';

import { signin } from '../../services/auth';

import { SignHeader } from '../../components';

import {
  Container,
  InputContainer,
  InputTitle,
  Input,
  EnvelopeIcon,
  LockIcon,
  SubmitButton,
  SubmitButtonText,
  ForgotPasswordButton,
  ForgotPasswordButtonText
} from './styles';

export default function Login({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function handleSubmit() {
    if (!email || !password) return;

    Keyboard.dismiss();

    try {
      const response = await signin(email, password);
    } catch (err) {
      Alert.alert('Houve um erro ao tentar realizar o login');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1 }}
        enabled={Platform.OS === 'ios' ? true : false}
      >
        <SignHeader />

        <Container>
          <View>
            <InputTitle>E-MAIL</InputTitle>
            <InputContainer>
              <Input
                placeholder="Digite seu e-mail"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={text => setEmail(text)}
              />
              <EnvelopeIcon />
            </InputContainer>

            <InputTitle>SENHA</InputTitle>
            <InputContainer>
              <Input
                placeholder="Sua senha secreta"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                onChangeText={text => setPassword(text)}
              />
              <LockIcon />
            </InputContainer>
          </View>

          <View>
            <SubmitButton onPress={handleSubmit}>
              <SubmitButtonText>EMBARCAR NO FOGUETE</SubmitButtonText>
            </SubmitButton>

            <ForgotPasswordButton
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <ForgotPasswordButtonText>
                Esqueci minha senha
              </ForgotPasswordButtonText>
            </ForgotPasswordButton>
          </View>
        </Container>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}