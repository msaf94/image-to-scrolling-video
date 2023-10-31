import { minHeight } from "../../../constants";
import { isNonNullable } from "../../../utils/isNonNullable";
import { VideoManager } from "./videoManager";

export class ImageManager {
  private image = new Image();
  private canvas: HTMLCanvasElement | null = null;
  private width: number | null = null;
  private height: number | null = null;
  private y = 0;
  private animationRequest = 0;
  private videoManager: VideoManager;

  constructor({ image, canvas }: { image: File; canvas: HTMLCanvasElement }) {
    this.image.src = URL.createObjectURL(image);
    this.canvas = canvas;

    this.image.onload = () => {
      this.width = this.image.naturalWidth;
      this.height = this.image.naturalHeight;

      if (this.canvas) {
        this.canvas.width = this.width;
        this.canvas.height = minHeight;
        this.draw(0);
      }
    };
    this.videoManager = new VideoManager({ canvas: this.canvas });
  }

  private getContext() {
    return this.canvas?.getContext("2d");
  }

  public draw(yPosition: number) {
    const context = this.getContext();
    if (
      isNonNullable(context) &&
      isNonNullable(this.width) &&
      isNonNullable(this.height)
    ) {
      context.drawImage(this.image, 0, yPosition, this.width, this.height);
    }
  }

  private incrementYPosition() {
    this.y += 1;
  }

  private reachedTheEnd() {
    return isNonNullable(this.height) && this.y + minHeight >= this.height;
  }

  public animate() {
    if (this.reachedTheEnd()) {
      this.videoManager.stop();
      cancelAnimationFrame(this.animationRequest);
      this.y = 0;
    } else {
      const context = this.getContext();
      if (!isNonNullable(this.videoManager.state)) {
        this.videoManager.record();
      }

      if (
        isNonNullable(context) &&
        isNonNullable(this.width) &&
        isNonNullable(this.height)
      ) {
        context.clearRect(0, 0, this.width, this.height);
        this.incrementYPosition();
        this.draw(-this.y);
        this.animationRequest = requestAnimationFrame(this.animate.bind(this));
      }
    }
  }
}
