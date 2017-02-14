(function() {
    window.addEventListener('DOMContentLoaded', function() {
        // get the canvas DOM element
        var canvas = document.getElementById('renderCanvas');

        // load the 3D engine
        var engine = new BABYLON.Engine(canvas, true);

        // createScene function that creates and return the scene
        var createScene = function() {
            // create a basic BJS Scene object
            var scene = new BABYLON.Scene(engine);

            // create a FreeCamera, and set its position
            var camera = new BABYLON.UniversalCamera('camera1', new BABYLON.Vector3(197, 60, -150), scene);
            // Enable Collisions
            scene.collisionsEnabled = true;
            camera.checkCollisions = true;
            // target the camera to scene origin
            camera.setTarget(new BABYLON.Vector3(-200, 0, 0));

            // attach the camera to the canvas
            camera.attachControl(canvas, false);

            // create a basic light
            var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(8, 115, 95), scene);

            // init the AssetsManager                
            var loader = new BABYLON.AssetsManager(scene);
            // Load the room scene
            var room = loader.addMeshTask("room", "", "assets/", "Bedroom.obj");
            room.onSuccess = function(task) {
                task.loadedMeshes.map(function(m) {

                    m.checkCollisions = true;
                })
            }
            // load ambient sound
            var music = new BABYLON.Sound("loop", "assets/loop.mp3", scene, null, {
                loop: true,
                autoplay: true
            });
            // load cat sound
            var meowing = new BABYLON.Sound("meow", "assets/meow.mp3", scene, null, {
                loop: true,
                autoplay: true,
                spatialSound: true
            });
            meowing.setPosition(new BABYLON.Vector3(-33, 37, 61));
            // load the cat 
            var cat = loader.addMeshTask("cat", "", "assets/", "Cat.obj");
            cat.onSuccess = function(task) {
                task.loadedMeshes.map(function(m) {
                    m.position = new BABYLON.Vector3(-33, 37, 61);
                    m.scaling.x = 30;
                    m.scaling.y = 30;
                    m.scaling.z = 30;
                    m.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
                    m.checkCollisions = true;
                })
            }

            // show the models                
            loader.load();
            // return the created scene
            return scene;
        }

        // call the createScene function
        var scene = createScene();

        // run the render loop
        engine.runRenderLoop(function() {
            //console.log(scene.cameras[0].position)
            scene.render();
        });

        // the canvas/window resize event handler
        window.addEventListener('resize', function() {
            engine.resize();
        });
    });
}());
