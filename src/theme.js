import { StyleSheet } from "react-native";

export const colors = {
  primary: "#0A5FE0",
  danger: "#E53935",
  bg: "#FFFFFF",
  soft: "#F3F5F9",
  border: "#D9DEE7",
  text: "#1B2330",
  muted: "#6B7686",
};

export const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg, padding: 20 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  title: { fontSize: 22, fontWeight: "700", color: colors.text, textAlign: "center" },
  subtitle: { fontSize: 13, color: colors.muted, textAlign: "center", marginTop: 6, marginBottom: 20 },
  inputBox: {
    flexDirection: "row", alignItems: "center", backgroundColor: colors.soft,
    borderWidth: 1, borderColor: colors.border, borderRadius: 10,
    paddingHorizontal: 12, marginBottom: 12,
  },
  input: { flex: 1, paddingVertical: 12, marginLeft: 8, color: colors.text },
  btn: { backgroundColor: colors.primary, borderRadius: 10, paddingVertical: 14, alignItems: "center", marginTop: 4 },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  btnOutline: { borderWidth: 1.5, borderColor: colors.danger, borderRadius: 10, paddingVertical: 13, alignItems: "center", marginTop: 12 },
  btnOutlineText: { color: colors.danger, fontWeight: "700", fontSize: 15 },
  link: { color: colors.primary, fontWeight: "600" },
});
