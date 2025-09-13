import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tab() {
  return (
    <SafeAreaView>
      <View className={"w-full p-4"}>
        <Text className={"text-3xl"}>추천 페이지</Text>
      </View>
    </SafeAreaView>
  );
}
