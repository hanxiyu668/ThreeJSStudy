// 射线对象
import {
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    PCFSoftShadowMap,
    OrbitControls,
    MOUSE,
    HemisphereLight,
    DirectionalLight,
    // AxesHelper,
    // GridHelper,
    Vector2,
    Raycaster,
    BoxGeometry,
    MeshStandardMaterial,
    Mesh,
    EffectComposer,
    OutlinePass,
    RenderPass,
    // ShaderPass,
    // FXAAShader,
    TextureLoader,
    PlaneGeometry,
    MeshPhongMaterial,
    RepeatWrapping,
    sRGBEncoding,
    Group
    //  SphereGeometry,
} from "three"
const useStudy = (dom) => {
    const renderer = new WebGLRenderer({
        antialias: true   // 开启抗锯齿
    })
    renderer.shadowMap.enabled = true  // 开启阴影
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.setSize(dom.offsetWidth, dom.offsetHeight, true)


    const scene = new Scene()
    scene.background = 'red'

    const camera = new PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.set(0, 0, 250);

    //#region 灯光
    const hemiLight = new HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 50, 0);

    const dirLight = new DirectionalLight(0xffffff, 1);
    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.position.set(- 1, 1.75, 1);
    dirLight.position.multiplyScalar(30);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    const d = 50;
    dirLight.shadow.camera.left = - d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = - d;
    dirLight.shadow.camera.far = 3500;
    dirLight.shadow.bias = - 0.0001;

    scene.add(hemiLight)
    scene.add(dirLight)
    //#endregion
    const gt = new TextureLoader().load(require("../../assets/grasslight-big.jpg"));
    const gg = new PlaneGeometry(2000, 2000);
    const gm = new MeshPhongMaterial({ color: 0xffffff, map: gt });

    const ground = new Mesh(gg, gm);
    ground.rotation.x = - Math.PI / 2;
    ground.material.map.repeat.set(8, 8);
    ground.material.map.wrapS = ground.material.map.wrapT = RepeatWrapping;
    ground.material.map.encoding = sRGBEncoding;
    ground.receiveShadow = true;

    scene.add(ground);


    const geometry = new BoxGeometry(20, 20, 20);
    var material = new MeshStandardMaterial({ color: 'blue' });
    const mesh = new Mesh(geometry, material, 10);
    mesh.name = 'ceshi'

    const geometry1 = new BoxGeometry(20, 20, 20);
    var material1 = new MeshStandardMaterial({ color: 'blue' });
    const mesh1 = new Mesh(geometry1, material1, 10);
    mesh1.position.y=30
    const group = new Group()
    group.add(mesh)
    group.add(mesh1)
    scene.add(group)




    let composer, outlinePass;

    let selectedObjects = [];
    const raycaster = new Raycaster();
    const mouse = new Vector2();

    composer = new EffectComposer(renderer);

    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    outlinePass = new OutlinePass(new Vector2(window.innerWidth, window.innerHeight), scene, camera);
    outlinePass.visibleEdgeColor.set('rgb(232,139,33)');
    composer.addPass(outlinePass);


    renderer.domElement.style.touchAction = 'none';
    renderer.domElement.addEventListener('pointermove', onPointerMove);

    function onPointerMove(event) {

        if (event.isPrimary === false) return;

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        checkIntersection();

    }

    function addSelectedObject(object) {

        selectedObjects = [];
        selectedObjects.push(object);

    }

    function checkIntersection() {

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObject(scene, true);

        if (intersects.length > 0) {

            const selectedObject = intersects[0].object;
            addSelectedObject(selectedObject.parent);
            outlinePass.selectedObjects = selectedObjects;

        } else {

            // outlinePass.selectedObjects = [];

        }

    }







    //#region 
    // const axesHelper = new AxesHelper(500)
    // const gridHelper = new GridHelper(500, 20, 'rgb(200, 200, 200)', 'rgb(100, 100, 100)')
    // scene.add(axesHelper)
    // scene.add(gridHelper)
    //#endregion


    // 初始orbitControls
    const orbitControls = new OrbitControls(camera, renderer.domElement)
    orbitControls.mouseButtons = {
        LEFT: null,
        MIDDLE: MOUSE.DOLLY,
        RIGHT: MOUSE.ROTATE
    }

    const renderFun = () => {
        requestAnimationFrame(renderFun)
        orbitControls.update()

        renderer.render(scene, camera)


        composer.render();
    }
    renderFun()
    dom.appendChild(renderer.domElement)


    return {

    }

}
export default useStudy
