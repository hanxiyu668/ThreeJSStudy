// 实例化网格
import {
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    PCFSoftShadowMap,

    OrbitControls,
    MOUSE,

    HemisphereLight,
    DirectionalLight,
    AxesHelper,
    GridHelper,
    InstancedMesh,
    BoxGeometry,
    MeshStandardMaterial,
    Object3D,
    BufferGeometryUtils,
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
    scene.background = 'lightgray'

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


    // 实例化模型
    const geometry1 = new BoxGeometry(2, 2, 2);
    const geometry2 = new BoxGeometry(2, 2, 2);
    geometry2.translate(0, 0, 3)
    const box = BufferGeometryUtils.mergeBufferGeometries([geometry1, geometry2], false);
    var material = new MeshStandardMaterial({ color: 'blue' });
    const mesh = new InstancedMesh(box, material, 10);
    const transform = new Object3D();
    
    for (let i = 0; i < mesh.count; i++) {
        transform.position.x = i * 10
        transform.updateMatrix();
        mesh.setMatrixAt(i, transform.matrix);
    }
    scene.add(mesh);

    //#region 
    const axesHelper = new AxesHelper(500)
    const gridHelper = new GridHelper(500, 20, 'rgb(200, 200, 200)', 'rgb(100, 100, 100)')
    scene.add(axesHelper)
    scene.add(gridHelper)
    //#endregion


    // 初始orbitControls
    const orbitControls = new OrbitControls(camera, renderer.domElement)
    orbitControls.mouseButtons = {
        LEFT: null,
        MIDDLE: MOUSE.DOLLY,
        RIGHT: MOUSE.ROTATE
    }

    const renderFun = () => {
        orbitControls.update()
        renderer.render(scene, camera)
        requestAnimationFrame(renderFun)
    }
    renderFun()
    dom.appendChild(renderer.domElement)


    return {

    }

}
export default useStudy
