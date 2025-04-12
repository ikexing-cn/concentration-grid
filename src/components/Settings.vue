<script lang="ts" setup>
import {
  Moon,
  Sun,
  Settings,
  Reset,
  Automatic,
  LogoGithub,
} from "@vicons/carbon";

import { grid, startKey } from "../constant";

defineEmits<{
  (e: "toggleTheme"): void;
}>();

const settingShow = ref(false);
function onSettingShow() {
  settingShow.value = !settingShow.value;
}

function resetGrid() {
  grid.value.rows = 5;
  grid.value.columns = 5;
}

function randomGenerateGrid() {
  grid.value.rows = Math.floor(Math.random() * 10) + 1;
  grid.value.columns = Math.floor(Math.random() * 10) + 1;
}

const isDark = inject<boolean>("is-dark");
const { isStart, toggleStart } = inject(startKey)!;
</script>

<template>
  <div class="icons">
    <NButton
      circle
      icon
      tag="a"
      href="https://www.github.com/ikexing-cn/concentration-grid"
      target="_blank"
    >
      <template #icon>
        <LogoGithub />
      </template>
    </NButton>

    <NButton
      circle
      icon
      @click="
        () => {
          onSettingShow();
          isStart && toggleStart();
        }
      "
    >
      <template #icon>
        <Settings />
      </template>
    </NButton>

    <NButton circle @click="$emit('toggleTheme')" icon>
      <template #icon>
        <Sun v-show="isDark" />
        <Moon v-show="!isDark" />
      </template>
    </NButton>

    <NModal v-model:show="settingShow" preset="dialog" :show-icon="false">
      <span style="font-size: 16px; font-weight: 800">Grid</span>

      <NInputGroup style="margin-top: 5px">
        <NButton dashed type="success">Rows</NButton>
        <NInputNumber
          :default-value="5"
          :max="10"
          :min="1"
          v-model:value="grid.rows"
        />

        <NButton dashed type="success">Columns</NButton>
        <NInputNumber
          :default-value="5"
          :max="10"
          :min="1"
          v-model:value="grid.columns"
        />
      </NInputGroup>

      <NSpace justify="end" style="margin-top: 5px">
        <NButton icon secondary circle @click="resetGrid" title="Reset">
          <template #icon>
            <Reset />
          </template>
        </NButton>

        <NButton
          icon
          secondary
          circle
          @click="randomGenerateGrid"
          title="Random"
        >
          <template #icon>
            <Automatic />
          </template>
        </NButton>
      </NSpace>
    </NModal>
  </div>
</template>

<style scoped>
.icons {
  position: fixed;
  right: 5%;
  top: 5%;
  transform: translateY(-50%);
  gap: 25%;
  display: flex;
}
</style>
