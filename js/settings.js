/* ---- particles.js config ---- */

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 1500, //1000
      "density": {
        "enable": true,
        "value_area": 15000 //5000
      }
    },
    "color": {
      "value": "#cd18f2"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#a8133b"
      },
      "polygon": {
        "nb_sides": 2
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 1,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 0.8,
        "opacity_min": 0.0,
        "sync": false
      }
    },
    "size": {
      "value": 0,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 10,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 200, //100
      "color": "#0b8dea",
      "opacity": 0.9,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 0.2,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 1200,//600
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": { 
        "distance": 800, // 400
        "size": 80, //40
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 500, //300
        "duration": 0.5
      },
      "push": {
        "particles_nb": 1
      },
      "remove": {
        "particles_nb": 1
      }
    }
  },
  "retina_detect": true
});
