import { type Component, JSX, Show } from "solid-js";
import { imageSizeValid, imageStore } from "../store/image";
import { inputLabel } from "./constants";

import "./styles.scss";

export const ImageInput: Component = () => {
  const [getImage, setImage] = imageStore;
  const [getIsImageSizeValid] = imageSizeValid;

  const handleChange: JSX.EventHandler<HTMLInputElement, Event> = (e) => {
    const file = e.currentTarget.files?.[0];
    if (file) setImage(file);
  };

  return (
    <Show when={!getImage() || !getIsImageSizeValid()}>
      <label class="label">
        <div class="button">
          {inputLabel}
        </div>
        <input
          hidden
          onChange={handleChange}
          type="file"
          accept="image/png, image/jpeg"
        />
      </label>
    </Show>
  );
};
