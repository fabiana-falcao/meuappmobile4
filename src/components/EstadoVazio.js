import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { s, colors } from "../theme";

// Tela 10 - Lista vazia
export default function EstadoVazio({ onAdicionar }) {
  return (
    <View style={s.center}>
      <Ionicons name="people-outline" size={64} color={colors.muted} />
      <Text style={[s.title, { fontSize: 17, marginTop: 12 }]}>Nenhum contato ainda</Text>
      <Text style={s.subtitle}>Adicione seus primeiros contatos para começar.</Text>
      <TouchableOpacity style={[s.btn, { paddingHorizontal: 24 }]} onPress={onAdicionar}>
        <Text style={s.btnText}>Adicionar contato</Text>
      </TouchableOpacity>
    </View>
  );
}
