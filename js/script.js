let searchToggle = document.getElementById("search-toggle");
let searchInput = document.getElementById("search-input");

searchToggle.addEventListener("click", function(){
    searchInput.classList.toggle("show");
});

let navToggler = document.querySelector("[data-nav-toggler]");
let menu = document.querySelector(".menu");
navToggler.addEventListener("click", function(){
    menu.classList.toggle("open");
});

let carouselSliderHero = function(){
    let wrapper = document.querySelector(".hero .wrapper");
    let carousel = document.querySelector(".hero .carousel");
    let arrowBtns = document.querySelectorAll(".hero .wrapper i");
    let firstCardWidth = carousel.querySelector(".hero .card").offsetWidth;
    let carouselChildrens = [...carousel.children];

    let isDragging = false;
    let startX, startScrollLeft, timeoutID;

    // Get the number of cards that can fit in the carousel at once
    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

    // Insert copies of the last few cards to beginning of carousel for infinite scrolling
    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    // Insert copies of the first few cards to end of carousel for infinite scrolling
    carouselChildrens.slice(0, cardPerView).forEach(card => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    // Add event listeners for the arrow buttons to scroll the carousel left and right
    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            //console.log(btn.id);
            carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
        });
    });

    let dragStar = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        // Records the initial cursor and scroll of the carousel
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    };

    let dragging = (e) => {
        if(!isDragging) return; // if isDragging is false return from here
        // Updates the scroll position of the carousel based on the cursor movement
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    };

    let dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    };

    let autoPlay = () => {
        if(window.innerWidth < 800) return; //Return if window is smaller than 800
        // Autoplay the carousel after every 2500 ms
        timeoutID = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
    };
    autoPlay();

    let infiniteScroll = () => {
        // If the carousel is at the beginning, scroll to the end
        if(carousel.scrollLeft === 0){
            /*console.log("You've reached to the left end");*/
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.scrollWidth - ( 2 * carousel.offsetWidth);
            carousel.classList.remove("no-transition");
        }
        // If the carousel is at the end, scroll to the beginning
        else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
            /*console.log("You've reached to the right end");*/
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
        }

        clearTimeout(timeoutID);
        if(!wrapper.matches(":hover")) autoPlay();

    };

    /* The mouse button is held down. */
    carousel.addEventListener("mousedown", dragStar);
    /* The onmousemove event occurs when the pointer moves over an element */
    carousel.addEventListener("mousemove", dragging);
    /* You released the mouse button. */
    document.addEventListener("mouseup", dragStop);
    /* Infinite Scroll */
    carousel.addEventListener("scroll", infiniteScroll);

    wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutID));
    wrapper.addEventListener("mouseleave", autoPlay);
};


window.addEventListener("scroll", function(){
    let forBuildingOut = document.querySelector(".for-building-out");
    forBuildingOut.classList.toggle("sticky", window.scrollY > 100);

    let forBuildingOut2 = document.querySelector(".for-building-out2");
    forBuildingOut2.classList.toggle("sticky", window.scrollY > 4000);

    let ourSpeakersItem = document.querySelectorAll(".our-speakers-item");
    for (let index = 0; index < ourSpeakersItem.length; index++) {
        ourSpeakersItem[index].classList.toggle("star-anim", window.scrollY > 250);   
    }

    let aboutTamplateItem = document.querySelectorAll(".about-tamplate-see .about-tamplate-item");
    for (let index = 0; index < aboutTamplateItem.length; index++) {
        aboutTamplateItem[index].classList.toggle("star-anim", window.scrollY > 950);   
    }
    
    let recentPostsItem = document.querySelectorAll(".recent-posts-see .recent-posts-item");
    for (let index = 0; index < recentPostsItem.length; index++) {
        recentPostsItem[index].classList.toggle("star-anim", window.scrollY > 1400);   
    }
    
    let trustItem1 = document.querySelector(".trust-see .trust-item1");
    trustItem1.classList.toggle("star-anim", window.scrollY > 2200);
    let trustItem2 = document.querySelector(".trust-see .trust-item2");
    trustItem2.classList.toggle("star-anim", window.scrollY > 2200);
    
});





window.onload = function(){
    carouselSliderHero();
}