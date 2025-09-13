import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigationState } from "@react-navigation/core";

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const activeTabIndex = useNavigationState((state) => state.index);

  return (
    <View className={"fixed bottom-0 left-0 w-screen pb-8 px-4"}>
      <View
        className={
          "bg-neutral-200 flex h-20 flex-row items-center justify-around rounded-full"
        }
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          // 현재 선택된 탭인지 확인
          const isFocused = state.index === index;

          // 탭을 눌렀을 때의 동작
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

          // 일반 탭 버튼
          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              className={`${isFocused || activeTabIndex === index ? "bg-neutral-950" : "bg-white"} h-16 w-32 p-2 flex items-center justify-center rounded-full`}
            >
              <Text
                className={`text-xl ${isFocused || activeTabIndex === index ? "text-white" : "text-neutral-950"}}`}
              >
                {options.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
