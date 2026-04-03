
// Swiper BG [START]
const swiperBgBlock = document.querySelector(".swiper_block.is-hero-bg");
const swiperBg = new Swiper(swiperBgBlock.querySelector(".swiper"), {
  effect: "fade",
  fadeEffect: { crossFade: true },
  speed: 800,
  allowTouchMove: false,
  slideActiveClass: "is-active",
});
const bgSlidesCount = swiperBg.slides.length;
// Swiper BG [END]

// Swiper 1 [START]
const swiperBlock = document.querySelector(".swiper_block.is-hero");

// Сохраняем оригинальные слайды до инициализации
const originalSlides = Array.from(
  swiperBlock.querySelectorAll(".swiper-slide.is-hero")
).map(el => el.outerHTML);

function appendMoreSlides(swiper) {
  originalSlides.forEach(html => swiper.appendSlide(html));
  swiper.update();
}

function clearLastItems() {
  swiperBlock.querySelectorAll(".swiper-slide_hero-text:last-child").forEach(el => {
    el.style.opacity = "";
  });
}

function setActiveLastItem(swiper) {
  const activeSlide = swiper.slides[swiper.activeIndex];
  const lastItem = activeSlide.querySelector(".swiper-slide_hero-text:last-child");
  if (lastItem) {
    lastItem.style.opacity = "1";
    swiperBg.slideTo(swiper.activeIndex % bgSlidesCount);
  }

  // Если осталось меньше 3 слайдов впереди — добавляем ещё
  if (swiper.activeIndex >= swiper.slides.length - 3) {
    appendMoreSlides(swiper);
  }
}

const swiperHero = new Swiper(swiperBlock.querySelector(".swiper"), {
  direction: "vertical",
  slidesPerView: "auto",
  allowTouchMove: false,
  followFinger: false,
  freeMode: false,
  slideToClickedSlide: false,
  centeredSlides: true,
  speed: 1500,
  loop: false,
  slideActiveClass: "is-active",
  slideDuplicateActiveClass: "is-active",

  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },

  on: {
    afterInit(swiper) {
      swiper.autoplay.stop();
    },
    slideChangeTransitionStart() {
      clearLastItems();
    },
    slideChange(swiper) {
      setTimeout(() => setActiveLastItem(swiper), 1500);
    },
  },

});

setTimeout(() => setActiveLastItem(swiperHero), 4000);

document.querySelector('.swiper_block.is-hero-bg').addEventListener('animationend', () => {
  swiperHero.autoplay.start();
}, { once: true });

// Swiper 1 [END]
