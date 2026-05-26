import React, { useState, useCallback } from 'react';
import { View, ActivityIndicator, Text, StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

const MC_URL = 'http://100.126.125.61:3001';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const onLoadEnd = useCallback(() => {
    setLoading(false);
  }, []);

  const onError = useCallback(() => {
    setLoading(false);
    setError(true);
  }, []);

  const onReload = useCallback(() => {
    setError(false);
    setLoading(true);
  }, []);

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Connection Failed</Text>
        <Text style={styles.errorText}>
          Can't reach the Mission Control server. Make sure you're connected to
          Tailscale and your PC is running.
        </Text>
        <Text style={styles.retryButton} onPress={onReload}>
          Retry
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingTitle}>Mission Control</Text>
          <Text style={styles.loadingText}>Connecting...</Text>
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      )}
      <WebView
        source={{ uri: MC_URL }}
        style={styles.webview}
        onLoadEnd={onLoadEnd}
        onError={onError}
        onHttpError={onError}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
        pullToRefreshEnabled={true}
        allowsBackForwardNavigationGestures={true}
        incognito={false}
        cacheEnabled={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  webview: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    zIndex: 999,
  },
  loadingTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#e2e8f0',
    marginBottom: 8,
  },
  loadingText: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 24,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    padding: 32,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#f87171',
    marginBottom: 12,
  },
  errorText: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
    maxWidth: 320,
  },
  retryButton: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    backgroundColor: '#3b82f6',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
});