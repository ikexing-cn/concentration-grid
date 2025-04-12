<script setup lang="ts">
import { darkTheme, NGlobalStyle } from "naive-ui";

import { startKey } from "./constant";

import Settings from "./components/Settings.vue";
import type { BuiltInGlobalTheme } from "naive-ui/es/themes/interface";

const isDark = useDark();
const isStart = ref(false);
const toggleDark = useToggle(isDark);
const toggleStart = useToggle(isStart);

const theme = ref<BuiltInGlobalTheme | null>(null);

function toggleTheme() {
  if (theme.value === null) theme.value = darkTheme;
  else theme.value = null;
  toggleDark();
}

provide(
  "is-dark",
  computed(() => theme.value === null)
);
provide(startKey, { isStart, toggleStart });

onBeforeMount(() => {
  if (isDark.value) theme.value = darkTheme;
  else theme.value = null;
});
</script>

<template>
  <NConfigProvider :theme="theme">
    <NGlobalStyle />
    <Settings @toggle-theme="toggleTheme" />

    <div v-show="!isStart" style="" class="main">
      <NGradientText> Concentration Grid </NGradientText>
      <NButton size="large" type="primary" @click="toggleStart()">
        Start
      </NButton>
    </div>

    <Grid v-if="isStart" />
  </NConfigProvider>
</template>

<style>
body,
#app {
  margin: 0;
  padding: 0;
  height: 100vh;
}

.n-config-provider {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
  font-size: 24px;
  font-weight: bold;
}

.main {
  gap: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
