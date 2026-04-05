import { icons } from "@/constants/icons";
import { formatCurrency } from "@/lib/utils";
import { router } from "expo-router";
import { styled } from "nativewind";
import { useMemo } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

type WeeklyBarDatum = {
  key: string;
  label: string;
  value: number;
  active?: boolean;
  badge?: string;
};

const WeeklyBars = ({ data }: { data: WeeklyBarDatum[] }) => {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <View className="mt-4 rounded-2xl bg-muted p-4">
      <View className="h-44 justify-end">
        <View className="absolute left-3 right-3 top-3 bottom-9 justify-between">
          {[45, 35, 25].map((v) => (
            <View
              key={v}
              className="h-px w-full bg-black/10"
              style={{ opacity: 0.7 }}
            />
          ))}
        </View>

        <View className="flex-row items-end justify-between px-2 pb-2">
          {data.map((d) => {
            const barHeight = Math.max(10, Math.round((d.value / max) * 120));
            const barColor = d.active ? "bg-accent" : "bg-primary";
            return (
              <View key={d.key} className="items-center" style={{ width: 34 }}>
                {d.badge ? (
                  <View className="mb-2 rounded-full bg-background px-2 py-1">
                    <Text className="text-xs font-sans-bold text-accent">
                      {d.badge}
                    </Text>
                  </View>
                ) : (
                  <View className="mb-2 h-6" />
                )}
                <View
                  className={"w-3 rounded-full " + barColor}
                  style={{ height: barHeight }}
                />
              </View>
            );
          })}
        </View>

        <View className="flex-row items-center justify-between px-2">
          {data.map((d) => (
            <Text
              key={d.key + "-label"}
              className="text-xs font-sans-semibold text-muted-foreground"
              style={{ width: 34, textAlign: "center" }}
            >
              {d.label}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

const Insights = () => {
  const weekly = useMemo<WeeklyBarDatum[]>(
    () => [
      { key: "mon", label: "Mon", value: 36 },
      { key: "tue", label: "Tue", value: 32 },
      { key: "wed", label: "Wed", value: 24 },
      { key: "thu", label: "Thr", value: 40, active: true, badge: "$40" },
      { key: "fri", label: "Fri", value: 34 },
      { key: "sat", label: "Sat", value: 22 },
      { key: "sun", label: "Sun", value: 25 },
    ],
    []
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-2 flex-row items-center justify-between">
          <Pressable
            onPress={() => router.back()}
            className="h-12 w-12 items-center justify-center rounded-full border border-black/20"
          >
            <Image source={icons.back} className="h-5 w-5" />
          </Pressable>

          <Text className="text-xl font-sans-bold text-primary">
            Monthly Insights
          </Text>

          <Pressable className="h-12 w-12 items-center justify-center rounded-full border border-black/20">
            <Image source={icons.menu} className="h-5 w-5" />
          </Pressable>
        </View>

        <View className="mt-6">
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-sans-bold text-primary">
              Upcoming
            </Text>
            <Pressable className="rounded-full border border-black/20 px-4 py-1">
              <Text className="text-lg font-sans-semibold text-primary">
                View all
              </Text>
            </Pressable>
          </View>
          <WeeklyBars data={weekly} />
        </View>

        <View className="mt-5 rounded-2xl border border-border bg-card p-4">
          <View className="flex-row items-start justify-between">
            <View>
              <Text className="text-xl font-sans-bold text-primary">
                Expenses
              </Text>
              <Text className="mt-1 text-sm font-sans-semibold text-muted-foreground">
                March 2026
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-xl font-sans-bold text-primary">
                -{formatCurrency(424.63, "USD")}
              </Text>
              <Text className="mt-1 text-sm font-sans-semibold text-muted-foreground">
                +12%
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-6">
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-sans-bold text-primary">
              History
            </Text>
            <Pressable className="rounded-full border border-black/20 px-4 py-1">
              <Text className="text-lg font-sans-semibold text-primary">
                View all
              </Text>
            </Pressable>
          </View>

          <View className="mt-4 gap-4">
            <View
              className="rounded-2xl border border-border p-4"
              style={{ backgroundColor: "#f5d25b" }}
            >
              <View className="flex-row items-center justify-between">
                <View className="min-w-0 flex-1 flex-row items-center gap-3">
                  <Image source={icons.claude} className="h-12 w-12" />
                  <View className="min-w-0 flex-1">
                    <Text
                      className="text-lg font-sans-bold text-primary"
                      numberOfLines={1}
                    >
                      Claude
                    </Text>
                    <Text
                      className="mt-1 text-sm font-sans-semibold text-primary/60"
                      numberOfLines={1}
                    >
                      June 25, 12:00
                    </Text>
                  </View>
                </View>

                <View className="items-end">
                  <Text className="text-lg font-sans-bold text-primary">
                    {formatCurrency(9.84, "USD")}
                  </Text>
                  <Text className="mt-1 text-sm font-sans-semibold text-primary/60">
                    per month
                  </Text>
                </View>
              </View>
            </View>

            <View
              className="rounded-2xl border border-border p-4"
              style={{ backgroundColor: "#8fd1bd" }}
            >
              <View className="flex-row items-center justify-between">
                <View className="min-w-0 flex-1 flex-row items-center gap-3">
                  <Image
                    source={icons.canva}
                    className="h-12 w-12 rounded-full"
                  />
                  <View className="min-w-0 flex-1">
                    <Text
                      className="text-lg font-sans-bold text-primary"
                      numberOfLines={1}
                    >
                      Canva
                    </Text>
                    <Text
                      className="mt-1 text-sm font-sans-semibold text-primary/60"
                      numberOfLines={1}
                    >
                      June 30, 16:00
                    </Text>
                  </View>
                </View>

                <View className="items-end">
                  <Text className="text-lg font-sans-bold text-primary">
                    {formatCurrency(43.89, "USD")}
                  </Text>
                  <Text className="mt-1 text-sm font-sans-semibold text-primary/60">
                    per month
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Insights;