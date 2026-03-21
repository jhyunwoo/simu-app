import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { useNavigationState } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const activeTabIndex = useNavigationState((state) => state.index);

  return (
    <View
      style={{
        position: "absolute",
        bottom: Platform.OS === "ios" ? 20 : 10,
        left: 20,
        right: 20,
        borderRadius: 40,
        backgroundColor: "#fff",
        flexDirection: "row",
        height: 70,
        alignItems: "center",
        justifyContent: "space-around",
        elevation: 8, // 안드로이드 그림자
        shadowColor: "#000", // iOS 그림자
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        // 아이콘 매핑
        const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
          Home: "home-outline",
          Profile: "person-outline",
          Settings: "settings-outline",
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: isFocused ? "#000" : "transparent",
                borderRadius: 30,
                width: 60,
                height: 60,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name={icons[route.name] ?? "ellipse-outline"}
                size={26}
                color={"#FFFFFF"} // 완전한 흰색
              />
              <Text
                style={{
                  color: isFocused ? "#fff" : "#000",
                  fontSize: 12,
                  marginTop: 2,
                  fontWeight: isFocused ? "bold" : "normal",
                }}
              >
                {options.title ?? route.name}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
