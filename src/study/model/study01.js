import {
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    PCFSoftShadowMap,

    OrbitControls,
    MOUSE,
    // Mesh,

    // MeshStandardMaterial,
    //ArcCurve,
    HemisphereLight,
    DirectionalLight,
    // ExtrudeGeometry,
    // Shape,
    // Vector3,
    // Path,
    // DoubleSide,
    // LatheGeometry,
    // MeshPhongMaterial,
    // EllipseCurve,
    // LineCurve,
    // CurvePath,
    // BufferGeometry,
    // Line,
    // Geometry,
    //CatmullRomCurve3,
    // QuadraticBezierCurve3,
    // LineBasicMaterial,
    // LineDashedMaterial,
    //LineBasicMaterial,
    // Geometry,
    AxesHelper,
    GridHelper
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

    //#region 圆管
    // const arcOut = new ArcCurve(0, 0, 100, 0, 2 * Math.PI);
    // const arcIn = new ArcCurve(0, 0, 80, 0, 2 * Math.PI);
    // var shape = new Shape(arcOut.getPoints(50));
    // // 空洞holes必须push一个path的对象
    // shape.holes.push(new Path().setFromPoints(arcIn.getPoints(50)));
    // const geometry = new ExtrudeGeometry(
    //     shape,
    //     {
    //         amount: 2,//拉伸长度
    //         bevelEnabled: false//无倒角
    //     }
    // );
    // const material = new MeshStandardMaterial({
    //     color: 'blue',
    //     side: DoubleSide, // 双面材质
    // });//材质对象
    // const mesh = new Mesh(geometry, material);//点模型对象
    // mesh.rotateX(Math.PI / 2)
    // scene.add(mesh)

    //#endregion

    //#region 旋转成型 风机头部建模
    // var arc1 = new EllipseCurve(0, 0, 100, 150, 0, Math.PI / 2);
    // const line1 = new LineCurve(new Vector2(100, -40, 0), new Vector2(100, 0, 0))
    // var curvePath = new CurvePath();
    // curvePath.curves.push(line1, arc1,);
    // curvePath.autoClose = false
    // const geometryLine = new BufferGeometry().setFromPoints(curvePath.getPoints())
    // const line = new Line(geometryLine, new LineDashedMaterial({ color: 'blue' }));
    // scene.add(line)
    // var geometry1 = new LatheGeometry(curvePath.getPoints(30), 30);
    // var material1 = new MeshPhongMaterial({
    //     color: 0x0000ff,//三角面颜色
    //     side: DoubleSide//两面可见
    // });//材质对象
    // var mesh1 = new Mesh(geometry1, material1);//旋转网格模型对象
    // scene.add(mesh1);//旋转网格模型添加到场景中
    // mesh1.visible = true
    //#endregion

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