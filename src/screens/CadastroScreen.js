import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { mensagemErroAuth } from "../services/authErrors";
import { s, colors } from "../theme";

// Tela 2 - Cadastro de usuário (Firebase Auth)
export default function CadastroScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [ver, setVer] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function handleCadastro() {
    if (!email.trim() || !senha) {
      Alert.alert("Atenção", "Preencha e-mail e senha.");
      return;
    }
    setCarregando(true);
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), senha);
      Alert.alert("Sucesso", "Conta criada com sucesso!");
      // o listener no App.js leva o usuário para a área logada
    } catch (error) {
      Alert.alert("Erro", mensagemErroAuth(error.code));
    } finally {
      setCarregando(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={[s.center, { flexGrow: 1 }]} keyboardShouldPersistTaps="handled">
      <View style={{ width: "100%" }}>
        <Ionicons name="person" size={40} color={colors.primary} style={{ alignSelf: "center" }} />
        <Text style={s.title}>Criar sua conta</Text>
        <Text style={s.subtitle}>Cadastre-se com seu e-mail e senha para começar.</Text>

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

        <TouchableOpacity style={s.btn} onPress={handleCadastro} disabled={carregando}>
          {carregando ? <ActivityIndicator color="#fff" /> : <Text style={s.btnText}>Cadastrar</Text>}
        </TouchableOpacity>

        <Text style={{ textAlign: "center", marginTop: 20, color: colors.muted }}>
          Já tem uma conta?{" "}
          <Text style={s.link} onPress={() => navigation.navigate("Login")}>Entrar</Text>
        </Text>
      </View>
    </ScrollView>
  );
}
