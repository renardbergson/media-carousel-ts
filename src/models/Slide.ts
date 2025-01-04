class Slide {
  container;
  slides;
  controls;
  time;
  index: number;
  active: Element;

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

    this.index = 0;
    this.active = this.slides[this.index];

    this.init();
  }

  private init() {
    this.show(this.index);
    this.addControls();
  }

  prev() {
    const previous = this.index > 0 ? this.index - 1 : this.slides.length - 1;
    this.show(previous);
  }

  next() {
    const next = this.index + 1 < this.slides.length ? this.index + 1 : 0;
    this.show(next);
  }

  private addControls() {
    const prevButton = document.createElement("button");
    const nextButton = document.createElement("button");
    prevButton.innerText = "previous slide";
    nextButton.innerText = "next slide";
    this.controls.appendChild(prevButton);
    this.controls.appendChild(nextButton);
    prevButton.addEventListener("pointerup", () => this.prev());
    nextButton.addEventListener("pointerup", () => this.next());
  }

  show(index: number) {
    this.index = index;
    this.active = this.slides[this.index];
    this.slides.forEach((slide) => this.hide(slide));
    this.active.classList.add("active");
  }

  hide(slide: Element) {
    slide.classList.remove("active");
  }
}

export default Slide;
