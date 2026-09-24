import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { mensagemErroAuth } from "../services/authErrors";
import { s, colors } from "../theme";

// Tela 3 - Login (Firebase Auth)
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [ver, setVer] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !senha) {
      Alert.alert("Atenção", "Preencha e-mail e senha.");
      return;
    }
    setCarregando(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), senha);
      // Sucesso: o listener de autenticação no App.js troca de tela automaticamente
    } catch (error) {
      Alert.alert("Erro", mensagemErroAuth(error.code));
    } finally {
      setCarregando(false);
    }
  }

  async function esqueciSenha() {
    if (!email.trim()) {
      Alert.alert("Atenção", "Digite seu e-mail para receber o link de redefinição.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email.trim());
      Alert.alert("Sucesso", "Enviamos um link de redefinição para o seu e-mail.");
    } catch (error) {
      Alert.alert("Erro", mensagemErroAuth(error.code));
    }
  }

  return (
    <ScrollView contentContainerStyle={[s.center, { flexGrow: 1 }]} keyboardShouldPersistTaps="handled">
      <View style={{ width: "100%" }}>
        <Ionicons name="person" size={40} color={colors.primary} style={{ alignSelf: "center" }} />
        <Text style={s.title}>Bem-vindo de volta!</Text>
        <Text style={s.subtitle}>Faça login para acessar seus contatos.</Text>

        <View style={s.inputBox}>
          <Ionicons name="mail-outline" size={18} color={colors.muted} />
          <TextInput style={s.input} placeholder="E-mail" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
        </View>
        <View style={s.inputBox}>
          <Ionicons name="lock-closed-outline" size={18} color={colors.muted} />
          <TextInput style={s.input} placeholder="Senha" secureTextEntry={!ver} value={senha} onChangeText={setSenha} />
          <TouchableOpacity onPress={() => setVer(!ver)}>
            <Ionicons name={ver ? "eye-off-outline" : "eye-outline"} size={18} color={colors.muted} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={s.btn} onPress={handleLogin} disabled={carregando}>
          {carregando ? <ActivityIndicator color="#fff" /> : <Text style={s.btnText}>Entrar</Text>}
        </TouchableOpacity>

        <Text style={[s.link, { textAlign: "center", marginTop: 14 }]} onPress={esqueciSenha}>Esqueceu sua senha?</Text>
        <Text style={{ textAlign: "center", marginTop: 14, color: colors.muted }}>
          Não tem uma conta?{" "}
          <Text style={s.link} onPress={() => navigation.navigate("Cadastro")}>Cadastre-se</Text>
        </Text>
      </View>
    </ScrollView>
  );
}
