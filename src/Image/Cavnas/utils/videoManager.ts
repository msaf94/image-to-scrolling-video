import { isNonNullable } from "../../../utils/isNonNullable";

export class VideoManager {
  private recorder: MediaRecorder;
  private fps = 60;
  private chunks: Blob[] = [];
  public url: string | null = null;
  public state: "started" | "ended" | null = null;

  constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    this.recorder = new MediaRecorder(canvas.captureStream(this.fps), {bitsPerSecond: 8_000_000});

    this.recorder.ondataavailable = (e) => {
      this.chunks.push(e.data);
    };

    this.recorder.onstop = () => {
      this.url = URL.createObjectURL(
        new Blob(this.chunks, { type: "video/mp4" })
      );

      this.download();
      this.chunks = [];
    };
  }

  private download() {
    if (isNonNullable(this.url)) {
      const link = document.createElement("a");
      link.href = this.url;
      link.target = "_blank";
      link.download = "result.mp4";
      link.click();
    }
  }

  public record() {
    this.state = "started";
    this.recorder.start();
  }

  public stop() {
    this.state = "ended";
    this.recorder.stop();
  }
}
