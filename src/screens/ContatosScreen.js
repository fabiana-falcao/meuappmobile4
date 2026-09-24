import React, { useCallback, useLayoutEffect, useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { auth } from "../services/firebaseConfig";
import { listarContatos } from "../services/api";
import EstadoVazio from "../components/EstadoVazio";
import EstadoErro from "../components/EstadoErro";
import { colors, s } from "../theme";

// Tela 4 - Lista de contatos (API GET) + Tela 10 (vazia) + Tela 11 (erro)
export default function ContatosScreen({ navigation }) {
  const [contatos, setContatos] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("NovoContato")}>
          <Ionicons name="add-circle-outline" size={28} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro(false);
    try {
      const dados = await listarContatos(auth.currentUser.uid);
      setContatos(dados);
    } catch (e) {
      setErro(true);
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { carregar(); }, [carregar]));

  const filtrados = contatos
    .filter((c) => c.nome?.toLowerCase().includes(busca.toLowerCase()))
    .sort((a, b) => (a.nome || "").localeCompare(b.nome || ""));

  if (carregando) return <View style={s.center}><ActivityIndicator size="large" color={colors.primary} /></View>;
  if (erro) return <EstadoErro onTentarNovamente={carregar} />;
  if (contatos.length === 0) return <EstadoVazio onAdicionar={() => navigation.navigate("NovoContato")} />;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={[s.inputBox, { margin: 16, marginBottom: 4 }]}>
        <Ionicons name="search-outline" size={18} color={colors.muted} />
        <TextInput style={s.input} placeholder="Buscar contato..." value={busca} onChangeText={setBusca} />
      </View>
      <FlatList
        data={filtrados}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<Text style={[s.subtitle, { marginTop: 30 }]}>Nenhum resultado para a busca.</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Detalhes", { id: item.id, contato: item })}
            style={{ flexDirection: "row", alignItems: "center", paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: 0.5, borderColor: colors.border }}>
            <View style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center", marginRight: 12 }}>
              <Text style={{ color: "#fff", fontWeight: "700" }}>
                {item.nome?.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase()}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "600", color: colors.text }}>{item.nome}</Text>
              <Text style={{ color: colors.muted, fontSize: 12 }}>{item.telefone}</Text>
              <Text style={{ color: colors.muted, fontSize: 12 }}>{item.cidade}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.muted} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
