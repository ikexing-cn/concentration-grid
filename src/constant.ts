import type { InjectionKey } from "vue";

export const grid = useLocalStorage("grid", { rows: 5, columns: 5 });

export const isMobile = computed(() => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isIpad = userAgent.includes("ipad");
  const isMac = userAgent.includes("macintosh") && "ontouchend" in document;
  return screen.width <= 768 && !isIpad && !isMac;
});

export const startKey = Symbol() as InjectionKey<{
  isStart: Ref<boolean>
  toggleStart: (value?: boolean) => boolean
}>

