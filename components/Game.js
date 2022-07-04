AFRAME.registerComponent("game-play", {
  schema: {
    elementId: { type: "string", default: "#coin1" },
  },

  init: function () {
    var duration = 120;
    var timerEl = document.querySelector("#timer");
    this.startTimer(duration, timerEl);
  },

  update: function () {
    this.shootBullets();
  },

  startTimer: function (duration, timerEl) {
    var minutes;
    var seconds;

    setInterval(()=> {
      if (duration >=0) {
        minutes = parseInt(duration / 60);
        seconds = parseInt(duration % 60);

        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (seconds < 10) {
          seconds = "0" + seconds;
        }

        timerEl.setAttribute("text", {
          value: minutes + ":" + seconds,
        });

        duration -= 1;
      } 
      else {
        this.gameOver();        
      }
    },1000)
  },
  shootBullets: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "q") {
        var bullet = document.createElement("a-entity")

        bullet.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.25
        })

        bullet.setAttribute("material", "color", "black");

        var initial = document.querySelector("#plane-model");
        var pos = initial.getAttribute("position");

        bullet.setAttribute("position", {
          x: pos.x,
          y: pos.y-2,
          z: pos.z-4.4,
        });

        var camera = document.querySelector("#camera").object3D;

        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        bullet.setAttribute("velocity", direction.multiplyScalar(-50));

        var scene = document.querySelector("#scene");

        bullet.setAttribute("dynamic-body", {
          shape: "sphere",
          mass: "20",
        });

        bullet.setAttribute("visible", true);

        //add the collide event listener to the bullet
        bullet.addEventListener("collide", this.isShot)

        scene.appendChild(bullet)
      }
    })
  },
  updateTargets: function () {
    var element = document.querySelector("#targets");
    var count = element.getAttribute("text").value;
    var currentTargets = parseInt(count);
    currentTargets -= 1;
    element.setAttribute("text", {
      value: currentTargets,
    });
  },
  updateScore: function () {
    var element = document.querySelector("#score");
    var count = element.getAttribute("text").value;
    var currentScore = parseInt(count);
    currentScore += 50;
    element.setAttribute("text", {
      value: currentScore,
    });
  },
  gameOver: function () {
    var planeEl = document.querySelector("#plane_model");
    var element = document.querySelector("#game_over_text");
    element.setAttribute("visible", true);
    planeEl.setAttribute("dynamic-body", {
      mass: 1
    });
  },
});
