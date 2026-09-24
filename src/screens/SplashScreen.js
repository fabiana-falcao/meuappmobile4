import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { s, colors } from "../theme";

// Tela 1 - Splash
export default function SplashScreen() {
  return (
    <View style={s.center}>
      <View style={{ backgroundColor: colors.primary, borderRadius: 24, padding: 22 }}>
        <Ionicons name="people" size={56} color="#fff" />
      </View>
      <Text style={[s.title, { marginTop: 16 }]}>Meus Contatos</Text>
      <Text style={s.subtitle}>Seus contatos sempre com você.</Text>
      <ActivityIndicator color={colors.primary} />
    </View>
  );
}
