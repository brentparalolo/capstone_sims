import { View, Text, StyleSheet, SafeAreaView, Pressable, ScrollView, } from "react-native";
import { Stack, useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useCameraPermissions } from "expo-camera";
import { SafeAreaView as SafeAreaInsetView } from "react-native-safe-area-context";

export default function Home() {
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaInsetView style={styles.headerInset} edges={["top"]}>
        <View style={styles.header}>
          <Text style={styles.headerText}>LIMS SCANNER</Text>
        <Pressable onPress={() => router.push("/login")}>
          <Text style={styles.headerRight}>LOG IN</Text>
        </Pressable>
        </View>
      </SafeAreaInsetView>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.cardText}>
           Welcome to LIMS Scanner. Please enable camera permission to start scanning.
          </Text>
          <Pressable onPress={requestPermission} style={styles.button}>
            <Text style={styles.buttonText}>Request Permission</Text>
          </Pressable>
        </View>

        <View>
          <Pressable
            onPress={() => {
              if (isPermissionGranted) {
                router.push("/scanner");
              }
            }}
            style={({ pressed }) => [
              styles.button,
              !isPermissionGranted && styles.disabledButton,
              pressed && styles.buttonPressed,
            ]}
            disabled={!isPermissionGranted}
          >
            <View style={styles.buttonInner}>
              <MaterialIcons name="qr-code-scanner" size={20} color="white" />
              <Text style={styles.buttonText}>SCAN QR CODE</Text>
            </View>
          </Pressable>
        </View>
        
         <View>
          <Pressable
            onPress={() => {
              if (isPermissionGranted) {
                router.push("/barcode");
              }
            }}
            style={({ pressed }) => [
              styles.button,
              !isPermissionGranted && styles.disabledButton,
              pressed && styles.buttonPressed,
            ]}
            disabled={!isPermissionGranted}
          >
            <View style={styles.buttonBcode}>
              <MaterialCommunityIcons name="barcode-scan" size={20} color="white" />
              <Text style={styles.buttonText}>SCAN BARCODE</Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
  },
  headerInset: {
    backgroundColor: "#CC6600",
  },
  header: {
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
  scrollContainer: {
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#36454F",
    padding: 20,
    borderRadius: 12,
    borderColor: "#333",
    borderWidth: 1,
    marginBottom: 20,
  },
  cardText: {
    fontSize: 16,
    color: "#E0E0E0",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#CC6600",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonBcode: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  disabledButton: {
    backgroundColor: "#AA4400",
    opacity: 0.6,
  },
  buttonPressed: {
    opacity: 0.8,
  },
});
  