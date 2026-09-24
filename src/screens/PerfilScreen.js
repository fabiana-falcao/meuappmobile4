import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { s, colors } from "../theme";

// Tela 9 - Perfil / Logout (Firebase Auth)
export default function PerfilScreen() {
  async function sair() {
    try {
      await signOut(auth);
      // o listener no App.js volta para a tela de login
    } catch (e) {
      Alert.alert("Erro", "Não foi possível sair da conta.");
    }
  }

  const item = (icon, label, onPress, cor = colors.text) => (
    <TouchableOpacity onPress={onPress} style={{ flexDirection: "row", alignItems: "center", paddingVertical: 16, borderBottomWidth: 0.5, borderColor: colors.border }}>
      <Ionicons name={icon} size={20} color={cor} />
      <Text style={{ flex: 1, marginLeft: 12, color: cor, fontSize: 15 }}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color={colors.muted} />
    </TouchableOpacity>
  );

  return (
    <View style={s.screen}>
      <View style={{ alignItems: "center", marginVertical: 20 }}>
        <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" }}>
          <Ionicons name="person" size={40} color="#fff" />
        </View>
        <Text style={[s.title, { fontSize: 16, marginTop: 10 }]}>{auth.currentUser?.email}</Text>
      </View>
      {item("person-outline", "Meus dados", () => Alert.alert("Meus dados", `E-mail: ${auth.currentUser?.email}`))}
      {item("help-circle-outline", "Ajuda", () => Alert.alert("Ajuda", "Gerencie seus contatos na aba Contatos."))}
      {item("log-out-outline", "Sair da conta", sair, colors.danger)}
    </View>
  );
}
