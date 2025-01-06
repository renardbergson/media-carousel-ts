import TimeOut from "./TimeOut";

class Slide {
  container;
  slides;
  controls;
  time;
  index: number;
  active: Element;
  timeout: TimeOut | null;
  isPaused: boolean;
  pausedTimeout: TimeOut | null;

  constructor(
    container: Element,
    slides: Element[],
    controls: Element,
    time: number = 5000
  ) {
    this.container = container;
    this.slides = slides;
    this.controls = controls;
    this.time = time;
    this.timeout = null;
    this.isPaused = false;
    this.pausedTimeout = null;

    this.index = 0;
    this.active = this.slides[this.index];

    this.init();
  }

  private init() {
    this.show(this.index);
    this.addControls();
  }

  autoPlay(time: number) {
    this.timeout?.clear();
    this.timeout = new TimeOut(() => this.next(), time);
  }

  prev() {
    if (this.isPaused) return;
    const previous = this.index > 0 ? this.index - 1 : this.slides.length - 1;
    this.show(previous);
  }

  next() {
    if (this.isPaused) return;
    const next = this.index + 1 < this.slides.length ? this.index + 1 : 0;
    this.show(next);
  }

  pause() {
    this.pausedTimeout = new TimeOut(() => {
      this.isPaused = true;
      console.log("pausou");
      this.timeout?.pause();
    }, 300);
  }

  continue() {
    this.pausedTimeout?.clear();
    if (this.isPaused) {
      this.isPaused = false;
      this.timeout?.continue();
      console.log("continuou");
    }
  }

  private addControls() {
    const prevButton = document.createElement("button");
    const nextButton = document.createElement("button");
    prevButton.innerText = "previous slide";
    nextButton.innerText = "next slide";
    this.controls.appendChild(prevButton);
    this.controls.appendChild(nextButton);

    this.controls.addEventListener("pointerdown", () => this.pause());
    this.controls.addEventListener("pointerup", () => this.continue());

    prevButton.addEventListener("pointerup", () => this.prev());
    nextButton.addEventListener("pointerup", () => this.next());
  }

  show(index: number) {
    this.index = index;
    this.active = this.slides[this.index];
    this.slides.forEach((slide) => this.hide(slide));
    this.active.classList.add("active");
    this.autoPlay(this.time);
  }

  hide(slide: Element) {
    slide.classList.remove("active");
  }
}

export default Slide;
