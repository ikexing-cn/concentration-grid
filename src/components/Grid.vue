<script lang="ts" setup>
import type { NGridItem } from "naive-ui";
import { grid, startKey } from "../constant";

const isDark = useDark();
const selectedColor = computed(() => (isDark.value ? "#63E2B7" : "#18A058"));

const min = ref(0);
const max = computed(() => grid.value.columns * grid.value.rows);
const assignment = ref<number[]>([]);
const isFinish = computed(() => max.value === min.value);

const { counter: timer, pause } = useInterval(1000, { controls: true });

function generateUniqueRandomNumbers(count: number, max: number) {
  const numbers = new Set<number>();
  while (numbers.size < count) {
    const r = Math.floor(Math.random() * max) + 1;
    numbers.add(r);
  }
  console.log(numbers, max);
  return Array.from(numbers);
}

function select(value: number) {
  if (min.value + 1 === value) min.value = value;
}

watch(min, () => {
  isFinish.value && pause();
});

onBeforeMount(() => {
  assignment.value = generateUniqueRandomNumbers(max.value, max.value);
});

onUnmounted(() => {
  assignment.value = [];
});

const { toggleStart } = inject(startKey)!;
</script>

<template>
  <div class="container">
    <NButton size="large" type="info" @click="toggleStart()" v-show="isFinish">
      ReStart
    </NButton>

    <NGrid responsive="screen" :cols="grid.rows">
      <NGridItem
        class="grid-item"
        :class="{ selected: min >= value }"
        v-for="(value, index) in assignment"
        :key="index"
        @click="select(value)"
      >
        {{ value }}
      </NGridItem>
    </NGrid>

    <NGradientText
      :type="isFinish ? 'success' : 'info'"
      style="font-size: 16px"
    >
      Time: {{ timer }}s
    </NGradientText>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 20px;
}

.grid-item {
  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #ccc;
  margin-right: -1px;
  margin-bottom: -1px;

  height: 75px;
  width: 75px;

  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

@media (max-width: 768px) {
  .grid-item {
    height: 50px;
    width: 50px;
    font-size: 18px;
  }
}

.grid-item.selected {
  color: white;
  background-color: v-bind(selectedColor);
}
</style>
