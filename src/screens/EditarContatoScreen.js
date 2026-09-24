import React, { useState } from "react";
import { Alert, Text, TouchableOpacity } from "react-native";
import { atualizarContato, excluirContato } from "../services/api";
import ContatoForm from "../components/ContatoForm";
import ConfirmarExclusaoModal from "../components/ConfirmarExclusaoModal";
import { s } from "../theme";

// Tela 6 - Editar contato (API PUT) + botão de exclusão (API DELETE)
export default function EditarContatoScreen({ route, navigation }) {
  const { contato } = route.params;
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [excluindo, setExcluindo] = useState(false);

  async function salvar(dados) {
    setLoading(true);
    try {
      await atualizarContato(contato.id, { ...contato, ...dados });
      Alert.alert("Sucesso", "Contato atualizado com sucesso!");
      navigation.navigate("Contatos");
    } catch (e) {
      Alert.alert("Erro", "Não foi possível atualizar o contato.");
    } finally {
      setLoading(false);
    }
  }

  async function excluir() {
    setExcluindo(true);
    try {
      await excluirContato(contato.id);
      setModal(false);
      Alert.alert("Sucesso", "Contato excluído com sucesso!");
      navigation.navigate("Contatos");
    } catch (e) {
      setModal(false);
      Alert.alert("Erro", "Não foi possível excluir o contato.");
    } finally {
      setExcluindo(false);
    }
  }

  return (
    <>
      <ContatoForm initial={contato} onSubmit={salvar} loading={loading}>
        <TouchableOpacity style={s.btnOutline} onPress={() => setModal(true)}>
          <Text style={s.btnOutlineText}>Excluir contato</Text>
        </TouchableOpacity>
      </ContatoForm>
      <ConfirmarExclusaoModal visible={modal} loading={excluindo} onCancel={() => setModal(false)} onConfirm={excluir} />
    </>
  );
}
