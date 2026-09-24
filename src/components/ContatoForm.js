import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { s, colors } from "../theme";

export default function ContatoForm({ initial, onSubmit, loading, children }) {
  const [nome, setNome] = useState(initial?.nome || "");
  const [telefone, setTelefone] = useState(initial?.telefone || "");
  const [cidade, setCidade] = useState(initial?.cidade || "");
  const [anotacao, setAnotacao] = useState(initial?.anotacao || "");

  function salvar() {
    if (!nome.trim() || !telefone.trim() || !cidade.trim()) {
      Alert.alert("Atenção", "Preencha nome, telefone e cidade.");
      return;
    }
    onSubmit({ nome: nome.trim(), telefone: telefone.trim(), cidade: cidade.trim(), anotacao: anotacao.trim() });
  }

  const campo = (icon, placeholder, value, setter, extra = {}) => (
    <View style={[s.inputBox, extra.multiline && { alignItems: "flex-start", paddingTop: 4 }]}>
      <Ionicons name={icon} size={18} color={colors.muted} style={extra.multiline && { marginTop: 12 }} />
      <TextInput
        style={[s.input, extra.multiline && { height: 90, textAlignVertical: "top" }]}
        placeholder={placeholder}
        value={value}
        onChangeText={setter}
        {...extra}
      />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }} keyboardShouldPersistTaps="handled">
      {campo("person-outline", "Nome *", nome, setNome)}
      {campo("call-outline", "Telefone *", telefone, setTelefone, { keyboardType: "phone-pad" })}
      {campo("location-outline", "Cidade *", cidade, setCidade)}
      {campo("document-text-outline", "Anotação (opcional)", anotacao, setAnotacao, { multiline: true })}

      <TouchableOpacity style={s.btn} onPress={salvar} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.btnText}>Salvar</Text>}
      </TouchableOpacity>
      {children}
    </ScrollView>
  );
}
