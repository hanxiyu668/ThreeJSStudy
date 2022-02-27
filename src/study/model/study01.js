import {
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    PCFSoftShadowMap,
    Mesh,
    SphereGeometry,
    MeshBasicMaterial,
    OrbitControls,
    MOUSE,
    CameraHelper
} from "three"
const useStudy = (dom) => {
    const renderer = new WebGLRenderer({
        antialias: true   // 开启抗锯齿
    })
    renderer.shadowMap.enabled = true  // 开启阴影
    renderer.shadowMap.type = PCFSoftShadowMap;

    const scene = new Scene()

    const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 2500;

    const cameraPerspective = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    const cameraPerspectiveHelper = new CameraHelper(cameraPerspective);
    scene.add(cameraPerspective)
    scene.add(cameraPerspectiveHelper);

    renderer.setSize(dom.offsetWidth, dom.offsetHeight, true)



    // 场景物体
    const mesh2 = new Mesh(
        new SphereGeometry(30, 16, 8),
        new MeshBasicMaterial({ color: "yellow", wireframe: true })
    );
    scene.add(mesh2);

    // 此处可以通过一个mesh add新mesh向场景添加物体
    const mesh3 = new Mesh(
        new SphereGeometry(30, 16, 8),
        new MeshBasicMaterial({ color: "blue", wireframe: true })
    );
    mesh3.position.x = 100;
    scene.add(mesh3);

    const mesh1 = new Mesh(
        new SphereGeometry(30, 16, 8),
        new MeshBasicMaterial({ color: "red", wireframe: true })
    );
    mesh1.position.x = -100;
    scene.add(mesh1);

    // visible可以隐藏物体
    // mesh3.visible = false
    cameraPerspective.position.z = 200
    // cameraPerspective.lookAt(mesh1.position);


    // 初始orbitControls
    const orbitControls = new OrbitControls(camera, renderer.domElement)
    orbitControls.mouseButtons = {
        LEFT: null,
        MIDDLE: MOUSE.DOLLY,
        RIGHT: MOUSE.ROTATE
    }

    function animate() {
        orbitControls.update()
        requestAnimationFrame(animate);
        render()
    }
    animate()
    let active = 0
    console.log(mesh2.position.x)
    function render() {
        if (active === 1) {
            cameraPerspective.position.z = 100
            if (cameraPerspective.position.x > mesh1.position.x) {
                cameraPerspective.position.x -= 10
            }
        } else if (active === 2) {
            cameraPerspective.position.z = 100
            if (cameraPerspective.position.x > mesh2.position.x) {
                cameraPerspective.position.x -= 10
            }
        } else if (active === 3) {
            cameraPerspective.position.z = 100
            if (cameraPerspective.position.x < mesh3.position.x) {
                cameraPerspective.position.x += 10
            }
        }
        renderer.render(scene, cameraPerspective);
    }
    dom.appendChild(renderer.domElement)

    const changeCamara = (index) => {
        active = index
    }
    return {
        changeCamara
    }

}
export default useStudy