function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });

  tl.from(".purple p", { scale: 0.3, rotation: 45, autoAlpha: 0, ease: "power2" })
    .from(".line-3", { scaleX: 0, transformOrigin: "left center", ease: "none" }, 0)
    .to(".purple", { backgroundColor: "#28a92b" }, 0);



  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}
function loadingAnimation() {
  let tl = gsap.timeline();
  tl.from(".line h1", {
    y: 150,
    stagger: 0.25,
    duration: 0.5,
    delay: 0.2,
  });
  tl.from("#line1-part1", {
    opacity: -0.4,
    onStart: function () {
      let h6timer = document.querySelector("#line1-part1 h5");
      let grow = 0;
      setInterval(() => {
        if (grow < 100) {
          h6timer.innerHTML = grow++;
        } else {
          h6timer.innerHTML = grow;
        }
      }, 40);
    },
  });
  tl.to(".line h2", {
    animationName: "loaderAnime",
    opacity: 1,
  });
  tl.to("#loader", {
    opacity: 0,
    display: "none",
    duration: 0.2,
    delay: 0,
  });
  tl.from("#page1", {
    y: 1600,
    delay: 0,
    ease: Power4,
  });
  tl.from("#nav", {
    opacity: 0,
  });
  tl.from(
    "#page1-content1 h1,#page1-content2 h1,#page1-content3 h2,#page1-content4 h1",
    {
      y: 120,
      stagger: 0.1,
    }
  );
  tl.from(
    "#page1-content1, page2",
    {
      opacity:0,
    },"-=1"
  );
}
function cursorAnimation() {
  document.addEventListener("mousemove", function (dets) {
    gsap.to("#crsr", {
      left: dets.x,
      top: dets.y,
    });
  });
  Shery.makeMagnet("#nav-part2 h4", {
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  });
}
loadingAnimation();
// cursorAnimation();
locomotiveAnimation();