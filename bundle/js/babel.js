"use strict";

;$(document).ready(function () {

    /* Lightgallery init
     **********************/
    $("#lightgallery").lightGallery({
        share: false,
        autoplayControls: false,
        selector: ".gallery__item",
        fullScreen: false,
        download: false
    });
    /* Fullpage init
     **********************/
    $('#fullpage').fullpage({
        //Navigation
        menu: '#nav',
        lockAnchors: false,
        anchors: ['header', 'products', 'advantages', 'scheme', 'gallery', 'contacts'],
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['Главная', 'Продукция', 'Наши преимущества', 'Схема работы', 'Фотоголерея', 'Контакты'],
        showActiveTooltip: false,
        slidesNavigation: false,
        slidesNavPosition: 'bottom',

        //Scrolling
        css3: true,
        scrollingSpeed: 700,
        autoScrolling: true,
        fitToSection: true,
        fitToSectionDelay: 1000,
        scrollBar: false,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: true,
        continuousVertical: false,
        continuousHorizontal: false,
        scrollHorizontally: true,
        interlockedSlides: false,
        dragAndMove: false,
        offsetSections: false,
        resetSliders: false,
        fadingEffect: false,
        normalScrollElements: '',
        scrollOverflow: false,
        scrollOverflowReset: false,
        scrollOverflowOptions: null,
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 5,
        bigSectionsDestination: null,

        //Accessibility
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: true,

        //Design
        controlArrows: true,
        verticalCentered: false,
        sectionsColor: [],
        paddingTop: '53px',
        paddingBottom: '0px',
        fixedElements: '#nav',
        responsiveWidth: 992,
        responsiveHeight: 850,
        responsiveSlides: false,
        parallax: false,
        parallaxOptions: {
            type: 'reveal',
            percentage: 62,
            property: 'translate'
        },

        //Custom selectors
        sectionSelector: '.section',
        slideSelector: '.slide',
        lazyLoading: false,
        //events
        onLeave: function onLeave(index, nextIndex, direction) {},
        afterLoad: function afterLoad(anchorLink, index) {
            if ($(window).width() > 767) {
                if (index == 2) {
                    $(".card").css({
                        "transform": "translate(0)",
                        "opacity": "1"
                    });
                    $(".title_1").css({
                        "transform": "scale(1)"
                    });
                }
                if (index == 3) {
                    $(".title_2").css({
                        "transform": "scale(1)"
                    });
                    $('.advantages-card__img-box').css({
                        "transform": "translateX(0rem)",
                        "opacity": "1"
                    });
                    $('.advantages-card__header').css({
                        "transform": "translateY(0rem)",
                        "opacity": "1"
                    });
                    $('.advantages-card__text').css({
                        "transform": "scale(1)"
                    });
                }
                if (index == 4) {
                    $(".title_3").css({
                        "transform": "scale(1)"
                    });
                    $('.scheme__img-box').css({
                        "transform": "translateY(0rem) rotate(360deg)",
                        'opacity': 1
                    });
                    $('.scheme__header').css({
                        "transform": "scale(1)"
                    });
                    $('.scheme__arrow').css({
                        "transform": "scale(1)"
                    });
                }
                if (index == 5) {
                    $(".title_4").css({
                        "transform": "scale(1)"
                    });
                    $(".gallery__item").css({
                        "transform": "scale(1)"
                    });
                }
                if (index == 6) {
                    $(".contacts__container").css({
                        "transform": "translateX(0)",
                        "opacity": "1"
                    });
                }
            }
        },
        afterRender: function afterRender() {},
        afterResize: function afterResize() {},
        afterResponsive: function afterResponsive(isResponsive) {
            if (isResponsive) {
                if ($(window).width() >= 575) {
                    $(".contacts__map").css("height", "600px");
                }
            }
        },
        afterSlideLoad: function afterSlideLoad(anchorLink, index, slideAnchor, slideIndex) {},
        onSlideLeave: function onSlideLeave(anchorLink, index, slideIndex, direction, nextSlideIndex) {}
    });

    $(".nav__more-button").click(function () {
        $('.nav__more').toggleClass('nav__more_active');
    });
    $(".nav__open").click(function () {
        $('.nav__main-box').show('slow');
        $(".nav__close").fadeIn();
        $(".nav__open").fadeOut();
    });
    $(".nav__close").click(function () {
        $('.nav__main-box').hide('slow');
        $('.nav__close').fadeOut();
        $('.nav__open').fadeIn();
    });
    $('.nav__main-box .nav__item').click(function () {
        if ($(window).width() <= 767) {
            $('.nav__main-box').hide('slow');
            $('.nav__close').fadeOut();
            $('.nav__open').fadeIn();
        }
    });
    $(".section.contacts").css("padding-top", "0");
    svg4everybody();
});