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
      let h6timer = document.querySelector("#line1-part1 h6");
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
    duration: 0.2 ,
    delay: 3.7,
  });
  tl.from("#page1", {
    y: 1600,
    delay: 0,
    ease: Power4,
  });
}

loadingAnimation();
