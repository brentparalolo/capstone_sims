import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView, } from "react-native";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Login() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <Text style={styles.headerText}>LIMS SCANNER</Text>
        <Pressable onPress={() => router.replace("/")}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </Pressable>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>LOG IN NOW</Text>

            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#AAA"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#AAA"
              secureTextEntry
            />

            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>LOG IN</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
  },
  header: {
    backgroundColor: "#CC6600",
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerRight: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  flex: {
    flex: 1,
  },
  scroll: {
    padding: 20,
    justifyContent: "center",
    flexGrow: 1,
  },
  card: {
    backgroundColor: "#36454F",
    borderRadius: 12,
    borderColor: "#333",
    borderWidth: 1,
    padding: 20,
  },
  cardTitle: {
    fontSize: 18,
    color: "#E0E0E0",
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#2A2A2A",
    color: "#FFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderColor: "#444",
    borderWidth: 1,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#CC6600",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
