import React, { useState } from "react";
import { Alert } from "react-native";
import { auth } from "../services/firebaseConfig";
import { criarContato } from "../services/api";
import ContatoForm from "../components/ContatoForm";

// Tela 5 - Cadastrar contato (API POST)
export default function NovoContatoScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  async function salvar(dados) {
    setLoading(true);
    try {
      await criarContato({ ...dados, userId: auth.currentUser.uid });
      Alert.alert("Sucesso", "Contato cadastrado com sucesso!");
      navigation.goBack();
    } catch (e) {
      Alert.alert("Erro", "Não foi possível cadastrar o contato. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return <ContatoForm onSubmit={salvar} loading={loading} />;
}
