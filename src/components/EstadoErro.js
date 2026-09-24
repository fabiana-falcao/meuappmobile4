import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { s, colors } from "../theme";

// Tela 11 - Erro de API
export default function EstadoErro({ onTentarNovamente }) {
  return (
    <View style={s.center}>
      <Ionicons name="alert-circle-outline" size={64} color={colors.danger} />
      <Text style={[s.title, { fontSize: 17, marginTop: 12 }]}>Não foi possível carregar os contatos.</Text>
      <Text style={s.subtitle}>Verifique sua conexão e tente novamente.</Text>
      <TouchableOpacity style={[s.btn, { paddingHorizontal: 24 }]} onPress={onTentarNovamente}>
        <Text style={s.btnText}>Tentar novamente</Text>
      </TouchableOpacity>
    </View>
  );
}
