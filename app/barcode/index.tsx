import { Camera, CameraView } from "expo-camera";
import { Stack } from "expo-router";
import { AppState, Linking, Platform, SafeAreaView, StatusBar, StyleSheet, Alert, View, Animated, Text, Button, } from "react-native";
import { Overlay } from "./Overlay";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraViewReady, setCameraViewReady] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [scannedData, setScannedData] = useState<null | { type: string; data: string }>(null);

  const cameraOpacity = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");

      if (status !== "granted") {
        Alert.alert("Camera Access Denied", "Enable it in settings to scan codes.");
      }
    })();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
        setScannedData(null);
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (cameraReady && cameraViewReady) {
      Animated.timing(cameraOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();

      const timeout = setTimeout(() => {
        setShowOverlay(true);
      }, 600);

      return () => clearTimeout(timeout);
    } else {
      setShowOverlay(false);
      cameraOpacity.setValue(0);
    }
  }, [cameraReady, cameraViewReady]);

  useEffect(() => {
    Animated.timing(overlayOpacity, {
      toValue: showOverlay ? 1 : 0,
      duration: showOverlay ? 300 : 200,
      useNativeDriver: true,
    }).start();
  }, [showOverlay]);

  if (hasPermission === false) {
    return null;
  }

  const handleReset = () => {
    qrLock.current = false;
    setScannedData(null);
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFill}>
      <Stack.Screen options={{ title: "Scanner", headerShown: false }} />
      {Platform.OS === "android" && <StatusBar hidden />}

      {/* If scanned, show result screen */}
      {scannedData ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Type: {scannedData.type}</Text>
          <Text style={styles.resultText}>Data: {scannedData.data}</Text>
          <View style={{ marginTop: 20 }}>
            <Button title="Scan Again" onPress={handleReset} />
          </View>
        </View>
      ) : (
        <>
          <View style={StyleSheet.absoluteFill} onLayout={() => setCameraViewReady(true)}>
            <Animated.View style={[StyleSheet.absoluteFill, { opacity: cameraOpacity }]}>
              <CameraView
                style={StyleSheet.absoluteFill}
                facing="back"
                onCameraReady={() => setCameraReady(true)}
                barcodeScannerSettings={{
                  barcodeTypes: [
                    "code128",
                    "code39",
                    "ean13",
                    "ean8",
                    "upc_a",
                    "upc_e",
                    "pdf417",
                    "itf14",
                    "aztec",
                    "datamatrix",
                  ],
                }}
                onBarcodeScanned={({ data, type }) => {
                  if (data && !qrLock.current) {
                    qrLock.current = true;
                    setTimeout(() => {
                      setScannedData({ type, data });
                    }, 300);
                  }
                }}
              />
            </Animated.View>
          </View>

          <Animated.View
            style={[StyleSheet.absoluteFill, { opacity: overlayOpacity }]}
            pointerEvents={showOverlay ? "auto" : "none"}
          >
            <Overlay />
          </Animated.View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  resultContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  resultText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
});
