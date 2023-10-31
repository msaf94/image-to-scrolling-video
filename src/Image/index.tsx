import { type Component, Show, createSignal, createEffect } from "solid-js";
import { imageSizeValid, imageStore } from "../store/image";
import { lowHeightLabel, minHeight } from "../constants";
import "./styles.scss";
import { Canvas } from "./Cavnas";

export const Image: Component = () => {
  const [getImage] = imageStore;
  const [getSrc, setSrc] = createSignal<string | null>(null);
  const [getIsImageHeightValid, setIsImageHeightValid] = imageSizeValid;

  createEffect(() => {
    const image = getImage();

    if (image) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          const imgNode = document.createElement("img");
          const imgSrc = e.target.result;
          imgNode.src = imgSrc;

          imgNode.onload = () => {
            setSrc(imgSrc);
            setIsImageHeightValid(imgNode.naturalHeight >= minHeight);
          };
        }
      };
      reader.readAsDataURL(image);
    }
  });

  return (
    <Show when={getSrc()}>
      <div class="image-wrapper">
        <Show when={!getIsImageHeightValid()}>
          <span class="image-low-height">{lowHeightLabel}</span>
        </Show>
        <Show when={getIsImageHeightValid()}>
          <Canvas />
        </Show>
      </div>
    </Show>
  );
};
