import { createSignal } from "solid-js";

export const imageStore = createSignal<File | null>(null);
export const imageSizeValid = createSignal(false);
