import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebaseConfig";
import { colors } from "./theme";

import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import CadastroScreen from "./screens/CadastroScreen";
import ContatosScreen from "./screens/ContatosScreen";
import NovoContatoScreen from "./screens/NovoContatoScreen";
import EditarContatoScreen from "./screens/EditarContatoScreen";
import DetalhesScreen from "./screens/DetalhesScreen";
import PerfilScreen from "./screens/PerfilScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const headerBlue = {
  headerStyle: { backgroundColor: colors.primary },
  headerTintColor: "#fff",
  headerTitleStyle: { fontWeight: "700" },
};

function ContatosStack() {
  return (
    <Stack.Navigator screenOptions={headerBlue}>
      <Stack.Screen name="Contatos" component={ContatosScreen} options={{ title: "Meus Contatos" }} />
      <Stack.Screen name="NovoContato" component={NovoContatoScreen} options={{ title: "Novo Contato" }} />
      <Stack.Screen name="Detalhes" component={DetalhesScreen} options={{ title: "Detalhes" }} />
      <Stack.Screen name="EditarContato" component={EditarContatoScreen} options={{ title: "Editar Contato" }} />
    </Stack.Navigator>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        ...headerBlue,
        tabBarActiveTintColor: colors.primary,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={route.name === "ContatosTab" ? "people-outline" : "person-outline"} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen name="ContatosTab" component={ContatosStack} options={{ title: "Contatos", headerShown: false }} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [inicializando, setInicializando] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setTimeout(() => setInicializando(false), 1500); // mantém a Splash por 1,5 s
    });
    return unsub;
  }, []);

  if (inicializando) return <SplashScreen />;

  return (
    <NavigationContainer>
      {user ? (
        <Tabs />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
