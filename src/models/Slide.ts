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
  thumbItems: HTMLElement[] | null;
  thumb: HTMLElement | null;

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
    this.index = Number(sessionStorage.getItem("activeSlide")) | 0;
    this.active = this.slides[this.index];
    this.thumbItems = null;
    this.thumb = null;

    this.init();
  }

  private init() {
    this.addControls();
    this.addThumbItems();
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.prev();
      if (e.key === "ArrowRight") this.next();
    });
    this.show(this.index);
  }

  private addThumbItems() {
    const thumbContainer = document.createElement("div");
    thumbContainer.id = "thumb-container";
    for (let index = 0; index < this.slides.length; index++) {
      thumbContainer.innerHTML += `<span><span class="thumb-item"></span></span>`;
    }
    this.controls.appendChild(thumbContainer);
    this.thumbItems = Array.from(document.querySelectorAll(".thumb-item"));
  }

  autoPlay(time: number) {
    this.timeout?.clear();
    this.timeout = new TimeOut(() => this.next(), time);
    if (this.thumb) this.thumb.style.animationDuration = `${time}ms`;
  }

  playVideo(video: HTMLVideoElement) {
    video.muted = true;
    video.play();
    let firstPlay = true;
    video.addEventListener("playing", () => {
      if (firstPlay) {
        this.autoPlay(video.duration * 1000);
        firstPlay = false;
      }
    });
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
    document.body.classList.add("paused");
    this.pausedTimeout = new TimeOut(() => {
      this.timeout?.pause();
      this.isPaused = true;
      this.thumb?.classList.add("paused");
      if (this.active instanceof HTMLVideoElement) this.active.pause();
    }, 200);
  }

  continue() {
    document.body.classList.remove("paused");
    this.pausedTimeout?.clear();
    if (this.isPaused) {
      this.timeout?.continue();
      this.isPaused = false;
      this.thumb?.classList.remove("paused");
      if (this.active instanceof HTMLVideoElement) this.active.play();
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
    document.addEventListener("pointerup", () => this.continue());
    document.addEventListener("touchend", () => this.continue());

    prevButton.addEventListener("pointerup", () => this.prev());
    nextButton.addEventListener("pointerup", () => this.next());
  }

  show(index: number) {
    this.index = index;
    this.active = this.slides[this.index];
    this.slides.forEach((slide) => this.hide(slide));
    this.active.classList.add("active");

    sessionStorage.setItem("activeSlide", String(this.index));

    if (this.thumbItems) {
      this.thumbItems.forEach((thumb) => this.hide(thumb));
      this.thumb = this.thumbItems[this.index];
      this.thumb.classList.add("active");
    }

    if (this.active instanceof HTMLVideoElement) {
      this.playVideo(this.active);
    } else {
      this.autoPlay(this.time);
    }
  }

  hide(slide: Element) {
    slide.classList.remove("active");
    if (slide instanceof HTMLVideoElement) {
      slide.currentTime = 0;
      slide.pause();
    }
  }
}

export default Slide;
