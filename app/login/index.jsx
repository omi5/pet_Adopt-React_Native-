import { View, Image, Text, Pressable } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";

import * as WebBrowser from "expo-web-browser";
import { Link } from "expo-router";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/(tabs)/home", { scheme: "myapp" }),
        });

      if (createdSessionId) {
        // setActive!({ session: createdSessionId })
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View style={{ backgroundColor: Colors.WHITE, height: "100%" }}>
      <Image
        source={require("../../assets/images/login.png")}
        style={{ width: "100%", height: "500" }}
      />
      <View style={{ alignItems: "center", padding: 20 }}>
        <Text
          style={{
            fontSize: 28,
            fontFamily: "outfitBold",
            textAlign: "center",
          }}
        >
          Ready to make a new friend?
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "outfit",
            fontSize: 18,
            color: Colors.GRAY,
          }}
        >
          Let's adopt the pet which you like and make there life happy again.
        </Text>
        <Pressable
          style={{
            backgroundColor: Colors.PRIMARY,
            color: "white",
            padding: 14,
            borderRadius: 14,
            marginTop: 70,
            width: "100%",
            textAlign: "center",
          }}
          onPress={onPress}
        >
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              fontFamily: "outfitMedium",
            }}
          >
            Get Started
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
