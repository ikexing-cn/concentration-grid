import type { InjectionKey } from "vue";

export const grid = useLocalStorage("grid", { rows: 5, columns: 5 });

export const startKey = Symbol() as InjectionKey<{
  isStart: Ref<boolean>
  toggleStart: (value?: boolean) => boolean
}>

