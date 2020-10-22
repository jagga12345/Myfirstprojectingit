"use strict";
console.log("sfsaf")

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var animateCarousels = function animateCarousels() {
  var carousels = document.querySelectorAll('.carousel');
  Array.from(carousels).map(function (carousel) {
    return new CarouselCustom(carousel);
  });
};

var CarouselCustom =
/*#__PURE__*/
function () {
  function CarouselCustom(carousel) {
    _classCallCheck(this, CarouselCustom);

    _defineProperty(this, "carouselItems", void 0);

    _defineProperty(this, "slideNavItems", void 0);

    _defineProperty(this, "slideNavItemsMobile", void 0);

    _defineProperty(this, "nextButton", void 0);

    _defineProperty(this, "liveRegion", void 0);

    _defineProperty(this, "controls", void 0);

    _defineProperty(this, "carousel", void 0);

    _defineProperty(this, "previousButton", void 0);

    _defineProperty(this, "pausePlayButton", void 0);

    _defineProperty(this, "carouselItemIndex", 0);

    _defineProperty(this, "autoPlay", true);

    _defineProperty(this, "paused", false);

    _defineProperty(this, "intervalDuration", 7000);

    _defineProperty(this, "autoPlayTimeout", void 0);

    this.carousel = carousel;
    console.log( this.carousel = carousel);
    this.pausePlayButton = carousel.querySelector('.carousel__button-pause');
    this.carouselItems = Array.from(carousel.querySelectorAll('.carousel__item'));
    this.controls = carousel.querySelector('.carousel__controls');
    this.liveRegion = carousel.querySelector('.liveregion');
    this.slideNavItemsMobile = Array.from(carousel.querySelectorAll('.slide-nav-mobile .carousel__slide-nav__circle'));
    this.slideNavItems = Array.from(this.controls.querySelectorAll('.carousel__slide-nav__circle'));
    this.nextButton = document.getElementById('carousel_forward');
    this.previousButton = carousel.querySelector('.carousel__button-arrow-back');
    carousel.addEventListener('mouseenter', this.pauseAutoPlay.bind(this), {
      passive: true
    });
    carousel.addEventListener('focusin', this.pauseAutoPlay.bind(this), {
      passive: true
    });
    carousel.addEventListener('focusout', this.unpauseAutoplay.bind(this), {
      passive: true
    });
    carousel.addEventListener('mouseleave', this.unpauseAutoplay.bind(this), {
      passive: true
    });
    this.nextButton.addEventListener('click', this.nextItem.bind(this), {
        alert("scac")
        passive: true
    }); 
    this.previousButton.addEventListener('click', this.previousItem.bind(this), {
      passive: true
    });
    this.pausePlayButton.addEventListener('click', this.handlePausePlayButton.bind(this), {
      passive: true
    });
    this.setActive(0);
    this.setCarouselHightonResize();
    setTimeout(this.handleAutoPlay.bind(this), this.intervalDuration);
  }

  _createClass(CarouselCustom, [{
    key: "setCarouselHightonResize",
    value: function setCarouselHightonResize() {
      var _this = this;

      window.addEventListener('resize', function () {
        return _this.setCarouselHight(_this.carouselItemIndex);
      }, {
        passive: true
      });
    }
  }, {
    key: "setCarouselHight",
    value: function setCarouselHight(index) {
      var newActiveItem = this.carouselItems[index];
      var newActiveItemImage = newActiveItem.querySelector('.carousel__item__image-container');
      var newActiveItemImageHeight = newActiveItemImage.getBoundingClientRect().height;
      var calculatedCarouselHeight = newActiveItem.getBoundingClientRect().height;

      if (window.innerWidth < 1024) {
        this.carousel.style.height = "".concat(calculatedCarouselHeight, "px");
        this.controls.style.top = "".concat(newActiveItemImageHeight, "px");
      } else {
        this.carousel.style.removeProperty('height');
        this.controls.style.top = 'auto';
      }
    }
  }, {
    key: "setActive",
    value: function setActive(index) {
      var newActiveItem = this.carouselItems[index];
      var newActiveSlideNavItem = this.slideNavItems[index];
      var newActiveSlideNavItemMobile = this.slideNavItemsMobile[index];
      this.setCarouselHight(index);
      newActiveItem.setAttribute('aria-hidden', 'false');
      newActiveItem.classList.add('carousel__item--active');
      newActiveSlideNavItem.classList.add('carousel__slide-nav__circle--active');
      newActiveSlideNavItemMobile.classList.add('carousel__slide-nav__circle--active');

      if (this.liveRegion) {
        this.liveRegion.textContent = "Slide ".concat(index + 1, " of ").concat(this.carouselItems.length);
      }
    }
  }, {
    key: "setInactive",
    value: function setInactive(index) {
      var newInactiveItem = this.carouselItems[index];
      var newInactiveSlideNavItem = this.slideNavItems[index];
      var newInactiveSlideNavItemMobile = this.slideNavItemsMobile[index];
      newInactiveItem.setAttribute('aria-hidden', 'true');
      newInactiveItem.classList.remove('carousel__item--active');
      newInactiveSlideNavItem.classList.remove('carousel__slide-nav__circle--active');
      newInactiveSlideNavItemMobile.classList.remove('carousel__slide-nav__circle--active');
    }
  }, {
    key: "handleAutoPlay",
    value: function handleAutoPlay() {
      if (this.autoPlay && !this.paused) {
        this.nextItem();
      }
    }
  }, {
    key: "unpauseAutoplay",
    value: function unpauseAutoplay() {
      this.paused = false;
      this.startAutoplayTimeout();
    }
  }, {
    key: "pauseAutoPlay",
    value: function pauseAutoPlay() {
      this.paused = true;
    }
  }, {
    key: "startAutoplayTimeout",
    value: function startAutoplayTimeout() {
      this.cancelAutoplayTimeout();
      this.autoPlayTimeout = window.setTimeout(this.handleAutoPlay.bind(this), this.intervalDuration);
    }
  }, {
    key: "cancelAutoplayTimeout",
    value: function cancelAutoplayTimeout() {
      this.autoPlayTimeout && clearTimeout(this.autoPlayTimeout);
    }
  }, {
    key: "handlePausePlayButton",
    value: function handlePausePlayButton() {
      var pauseIcon = this.pausePlayButton.firstElementChild;
      var playIcon = this.pausePlayButton.lastElementChild;

      if (!playIcon || !pauseIcon) {
        return;
      }

      if (!this.autoPlay) {
        this.autoPlay = true;
        this.unpauseAutoplay();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        pauseIcon.setAttribute('aria-hidden', 'false');
        playIcon.setAttribute('aria-hidden', 'true');
      } else {
        this.autoPlay = false;
        this.cancelAutoplayTimeout();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        pauseIcon.setAttribute('aria-hidden', 'true');
        playIcon.setAttribute('aria-hidden', 'false');
      }
    }
  }, {
    key: "nextItem",
    value: function nextItem() {
        console.log("clicked");
      this.setInactive(this.carouselItemIndex);
      this.startAutoplayTimeout();
      this.carouselItemIndex++;

      if (this.carouselItemIndex > this.carouselItems.length - 1) {
        this.carouselItemIndex = 0;
      }

      this.setActive(this.carouselItemIndex);
    }
  }, {
    key: "previousItem",
    value: function previousItem() {
      this.startAutoplayTimeout();
      this.setInactive(this.carouselItemIndex);
      this.carouselItemIndex--;

      if (this.carouselItemIndex < 0) {
        this.carouselItemIndex = this.carouselItems.length - 1;
      }

      this.setActive(this.carouselItemIndex);
    }
  }]);

  return CarouselCustom;
}();

var _default = function _default() {
  animateCarousels();
};


