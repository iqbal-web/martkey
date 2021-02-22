"use strict";

(function ($) {
  "use strict";

  $('.slider-wrapper').owlCarousel({
    loop: true,
    margin: 0,
    items: 1,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    nav: false,
    dots: true,
    responsive: {
      0: {
        items: 1
      },
      767: {
        items: 1
      },
      992: {
        items: 1
      }
    }
  }); // sticky-header

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 10) {
      $(".navigation").addClass("sticky");
    } else {
      $(".navigation").removeClass("sticky");
    }
  });
  $('.product-wrapper').owlCarousel({
    loop: true,
    margin: 0,
    items: 1,
    navText: ['<i class="flaticon-left-arrow"></i>', '<i class="flaticon-right-arrow"></i>'],
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1
      },
      350: {
        items: 2
      },
      767: {
        items: 3
      },
      992: {
        items: 5
      },
      1200: {
        items: 6
      }
    }
  });
  $('.testimonial-wrapper').owlCarousel({
    loop: true,
    margin: 0,
    items: 1,
    navText: ['<i class="flaticon-left-arrow"></i>', '<i class="flaticon-right-arrow-angle"></i>'],
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: false,
    responsive: {
      0: {
        items: 1
      },
      767: {
        items: 1
      },
      992: {
        items: 1
      }
    }
  });
  $('.related-product-active').owlCarousel({
    loop: true,
    margin: 30,
    items: 1,
    nav: false,
    dots: true,
    responsive: {
      0: {
        items: 1
      },
      350: {
        items: 1
      },
      767: {
        items: 2
      },
      992: {
        items: 3
      },
      1200: {
        items: 4
      }
    }
  }); // Offer Event CountDown

  function makeTimer() {
    // var endTime = new Date("29 April 2018 9:56:00 GMT+01:00");
    var endTime = new Date("29 April 2021 9:56:00 GMT+01:00");
    endTime = Date.parse(endTime) / 1000;
    var now = new Date();
    now = Date.parse(now) / 1000;
    var timeLeft = endTime - now;
    var days = Math.floor(timeLeft / 86400);
    var hours = Math.floor((timeLeft - days * 86400) / 3600);
    var minutes = Math.floor((timeLeft - days * 86400 - hours * 3600) / 60);
    var seconds = Math.floor(timeLeft - days * 86400 - hours * 3600 - minutes * 60);

    if (hours < "10") {
      hours = "0" + hours;
    }

    if (minutes < "10") {
      minutes = "0" + minutes;
    }

    if (seconds < "10") {
      seconds = "0" + seconds;
    }

    $("#days").html(days + "<span>Days</span>");
    $("#hours").html(hours + "<span>Hours</span>");
    $("#minutes").html(minutes + "<span>Minutes</span>");
    $("#seconds").html(seconds + "<span>Seconds</span>");
  }

  setInterval(function () {
    makeTimer();
  }, 1000); // Quantity Value change

  var QtyInput = function () {
    var $qtyInputs = $(".qty-input");

    if (!$qtyInputs.length) {
      return;
    }

    var $inputs = $qtyInputs.find(".product-qty");
    var $countBtn = $qtyInputs.find(".qty-count");
    var qtyMin = parseInt($inputs.attr("min"));
    var qtyMax = parseInt($inputs.attr("max"));
    $inputs.change(function () {
      var $this = $(this);
      var $minusBtn = $this.siblings(".qty-count--minus");
      var $addBtn = $this.siblings(".qty-count--add");
      var qty = parseInt($this.val());

      if (isNaN(qty) || qty <= qtyMin) {
        $this.val(qtyMin);
        $minusBtn.attr("disabled", true);
      } else {
        $minusBtn.attr("disabled", false);

        if (qty >= qtyMax) {
          $this.val(qtyMax);
          $addBtn.attr('disabled', true);
        } else {
          $this.val(qty);
          $addBtn.attr('disabled', false);
        }
      }
    });
    $countBtn.click(function () {
      var operator = this.dataset.action;
      var $this = $(this);
      var $input = $this.siblings(".product-qty");
      var qty = parseInt($input.val());

      if (operator == "add") {
        qty += 1;

        if (qty >= qtyMin + 1) {
          $this.siblings(".qty-count--minus").attr("disabled", false);
        }

        if (qty >= qtyMax) {
          $this.attr("disabled", true);
        }
      } else {
        qty = qty <= qtyMin ? qtyMin : qty -= 1;

        if (qty == qtyMin) {
          $this.attr("disabled", true);
        }

        if (qty < qtyMax) {
          $this.siblings(".qty-count--add").attr("disabled", false);
        }
      }

      $input.val(qty);
    });
  }(); // Preloader


  jQuery(window).on('load', function () {
    //jQuery(".preloader").fadeOut(1000);
    $(".loader").delay(2600).fadeOut("slow");
  });
  /* magnificPopup img view */

  $('.popup-image').magnificPopup({
    type: 'image',
    gallery: {
      enabled: true
    }
  });
  /* magnificPopup video view */

  $('.popup-video').magnificPopup({
    type: 'iframe'
  }); // Go To Top

  $(window).on('scroll', function () {
    var scrolled = $(window).scrollTop();
    if (scrolled > 500) $('.top-bottom-scroll').addClass('fixed');
    if (scrolled < 500) $('.top-bottom-scroll').removeClass('fixed');
  });
  $(".top-bottom-scroll i").click(function () {
    $("html, body").animate({
      scrollTop: 0
    }, "slow");
    return false;
  }); // tabs-area

  var tabs = document.querySelectorAll('[data-tab-target]');
  var tabContents = document.querySelectorAll('[data-tab-content]');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = document.querySelector(tab.dataset.tabTarget);
      tabContents.forEach(function (tabContent) {
        tabContent.classList.remove('active');
      });
      tabs.forEach(function (tab) {
        tab.classList.remove('active');
      });
      tab.classList.add('active');
      target.classList.add('active');
    });
  }); // accordian

  var accordianItemHeaders = document.querySelectorAll(".accordian-item-header");
  accordianItemHeaders.forEach(function (accordianItemHeader) {
    accordianItemHeader.addEventListener("click", function () {
      var current = document.querySelector(".accordian-item-header.active");

      if (current && current !== accordianItemHeader) {
        current.classList.toggle("active");
        current.nextElementSibling.style.maxHeight = 0;
      }

      accordianItemHeader.classList.toggle("active");
      var accordianItemBody = accordianItemHeader.nextElementSibling;

      if (accordianItemHeader.classList.contains("active")) {
        accordianItemBody.style.maxHeight = accordianItemBody.scrollHeight + "px";
      } else {
        accordianItemBody.style.maxHeight = 0;
      }
    });
  }); // // wow active
  // new WOW().init();

  $(function () {
    $(".checkme").click(function (event) {
      var x = $(this).is(':checked');

      if (x == true) {
        $(this).parents(".checkbox-card").find('.passport-box').show();
        $(this).parents(".checkbox-card").find('.apply-box').hide();
      } else {
        $(this).parents(".checkbox-card").find('.passport-box').hide();
        $(this).parents(".checkbox-card").find('.apply-box').show();
      }
    });
  }); // imgae-select

  var activeImage = document.querySelector(".product-image .active");
  var productImages = document.querySelectorAll(".product-thumb img");

  function changeImage(e) {
    activeImage.src = e.target.src;
  }

  productImages.forEach(function (image) {
    return image.addEventListener("click", changeImage);
  }); // for quantity

  var QtyInput = function () {
    var $qtyInputs = $(".qty-input");

    if (!$qtyInputs.length) {
      return;
    }

    var $inputs = $qtyInputs.find(".product-qty");
    var $countBtn = $qtyInputs.find(".qty-count");
    var qtyMin = parseInt($inputs.attr("min"));
    var qtyMax = parseInt($inputs.attr("max"));
    $inputs.change(function () {
      var $this = $(this);
      var $minusBtn = $this.siblings(".qty-count--minus");
      var $addBtn = $this.siblings(".qty-count--add");
      var qty = parseInt($this.val());

      if (isNaN(qty) || qty <= qtyMin) {
        $this.val(qtyMin);
        $minusBtn.attr("disabled", true);
      } else {
        $minusBtn.attr("disabled", false);

        if (qty >= qtyMax) {
          $this.val(qtyMax);
          $addBtn.attr('disabled', true);
        } else {
          $this.val(qty);
          $addBtn.attr('disabled', false);
        }
      }
    });
    $countBtn.click(function () {
      var operator = this.dataset.action;
      var $this = $(this);
      var $input = $this.siblings(".product-qty");
      var qty = parseInt($input.val());

      if (operator == "add") {
        qty += 1;

        if (qty >= qtyMin + 1) {
          $this.siblings(".qty-count--minus").attr("disabled", false);
        }

        if (qty >= qtyMax) {
          $this.attr("disabled", true);
        }
      } else {
        qty = qty <= qtyMin ? qtyMin : qty -= 1;

        if (qty == qtyMin) {
          $this.attr("disabled", true);
        }

        if (qty < qtyMax) {
          $this.siblings(".qty-count--add").attr("disabled", false);
        }
      }

      $input.val(qty);
    });
  }();
})(jQuery);

