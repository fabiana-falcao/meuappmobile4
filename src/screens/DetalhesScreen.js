import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { buscarContato, excluirContato } from "../services/api";
import ConfirmarExclusaoModal from "../components/ConfirmarExclusaoModal";
import { s, colors } from "../theme";

// Tela 7 - Detalhes do contato (API GET /contatos/:id) + Tela 8 (confirmação) -> API DELETE
export default function DetalhesScreen({ route, navigation }) {
  const { id, contato: inicial } = route.params;
  const [contato, setContato] = useState(inicial);
  const [modal, setModal] = useState(false);
  const [excluindo, setExcluindo] = useState(false);

  useFocusEffect(
    useCallback(() => {
      buscarContato(id).then(setContato).catch(() =>
        Alert.alert("Erro", "Não foi possível atualizar os dados do contato.")
      );
    }, [id])
  );

  async function excluir() {
    setExcluindo(true);
    try {
      await excluirContato(id);
      setModal(false);
      Alert.alert("Sucesso", "Contato excluído com sucesso!");
      navigation.goBack();
    } catch (e) {
      setModal(false);
      Alert.alert("Erro", "Não foi possível excluir o contato.");
    } finally {
      setExcluindo(false);
    }
  }

  if (!contato) return <View style={s.center}><ActivityIndicator color={colors.primary} /></View>;

  const linha = (icon, texto) => (
    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
      <Ionicons name={icon} size={18} color={colors.muted} />
      <Text style={{ marginLeft: 10, color: colors.text, fontSize: 15 }}>{texto}</Text>
    </View>
  );

  return (
    <View style={s.screen}>
      <View style={{ alignItems: "center", marginBottom: 16 }}>
        <View style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: "#fff", fontSize: 24, fontWeight: "700" }}>
            {contato.nome?.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase()}
          </Text>
        </View>
        <Text style={[s.title, { marginTop: 10 }]}>{contato.nome}</Text>
      </View>

      {linha("call-outline", contato.telefone)}
      {linha("location-outline", contato.cidade)}
      {!!contato.anotacao && (
        <View style={{ backgroundColor: colors.soft, borderRadius: 10, padding: 12, marginTop: 16 }}>
          <Text style={{ color: colors.muted, fontSize: 12, marginBottom: 4 }}>Anotação</Text>
          <Text style={{ color: colors.text }}>{contato.anotacao}</Text>
        </View>
      )}

      <TouchableOpacity style={[s.btn, { marginTop: 24 }]} onPress={() => navigation.navigate("EditarContato", { contato })}>
        <Text style={s.btnText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={s.btnOutline} onPress={() => setModal(true)}>
        <Text style={s.btnOutlineText}>Excluir</Text>
      </TouchableOpacity>

      <ConfirmarExclusaoModal visible={modal} loading={excluindo} onCancel={() => setModal(false)} onConfirm={excluir} />
    </View>
  );
}
