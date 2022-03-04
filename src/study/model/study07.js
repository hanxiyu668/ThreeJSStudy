// 半透明边框模型
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
    // GridHelper,
    //Float32BufferAttribute,
    //BufferGeometry,
    MeshStandardMaterial,
    // LineBasicMaterial,
    // LineSegments,
    BufferGeometryUtils,
    BoxBufferGeometry,
    Mesh,
    PlaneGeometry,
    //  LineSegments,
    //    LineLoop,
    //     LineBasicMaterial,
    // EdgesGeometry,
    //LineSegments
    //  SphereGeometry,
} from "three"
const useStudy = (dom) => {
    const renderer = new WebGLRenderer({
        antialias: true   // 开启抗锯齿
    })
    renderer.shadowMap.enabled = true  // 开启阴影
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.setSize(dom.offsetWidth, dom.offsetHeight, true)
    renderer.setPixelRatio(window.devicePixelRatio);

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

    const gg = new PlaneGeometry(2000, 2000);
    const gm = new MeshStandardMaterial({ color: '#000729' });

    const ground = new Mesh(gg, gm);
    ground.rotation.x = - Math.PI / 2;

    ground.receiveShadow = true;

    scene.add(ground);
    // const lineGeometry = createBox(20,20,20)
    // const meshGeometry = new BoxBufferGeometry(20,20,20)
    // const boxGeometry = BufferGeometryUtils.mergeBufferGeometries([lineGeometry, meshGeometry], true);
    // const box = new LineLoop(
    //     new BoxBufferGeometry(20,20,20),
    //     new LineBasicMaterial({
    //         color: '#98d4f8'
    //     })
    // )

    // const box = new Mesh(
    //     boxGeometry,
    //     new MeshStandardMaterial({
    //         color: '#3665cd',
    //         transparent: true,
    //         opacity: 0.8
    //     })
    // )
    // scene.add(box)

    var geometry = new BoxBufferGeometry(100, 100, 100);
    var geometry11 = new BoxBufferGeometry(100, 100, 100);
    // var edges = new EdgesGeometry(geometry);
    // var line = new LineSegments( edges, new LineBasicMaterial( { color: 0xffffff,linewidth:10 } ) );
    const boxGeometry = BufferGeometryUtils.mergeBufferGeometries([geometry, geometry11], true);
    console.log(boxGeometry)
    // const box = new Mesh(
    //     boxGeometry,
    //     new MeshStandardMaterial({
    //         color: '#3665cd',
    //         transparent: true,
    //         opacity: 0.8
    //     })
    // )
    // scene.add(box)
    // scene.add( line );
    // scene.add(box, box2)

    // 生成立方体
    // function createBox( width, height, depth ) {
    //     width = width * 0.5,
    //     height = height * 0.5,
    //     depth = depth * 0.5;
    //     const geometry = new BufferGeometry();
    //     const position = [];
    //     position.push(
    //         - width, - height, - depth,
    //         - width, height, - depth,

    //         - width, height, - depth,
    //         width, height, - depth,

    //         width, height, - depth,
    //         width, - height, - depth,

    //         width, - height, - depth,
    //         - width, - height, - depth,

    //         - width, - height, depth,
    //         - width, height, depth,

    //         - width, height, depth,
    //         width, height, depth,

    //         width, height, depth,
    //         width, - height, depth,

    //         width, - height, depth,
    //         - width, - height, depth,

    //         - width, - height, - depth,
    //         - width, - height, depth,

    //         - width, height, - depth,
    //         - width, height, depth,

    //         width, height, - depth,
    //         width, height, depth,

    //         width, - height, - depth,
    //         width, - height, depth
    //      );

    //     geometry.setAttribute( 'position', new Float32BufferAttribute( position, 3 ) );
    //     return geometry;

    // }

    //#region 
    const axesHelper = new AxesHelper(500)
    // const gridHelper = new GridHelper(500, 20, 'rgb(200, 200, 200)', 'rgb(100, 100, 100)')
    scene.add(axesHelper)
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

    }
    renderFun()
    dom.appendChild(renderer.domElement)


    return {

    }

}
export default useStudy
