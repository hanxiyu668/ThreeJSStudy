// 绘制风力发电机扇叶
import {
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    PCFSoftShadowMap,

    OrbitControls,
    MOUSE,
    Mesh,

    MeshStandardMaterial,
     // ArcCurve,
    HemisphereLight,
    DirectionalLight,
    ExtrudeGeometry,
    Shape,
     Vector2,
    // Path,
    // DoubleSide,
    // LatheGeometry,
    // MeshPhongMaterial,
    // EllipseCurve,
    LineCurve,
    CurvePath,
    // BufferGeometry,
    // Line,
    // Geometry,
    //CatmullRomCurve3,
    QuadraticBezierCurve,
    // LineBasicMaterial,
    // LineDashedMaterial,
    // LineBasicMaterial,
    // Geometry,
    AxesHelper,
    GridHelper,
    Group
    // SplineCurve
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


    var line1 = new LineCurve(new Vector2(0, 0), new Vector2(0, 3));
    var line2 = new LineCurve(new Vector2(0, 3), new Vector2(12, 7));
    var curve = new QuadraticBezierCurve(
        new Vector2(12, 7),
        new Vector2(20, 9),
        new Vector2(30, 8)
    );
    var line3 = new LineCurve(new Vector2(30, 8), new Vector2(100, 1));
    var line4 = new LineCurve(new Vector2(100, 1), new Vector2(100, 0));
    var line5 = new LineCurve(new Vector2(100, 0), new Vector2(0, 0));
    var curvePath = new CurvePath();
    curvePath.curves.push(line1, line2, curve, line3, line4, line5);
    var shape = new Shape(curvePath.getPoints(50));
    const geometry = new ExtrudeGeometry(
        shape,
        {
            amount: 0.5,//拉伸长度
            bevelEnabled: false//无倒角
        }
    );
    const material = new MeshStandardMaterial({
        color: 'blue',
    });//材质对象
    for (let i = 0; i < 3; i++) {
        const group = new Group()
        const mesh = new Mesh(geometry, material)
        mesh.rotateX(Math.PI / 6)
        mesh.position.x = 9
      
        group.add(mesh)
      
        group.rotateZ(Math.PI * 2 / 3 * i)
        group.scale.set(0.1,0.1,0.1)
        scene.add(group)
      }



    // 二维直线LineCurve
    // var line1 = new LineCurve(new Vector2(0, 0), new Vector2(0, 3));
    // var line2 = new LineCurve(new Vector2(0, 3), new Vector2(12, 7));

    // var curve = new QuadraticBezierCurve(
    //     new Vector2(12, 7),
    //     new Vector2(20, 9),
    //     new Vector2(30, 8)
    // );

    // var line3 = new LineCurve(new Vector2(30, 8), new Vector2(100, 1));
    // var line4 = new LineCurve(new Vector2(100, 1), new Vector2(100, 0));
    // var line5 = new LineCurve(new Vector2(100, 0), new Vector2(0, 0));
    // var curvePath = new CurvePath();
    // curvePath.curves.push(line1, line2, curve, line3, line4, line5);
    // // var points = curvePath.getPoints()
    // console.log(curvePath.getPoints(50))
    // const shape = new Shape(curvePath.getPoints(50))
    // var geometry = new ExtrudeGeometry(//拉伸造型
    //     shape,
    //     {
    //         bevelEnabled: false,//无倒角
    //         extrudePath: curve,//选择扫描轨迹
    //         steps: 50//扫描方向细分数
    //     }
    // );
    // const material = new MeshStandardMaterial({
    //     color: 'blue'
    // });//材质对象
    // const mesh = new Mesh(geometry, material);//点模型对象
    // scene.add(mesh);


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