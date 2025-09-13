import { Tabs } from "expo-router";
import TabBar from "@/components/tab-bar";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="(recommend)"
        // options prop을 추가하고 title을 설정합니다.
        options={{
          title: "추천",
        }}
      />
      <Tabs.Screen
        name="(events)"
        options={{
          title: "이벤트",
        }}
      />
      <Tabs.Screen
        name="(analytics)"
        options={{
          title: "분석",
        }}
      />
    </Tabs>
  );
}
