import type { Component } from "solid-js";
import { createEffect, createSignal, Show, createMemo } from "solid-js";
import { imageStore } from "../../store/image";
import { playLabel } from "./constants";
import "./styles.scss";
import { ImageManager } from "./utils/imageManager";
import { isNonNullable } from "../../utils/isNonNullable";

export const Canvas: Component = () => {
  const [getFile] = imageStore;
  const [getCountdown, setCountdown] = createSignal<number | null>(null);
  const [getAnimationStarted, setAnimationStarted] = createSignal(false);
  let canvasRef: HTMLCanvasElement;
  let imageManager: ImageManager | null;

  createEffect(() => {
    const file = getFile();
    if (isNonNullable(file) && isNonNullable(canvasRef)) {
      imageManager = new ImageManager({ image: file, canvas: canvasRef });
    }
  });

  const handlePlay = () => {
    let interval = setInterval(() => {
      setAnimationStarted(true);
      setCountdown((prevState) => {
        if (prevState === 0) {
          clearInterval(interval);

          if (isNonNullable(imageManager)) {
            imageManager.animate();
          }
          return null;
        }
        if (!isNonNullable(prevState)) {
          return 3;
        }
        return prevState - 1;
      });
    }, 1000);
  };

  const getLabel = createMemo(() => {
    const countdown = getCountdown();

    if (isNonNullable(countdown)) {
      return `...${countdown}`;
    }
    return playLabel;
  });

  return (
    <>
      <Show when={!getAnimationStarted() || getCountdown()}>
        <div
          class={`button ${!!getCountdown() ? "disabled" : ""}`}
          onClick={handlePlay}
        >
          {getLabel()}
        </div>
      </Show>
      <canvas class="canvas" ref={canvasRef!} />
    </>
  );
};
