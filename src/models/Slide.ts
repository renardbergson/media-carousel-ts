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

    this.show(this.index);
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
