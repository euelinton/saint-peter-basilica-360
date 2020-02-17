let camera, container, renderer, scene, sphereCamera

function init() {
  container = document.querySelector('#scene')

  // Create scene
  scene = new THREE.Scene()

  const fov = 70
  const aspect = container.clientWidth / container.clientHeight
  const near = 1
  const fav = 5000

  // Camera Setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, fav)
  camera.position.set(0, 400, 1000)

  // Renderer 
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(container.clientWidth, container.clientHeight)

  container.appendChild(renderer.domElement)

  // Controls
  let controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.enableZoom = false
  
  // Load 
  let urls = [
    'posx.jpg', 'negx.jpg',
    'posy.jpg', 'negy.jpg',
    'posz.jpg', 'negz.jpg',
  ]

  let loader = new THREE.CubeTextureLoader()
  scene.background = loader.load(urls)

  // Sphere Camera
  sphereCamera = new THREE.CubeCamera(1, 1000, 500)
  sphereCamera.position.set(0, 100, 0)
  scene.add(sphereCamera)

  // Sphere
  let sphereMaterial = new THREE.MeshBasicMaterial({
    envMap: sphereCamera.renderTarget
  })
  let sphereGeo = new THREE.SphereGeometry(350, 50, 50)
  let sphere = new THREE.Mesh(sphereGeo, sphereMaterial)
  sphere.position.set(0, 100, 0)
  scene.add(sphere)

  render()
}

function render() {
  renderer.render(scene, camera)
  sphereCamera.updateCubeMap(renderer, scene)
  requestAnimationFrame(render)
}

init()
