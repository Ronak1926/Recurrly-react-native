import PostHog from "posthog-react-native";

const env = (
  global as unknown as {
    process?: { env?: Record<string, string | undefined> };
  }
).process?.env;

const apiKey = env?.EXPO_PUBLIC_POSTHOG_API_KEY?.trim();
const host = env?.EXPO_PUBLIC_POSTHOG_HOST?.trim();
const isPostHogConfigured =
  !!apiKey && apiKey !== "" && apiKey !== "phc_your_project_token_here";

if (!isPostHogConfigured) {
  console.warn(
    "PostHog project token not configured. Analytics will be disabled. " +
      "Set EXPO_PUBLIC_POSTHOG_API_KEY in your .env file to enable analytics.",
  );
}

export const posthog = new PostHog(apiKey || "placeholder_key", {
  ...(host ? { host } : {}),
  disabled: !isPostHogConfigured,
  captureAppLifecycleEvents: true,
  flushAt: 20,
  flushInterval: 10000,
  maxBatchSize: 100,
  maxQueueSize: 1000,
  preloadFeatureFlags: true,
  sendFeatureFlagEvent: true,
  featureFlagsRequestTimeoutMs: 10000,
  requestTimeout: 10000,
  fetchRetryCount: 3,
  fetchRetryDelay: 3000,
});
