(function () {
//escena, camara, render
    let scene = new THREE.Scene();
//Definimos la camara
    const aspectRatio = window.innerWidth / window.innerHeight;
    let camera = new THREE.PerspectiveCamera(75, aspectRatio,0.1,100);

    camera.position.z = 70;
    camera.position.y = 2;

//DEfinir render
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.soft = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    //let geometry = new THREE.BoxGeometry(10,10,10); //aca le doy tamaño a mi objeto
   // let groundMaterial = new THREE.MeshPhongMaterial({
     //   color: 0xffffff
    //}); //MESHPHONGMATERIAL es una texture tecnicamente
    //declaro la maya
    //let mesh = new THREE.Mesh(geometry, groundMaterial);

    let pointLight = new THREE.PointLight(0xb00b1e); //Declaro el pointlight
    pointLight.position.y = 150; //posicion de la luz
    pointLight.position.x = 20;
    pointLight.castShadow=true;

    let planeGeometry = new THREE.PlaneGeometry(100,900);
    planeGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(- Math.PI/2));
    let groundMaterial = new THREE.MeshPhongMaterial({
        color: 0x2a4858
    });

    let plane = new THREE.Mesh(planeGeometry, groundMaterial);
    plane.receiveShadow = true;
    let mesh;
    let marte;
    let mercurio;
    let luna;

    let loader = new THREE.TextureLoader();
    let loader1 = new THREE.TextureLoader();
    let loader2 = new THREE.TextureLoader();
    let loader3 = new THREE.TextureLoader();
    loader.load('terra.jpg', function(texture){
        let geometry = new THREE.SphereGeometry(20,100,100); //aca testeo con una esfera en vez de BOX
        let material = new THREE.MeshBasicMaterial({
            map: texture
        });
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = 30;
        mesh.castShadow = true;
        scene.add(mesh);
    });

    loader1.load('marte.jpg', function(texture){
        //let geometry = new THREE.SphereGeometry(10,80,60); //aca testeo con una esfera en vez de BOX
        let geometry = new THREE.BoxGeometry(10,10,10);
        let material = new THREE.MeshPhongMaterial({
            map: texture
        });
        marte = new THREE.Mesh(geometry, material);
        marte.position.y = 20;
        marte.position.x = 50;
        marte.castShadow = true;
        scene.add(new THREE.AmbientLight(0x95a5a6));
        scene.add(marte);
    });

     loader2.load('testura.jpg', function (texture2) {
        //let geometry = new THREE.SphereGeometry(10,80,60); //aca testeo con una esfera en vez de BOX
        let geometry = new THREE.BoxGeometry(10, 10, 10);
        let material = new THREE.MeshPhongMaterial({
            map: texture2
        });
        mercurio = new THREE.Mesh(geometry, material);
        mercurio.position.y = 10;
        mercurio.position.x = -55;
        mercurio.castShadow = true;
        scene.add(new THREE.AmbientLight(0x95a5a6));
        scene.add(mercurio);
    });
    loader3.load('luna.jpg', function(texture1){
        //let geometry = new THREE.SphereGeometry(10,80,60); //aca testeo con una esfera en vez de BOX
        let geometry = new THREE.SphereGeometry(8,8,8);
        let material = new THREE.MeshBasicMaterial({
            map: texture1
        });
        luna = new THREE.Mesh(geometry, material);
        luna.position.y = 20;
        luna.position.x = -35;
        luna.castShadow = true;
        scene.add(new THREE.AmbientLight(0x95a5a6));
        scene.add(luna);
    });


    //scene.background = new THREE.Color(0xeeeeee);
    scene.add(plane);
    //scene.add(mesh);
   // scene.add(new THREE.AmbientLight(0x95a5a6));
    //creo el loop con la escena y la camara en el render
    scene.add(pointLight);

    let controls = new THREE.OrbitControls(camera, renderer.domElement);
    function loop(){
        requestAnimationFrame(loop);
        mesh.rotation.y += 0.01;
        mesh.rotation.x += 0.01;
        marte.rotation.y += 0.02;
        marte.rotation.x += 0.01;
        mercurio.rotation.x += 0.01;
        luna.rotation.y += 0.01;
        //mesh.rotation.z += 0.01;
        //console.log('nuevo forograma')
        renderer.render(scene,camera);

    }
    loop();
})();