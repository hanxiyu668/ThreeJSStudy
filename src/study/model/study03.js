// 建立风力发电机模型

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
    CylinderBufferGeometry,
    BoxBufferGeometry,
    // BufferGeometry,
    MeshStandardMaterial,
    Mesh,
    BufferGeometryUtils,
    EllipseCurve,
    LineCurve,
    Vector2,
    CurvePath,
    LatheGeometry,
    DoubleSide,
    ExtrudeGeometry,
    // Group,
    QuadraticBezierCurve,
    Shape,
    PlaneGeometry,
    TextureLoader,
    MeshPhongMaterial,
    RepeatWrapping,
    sRGBEncoding,
    SpriteMaterial,
    Sprite,
    CanvasTexture
} from "three"
import TCanvasTexture from './TCanvasTexture'
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
    const wind_turbine_bottom = new CylinderBufferGeometry(1, 1.2, 40, 42) // 风力发电机底部
    wind_turbine_bottom.translate(0, 20, 0)
    const wind_turbine_top = new BoxBufferGeometry(2, 2, 5) // 风力发电机顶部
    wind_turbine_top.translate(0, 40, 1)
    const arc = new EllipseCurve(0, 0, 1, 1.5, 0, Math.PI / 2);
    const line = new LineCurve(new Vector2(1, -0.6, 0), new Vector2(1, 0, 0))
    var curvePath = new CurvePath();
    curvePath.curves.push(line, arc,);
    var wind_turbine_shaft = new LatheGeometry(curvePath.getPoints(30), 30);// 风力发电机转轴
    wind_turbine_shaft.rotateX(Math.PI / 2)
    wind_turbine_shaft.translate(0, 40, 4)
    const wind_turbine_base = BufferGeometryUtils.mergeBufferGeometries([wind_turbine_bottom, wind_turbine_top, wind_turbine_shaft], false);
    var material = new MeshStandardMaterial({
        color: 'white',
        side: DoubleSide
    });//材质对象
    var mesh = new Mesh(wind_turbine_base, material);//旋转网格模型对象
    scene.add(mesh)


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
    var curvePath_blade = new CurvePath();
    curvePath_blade.curves.push(line1, line2, curve, line3, line4, line5);
    var shape = new Shape(curvePath_blade.getPoints(50));

    const blade_material = new MeshStandardMaterial({
        color: 'gray',
    });//材质对象
    // const blade_group = new Group()
    const blade_arr = []
    for (let i = 0; i < 3; i++) {
        const geometry = new ExtrudeGeometry(
            shape,
            {
                amount: 0.5,//拉伸长度
                bevelEnabled: false//无倒角
            }
        );
        geometry.rotateX(-Math.PI / 10)
        geometry.rotateZ(Math.PI * 2 / 3 * i)
        blade_arr.push(geometry)
    }

    const blade_group = BufferGeometryUtils.mergeBufferGeometries(blade_arr, false);
    const blade_mesh = new Mesh(blade_group, blade_material);//旋转网格模型对象
    blade_mesh.scale.set(0.25, 0.25, 0.25)
    blade_mesh.position.y = 40
    blade_mesh.position.z = 4
    scene.add(blade_mesh)



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



    // 精灵标签
    const canvasTexture = new TCanvasTexture()
    canvasTexture.draw((ctx) => {
       
        ctx.fillStyle = '#ff9800'
        ctx.fillRect(0, 0, 100, 50);
        ctx.beginPath()
        ctx.fillStyle = '#a56200'
        ctx.fillRect(0, 0, 100, 5);
        ctx.closePath()
        ctx.fill()
        ctx.fillStyle = '#ff9800'
        ctx.beginPath();
        ctx.beginPath()
        ctx.moveTo(40,50)
        ctx.lineTo(60,50)
        ctx.lineTo(50,60)
        ctx.closePath()
        ctx.fill()
        ctx.beginPath();
        ctx.fillStyle = "white"; //文本填充颜色
        ctx.font = "bold 20px 微软雅黑"; //字体样式设置
        ctx.textBaseline = "middle"; //文本与fillText定义的纵坐标
        ctx.textAlign = "center"; //文本居中(以fillText定义的横坐标)
        ctx.fillText('1#发电机', 50, 25);
        ctx.closePath()
    }).preview()
    console.log(canvasTexture.canvas,222)
    // var img = new Image();
    // img.src = require("../../assets/grasslight-big.jpg");
    // img.onload = () => {
       
    // }


    // var texture = new TextureLoader().load(require("../../assets/grasslight-big.jpg"));
    // 创建精灵材质对象SpriteMaterial
    var spriteMaterial = new SpriteMaterial({
        // color: 0xff00ff,
        // rotation: Math.PI / 4,
        map: new CanvasTexture(canvasTexture.canvas),
    });

    var sprite = new Sprite(spriteMaterial);
    sprite.position.y = 45
    sprite.scale.set(10, 10, 1);
    scene.add(sprite);

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