!function (n, i, e, a) {
  ;
  n.navigation = function (t, s) {
    var o = {
      responsive: !0,
      mobileBreakpoint: 991,
      showDuration: 200,
      hideDuration: 200,
      showDelayDuration: 0,
      hideDelayDuration: 0,
      submenuTrigger: "hover",
      effect: "fadeIn",
      submenuIndicator: !0,
      submenuIndicatorTrigger: !1,
      hideSubWhenGoOut: !0,
      visibleSubmenusOnMobile: !1,
      fixed: !1,
      overlay: !0,
      overlayColor: "rgba(0, 0, 0, 0.5)",
      hidden: !1,
      hiddenOnMobile: !1,
      offCanvasSide: "left",
      offCanvasCloseButton: !0,
      animationOnShow: "",
      animationOnHide: "",
      onInit: function onInit() {},
      onLandscape: function onLandscape() {},
      onPortrait: function onPortrait() {},
      onShowOffCanvas: function onShowOffCanvas() {},
      onHideOffCanvas: function onHideOffCanvas() {}
    },
        r = this,
        u = Number.MAX_VALUE,
        d = 1,
        l = "click.nav touchstart.nav",
        f = "mouseenter focusin",
        c = "mouseleave focusout";
    r.settings = {};
    var t = (n(t), t);
    n(t).find(".nav-search").length > 0 && n(t).find(".nav-search").find("form").prepend("<span class='nav-search-close-button' tabindex='0'>&#10005;</span>"), r.init = function () {
      ;
      r.settings = n.extend({}, o, s), r.settings.offCanvasCloseButton && n(t).find(".nav-menus-wrapper").prepend("<span class='nav-menus-wrapper-close-button'>&#10005;</span>"), "right" == r.settings.offCanvasSide && n(t).find(".nav-menus-wrapper").addClass("nav-menus-wrapper-right"), r.settings.hidden && (n(t).addClass("navigation-hidden"), r.settings.mobileBreakpoint = 99999), v(), r.settings.fixed && n(t).addClass("navigation-fixed"), n(t).find(".nav-toggle").on("click touchstart", function (n) {
        n.stopPropagation(), n.preventDefault(), r.showOffcanvas(), s !== a && r.callback("onShowOffCanvas");
      }), n(t).find(".nav-menus-wrapper-close-button").on("click touchstart", function () {
        r.hideOffcanvas(), s !== a && r.callback("onHideOffCanvas");
      }), n(t).find(".nav-search-button, .nav-search-close-button").on("click touchstart keydown", function (i) {
        i.stopPropagation(), i.preventDefault();
        var e = i.keyCode || i.which;
        "click" === i.type || "touchstart" === i.type || "keydown" === i.type && 13 == e ? r.toggleSearch() : 9 == e && n(i.target).blur();
      }), n(t).find(".megamenu-tabs").length > 0 && y(), n(i).resize(function () {
        r.initNavigationMode(C()), O(), r.settings.hiddenOnMobile && m();
      }), r.initNavigationMode(C()), r.settings.hiddenOnMobile && m(), s !== a && r.callback("onInit");
    };

    var h = function h() {
      n(t).find(".nav-submenu").hide(0), n(t).find("li").removeClass("focus");
    },
        v = function v() {
      n(t).find("li").each(function () {
        n(this).children(".nav-dropdown,.megamenu-panel").length > 0 && (n(this).children(".nav-dropdown,.megamenu-panel").addClass("nav-submenu"), r.settings.submenuIndicator && n(this).children("a").append("<span class='submenu-indicator'><span class='submenu-indicator-chevron'></span></span>"));
      });
    },
        m = function m() {
      n(t).hasClass("navigation-portrait") ? n(t).addClass("navigation-hidden") : n(t).removeClass("navigation-hidden");
    };

    r.showSubmenu = function (i, e) {
      C() > r.settings.mobileBreakpoint && n(t).find(".nav-search").find("form").fadeOut(), "fade" == e ? n(i).children(".nav-submenu").stop(!0, !0).delay(r.settings.showDelayDuration).fadeIn(r.settings.showDuration).removeClass(r.settings.animationOnHide).addClass(r.settings.animationOnShow) : n(i).children(".nav-submenu").stop(!0, !0).delay(r.settings.showDelayDuration).slideDown(r.settings.showDuration).removeClass(r.settings.animationOnHide).addClass(r.settings.animationOnShow), n(i).addClass("focus");
    }, r.hideSubmenu = function (i, e) {
      "fade" == e ? n(i).find(".nav-submenu").stop(!0, !0).delay(r.settings.hideDelayDuration).fadeOut(r.settings.hideDuration).removeClass(r.settings.animationOnShow).addClass(r.settings.animationOnHide) : n(i).find(".nav-submenu").stop(!0, !0).delay(r.settings.hideDelayDuration).slideUp(r.settings.hideDuration).removeClass(r.settings.animationOnShow).addClass(r.settings.animationOnHide), n(i).removeClass("focus").find(".focus").removeClass("focus");
    };

    var p = function p() {
      n("body").addClass("no-scroll"), r.settings.overlay && (n(t).append("<div class='nav-overlay-panel'></div>"), n(t).find(".nav-overlay-panel").css("background-color", r.settings.overlayColor).fadeIn(300).on("click touchstart", function (n) {
        r.hideOffcanvas();
      }));
    },
        g = function g() {
      n("body").removeClass("no-scroll"), r.settings.overlay && n(t).find(".nav-overlay-panel").fadeOut(400, function () {
        n(this).remove();
      });
    };

    r.showOffcanvas = function () {
      p(), "left" == r.settings.offCanvasSide ? n(t).find(".nav-menus-wrapper").css("transition-property", "left").addClass("nav-menus-wrapper-open") : n(t).find(".nav-menus-wrapper").css("transition-property", "right").addClass("nav-menus-wrapper-open");
    }, r.hideOffcanvas = function () {
      n(t).find(".nav-menus-wrapper").removeClass("nav-menus-wrapper-open").on("webkitTransitionEnd moztransitionend transitionend oTransitionEnd", function () {
        n(t).find(".nav-menus-wrapper").css("transition-property", "none").off();
      }), g();
    }, r.toggleOffcanvas = function () {
      C() <= r.settings.mobileBreakpoint && (n(t).find(".nav-menus-wrapper").hasClass("nav-menus-wrapper-open") ? (r.hideOffcanvas(), s !== a && r.callback("onHideOffCanvas")) : (r.showOffcanvas(), s !== a && r.callback("onShowOffCanvas")));
    }, r.toggleSearch = function () {
      "none" == n(t).find(".nav-search").find("form").css("display") ? (n(t).find(".nav-search").find("form").fadeIn(200), n(t).find(".nav-search").find("input").focus()) : (n(t).find(".nav-search").find("form").fadeOut(200), n(t).find(".nav-search").find("input").blur());
    }, r.initNavigationMode = function (i) {
      r.settings.responsive ? (i <= r.settings.mobileBreakpoint && u > r.settings.mobileBreakpoint && (n(t).addClass("navigation-portrait").removeClass("navigation-landscape"), S(), s !== a && r.callback("onPortrait")), i > r.settings.mobileBreakpoint && d <= r.settings.mobileBreakpoint && (n(t).addClass("navigation-landscape").removeClass("navigation-portrait"), k(), g(), r.hideOffcanvas(), s !== a && r.callback("onLandscape")), u = i, d = i) : (n(t).addClass("navigation-landscape"), k(), s !== a && r.callback("onLandscape"));
    };

    var b = function b() {
      n("html").on("click.body touchstart.body", function (i) {
        0 === n(i.target).closest(".navigation").length && (n(t).find(".nav-submenu").fadeOut(), n(t).find(".focus").removeClass("focus"), n(t).find(".nav-search").find("form").fadeOut());
      });
    },
        C = function C() {
      return i.innerWidth || e.documentElement.clientWidth || e.body.clientWidth;
    },
        w = function w() {
      n(t).find(".nav-menu").find("li, a").off(l).off(f).off(c);
    },
        O = function O() {
      if (C() > r.settings.mobileBreakpoint) {
        var i = n(t).outerWidth(!0);
        n(t).find(".nav-menu").children("li").children(".nav-submenu").each(function () {
          n(this).parent().position().left + n(this).outerWidth() > i ? n(this).css("right", 0) : n(this).css("right", "auto");
        });
      }
    },
        y = function y() {
      function i(i) {
        var e = n(i).children(".megamenu-tabs-nav").children("li"),
            a = n(i).children(".megamenu-tabs-pane");
        n(e).on("click.tabs touchstart.tabs", function (i) {
          i.stopPropagation(), i.preventDefault(), n(e).removeClass("active"), n(this).addClass("active"), n(a).hide(0).removeClass("active"), n(a[n(this).index()]).show(0).addClass("active");
        });
      }

      if (n(t).find(".megamenu-tabs").length > 0) for (var e = n(t).find(".megamenu-tabs"), a = 0; a < e.length; a++) {
        i(e[a]);
      }
    },
        k = function k() {
      w(), h(), navigator.userAgent.match(/Mobi/i) || navigator.maxTouchPoints > 0 || "click" == r.settings.submenuTrigger ? n(t).find(".nav-menu, .nav-dropdown").children("li").children("a").on(l, function (e) {
        if (r.hideSubmenu(n(this).parent("li").siblings("li"), r.settings.effect), n(this).closest(".nav-menu").siblings(".nav-menu").find(".nav-submenu").fadeOut(r.settings.hideDuration), n(this).siblings(".nav-submenu").length > 0) {
          if (e.stopPropagation(), e.preventDefault(), "none" == n(this).siblings(".nav-submenu").css("display")) return r.showSubmenu(n(this).parent("li"), r.settings.effect), O(), !1;
          if (r.hideSubmenu(n(this).parent("li"), r.settings.effect), "_blank" === n(this).attr("target") || "blank" === n(this).attr("target")) i.open(n(this).attr("href"));else {
            if ("#" === n(this).attr("href") || "" === n(this).attr("href") || "javascript:void(0)" === n(this).attr("href")) return !1;
            i.location.href = n(this).attr("href");
          }
        }
      }) : n(t).find(".nav-menu").find("li").on(f, function () {
        r.showSubmenu(this, r.settings.effect), O();
      }).on(c, function () {
        r.hideSubmenu(this, r.settings.effect);
      }), r.settings.hideSubWhenGoOut && b();
    },
        S = function S() {
      w(), h(), r.settings.visibleSubmenusOnMobile ? n(t).find(".nav-submenu").show(0) : (n(t).find(".submenu-indicator").removeClass("submenu-indicator-up"), r.settings.submenuIndicator && r.settings.submenuIndicatorTrigger ? n(t).find(".submenu-indicator").on(l, function (i) {
        return i.stopPropagation(), i.preventDefault(), r.hideSubmenu(n(this).parent("a").parent("li").siblings("li"), "slide"), r.hideSubmenu(n(this).closest(".nav-menu").siblings(".nav-menu").children("li"), "slide"), "none" == n(this).parent("a").siblings(".nav-submenu").css("display") ? (n(this).addClass("submenu-indicator-up"), n(this).parent("a").parent("li").siblings("li").find(".submenu-indicator").removeClass("submenu-indicator-up"), n(this).closest(".nav-menu").siblings(".nav-menu").find(".submenu-indicator").removeClass("submenu-indicator-up"), r.showSubmenu(n(this).parent("a").parent("li"), "slide"), !1) : (n(this).parent("a").parent("li").find(".submenu-indicator").removeClass("submenu-indicator-up"), void r.hideSubmenu(n(this).parent("a").parent("li"), "slide"));
      }) : n(t).find(".nav-menu, .nav-dropdown").children("li").children("a").on(l, function (e) {
        if (e.stopPropagation(), e.preventDefault(), r.hideSubmenu(n(this).parent("li").siblings("li"), r.settings.effect), r.hideSubmenu(n(this).closest(".nav-menu").siblings(".nav-menu").children("li"), "slide"), "none" == n(this).siblings(".nav-submenu").css("display")) return n(this).children(".submenu-indicator").addClass("submenu-indicator-up"), n(this).parent("li").siblings("li").find(".submenu-indicator").removeClass("submenu-indicator-up"), n(this).closest(".nav-menu").siblings(".nav-menu").find(".submenu-indicator").removeClass("submenu-indicator-up"), r.showSubmenu(n(this).parent("li"), "slide"), !1;
        if (n(this).parent("li").find(".submenu-indicator").removeClass("submenu-indicator-up"), r.hideSubmenu(n(this).parent("li"), "slide"), "_blank" === n(this).attr("target") || "blank" === n(this).attr("target")) i.open(n(this).attr("href"));else {
          if ("#" === n(this).attr("href") || "" === n(this).attr("href") || "javascript:void(0)" === n(this).attr("href")) return !1;
          i.location.href = n(this).attr("href");
        }
      }));
    };

    r.callback = function (n) {
      s[n] !== a && s[n].call(t);
    }, r.init();
  }, n.fn.navigation = function (i) {
    return this.each(function () {
      if (a === n(this).data("navigation")) {
        var e = new n.navigation(this, i);
        n(this).data("navigation", e);
      }
    });
  };
}(jQuery, window, document);

(function ($) {
  "use strict";

  var $window = $(window);

  if ($.fn.navigation) {
    $("#navigation1").navigation();
    $("#always-hidden-nav").navigation({
      hidden: true
    });
  }

  $window.on("load", function () {
    $("#preloader").fadeOut("slow", function () {
      $(this).remove();
    });
  });
})(jQuery);