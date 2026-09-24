import React from "react";
import { Modal, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";

// Tela 8 - Confirmação de exclusão
export default function ConfirmarExclusaoModal({ visible, loading, onCancel, onConfirm }) {
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onCancel}>
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.55)", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <View style={{ backgroundColor: "#fff", borderRadius: 16, padding: 22, width: "100%", alignItems: "center" }}>
          <View style={{ backgroundColor: colors.danger, borderRadius: 30, padding: 14, marginBottom: 12 }}>
            <Ionicons name="trash-outline" size={26} color="#fff" />
          </View>
          <Text style={{ fontSize: 18, fontWeight: "700", color: colors.text }}>Excluir contato?</Text>
          <Text style={{ textAlign: "center", color: colors.muted, marginVertical: 10 }}>
            Tem certeza que deseja excluir este contato? Esta ação não pode ser desfeita.
          </Text>
          <View style={{ flexDirection: "row", gap: 10, marginTop: 6 }}>
            <TouchableOpacity onPress={onCancel} disabled={loading}
              style={{ flex: 1, borderWidth: 1, borderColor: colors.border, borderRadius: 10, paddingVertical: 12, alignItems: "center" }}>
              <Text style={{ color: colors.text, fontWeight: "600" }}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} disabled={loading}
              style={{ flex: 1, backgroundColor: colors.danger, borderRadius: 10, paddingVertical: 12, alignItems: "center" }}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: "#fff", fontWeight: "700" }}>Excluir</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
