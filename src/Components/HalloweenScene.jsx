import { OrbitControls, useFBO , useGLTF, useAnimations, useTexture, Stats, Stars, Float, meshBounds, Text3D, Loader, Environment, Clouds, Cloud} from '@react-three/drei'
import { Canvas, useFrame, extend, createPortal, useLoader, useThree,} from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import pumpkin from './model/pumpkin2.glb'
import ghost from './model/ghost2.glb'
import {Suspense, useEffect, useMemo, useRef , useState} from "react";
import * as THREE from "three";
import vertexShader from "../Shaders/Particles/vertexShader.glsl";
import fragmentShader from "../Shaders/Particles/fragmentShader.glsl"; 
import pumpTexture from './textures/pmbaked.jpg'
import { gsap } from "gsap";
import { useControls } from "leva";
import halloweenFont from './fonts/CF Halloween_Regular.json'
import matcapTexture from './textures/9CC338_4E671A_799F27_8CAC2C-preview.png'




const HalloweenScene = () => {

  const fog = new THREE.Fog('#050202',5,18)

  const [ghostSound] = useState(() => new Audio('./audio/boo-and-laugh-7060.mp3'))
  
  

  const { nodes, } = useGLTF(pumpkin)
  const ghosts = useGLTF(ghost)

  const pumpkinTexture = useTexture(pumpTexture)
  const matcapT = useTexture(matcapTexture)
  pumpkinTexture.flipY = false

    //create reference to points 
    const pumpkinRef = useRef()
    const ghostRef = useRef()
    const ghostRef2 = useRef()
    const ghostRef3 = useRef()
    const ghostRef4 = useRef()

    const scene = new THREE.Scene();
  

    const uniforms = useMemo(() => ({
        uPositions: {
          value: null,
        },
        uTime:{value : 0.0}
      }), [])


      const ghostLen = ghosts.scene.children.length
      const ghostPos = new Float32Array(3)
      const ghostPos1 = new Float32Array(3)
      const ghostPos2 = new Float32Array(3)
      const ghostPos3 = new Float32Array(3)


    
       

   

      for(let i= 0; i< ghostLen * 3; i++){

        let rand = (Math.random() - 0.5) * 5

        let x = rand +1
        let y = rand +1
        let z = rand +1

        let x1 = rand +2
        let y1 = rand +2
        let z1 = rand  +2

        let x2 = rand +3
        let y2= rand +3
        let z2= rand +3

        let x3 = rand +4
        let y3= rand+4
        let z3 = rand +4
 
        ghostPos[i] = x
        ghostPos[i+ 1] = y
        ghostPos[i + 2] = z

        ghostPos1[i ] = x1 - 2 
        ghostPos1[i + 1] = y1 - 2
        ghostPos1[i + 2] = z1 - 2

        ghostPos2[i ] = x2 - 1
        ghostPos2[i+ 1] = y2 -1
        ghostPos2[i + 2] = z2 -1

        ghostPos3[i ] = x3 - 2
        ghostPos3[i+1 ] = y3 -2
        ghostPos3[i + 2] = z3 -2

      }

      // let time = 0

      const scaleEnter = (obj) =>{

        ghostSound.currentTime = 0
        ghostSound.play()
        // console.log(obj)
        gsap.to(obj.scale, {
          duration: 1,
          x:2,
          y:2,
          z:2,
          ease: 'power1.out'
        })
       
      }

      const scaleLeave = (obj) =>{
        gsap.to(obj.scale, {
          duration: 1,
          x:1,
          y:1,
          z:1,
          ease: 'power1.out'
        })
      }

 
  

    useFrame((state, delta) => {

      const {gl, clock, scene, camera, pointer } = state;

      uniforms.uTime.value = clock.elapsedTime

      scene.fog = fog

     pumpkinRef.current.rotation.x = -pointer.y/4
     pumpkinRef.current.rotation.y = pointer.x

    ghostRef.current.position.y +=  Math.cos(clock.elapsedTime ) *0.01 
    ghostRef.current.position.x += Math.cos(clock.elapsedTime)  * 0.01
    ghostRef.current.position.z += Math.sin(clock.elapsedTime) *0.01

    ghostRef2.current.position.y += Math.sin(clock.elapsedTime ) *  0.02
    ghostRef2.current.position.x += Math.sin(clock.elapsedTime) * 0.01
    ghostRef2.current.position.z += Math.sin(clock.elapsedTime) * 0.03

    ghostRef3.current.position.y += Math.sin(clock.elapsedTime ) * 0.02
    // ghostRef3.current.position.x += Math.sin(clock.elapsedTime) * 0.02
    ghostRef3.current.position.z += Math.cos(clock.elapsedTime) * 0.01
    // ghostRef3.current.rotation.z += Math.cos(clock.elapsedTime) * 0.01
    ghostRef3.current.rotation.y -= Math.sin(clock.elapsedTime) * 0.01

    
    ghostRef4.current.position.y += Math.cos(clock.elapsedTime ) * 0.02
    ghostRef4.current.position.x += Math.sin(clock.elapsedTime) * 0.005
    // ghostRef4.current.position.z += Math.sin(clock.elapsedTime) * 0.05
    ghostRef4.current.rotation.y -= Math.cos(clock.elapsedTime) * 0.01
    //   

    gl.setClearColor('#050202')

    clouds.current.position.y = Math.sin(clock.elapsedTime ) * 0.3
    })

    const clouds = useRef();

    const pointLight = new THREE.PointLight(0xff0000, 1, 100)
    pointLight.position.set(0,0,2)
    scene.add(pointLight)

    const pointLightHelper = new THREE.PointLightHelper( pointLight, 1 );
    scene.add( pointLightHelper );
  
  return (
    <>
    <Suspense fallback={null}>

    <Clouds material={THREE.MeshBasicMaterial} ref={clouds}>
        <Cloud segments={10} bounds={[10, 2, 0]} volume={5} color="#b8998c" position={[0,0,-4]} fade={60} />
    </Clouds>

    <ambientLight intensity={0.5} color={'#eb5534'}/>
    <directionalLight color={'red'} position={[4,5,-2]} intensity={1}/>

    
      <Float
      speed={1} // Animation speed, defaults to 1
      rotationIntensity={0.6} // XYZ rotation intensity, defaults to 1
      floatIntensity={0.7} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
      floatingRange={[0, 0.5]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
      <pointLight position={[-0.092, 0.4, -0.252]} color={'#FFFEE5'} intensity={5}/>
      {/* <pointLight position={[5, 6, 0]} color={'#FFFEE5'} intensity={5}/> */}


          {/* pumpkin */}
          <group ref={pumpkinRef}  dispose={null} scale={0.7}>
            <group name="Scene">
              <mesh
                name="pumpkin2"
                castShadow
                receiveShadow
                geometry={nodes.pumpkin2.geometry}
                position={[-0.092, 0.8, -0.252]}
              >
                <meshStandardMaterial map={pumpkinTexture} side={THREE.DoubleSide} />
              </mesh>
            </group>
          </group>
      

     <Text3D font={halloweenFont} position={[-2,2,0]}
      size={0.6}
     >
          HAHAAHA
          <meshMatcapMaterial matcap={matcapT}/>
     </Text3D>

     </Float>


    {/* floor */}
    <mesh position={[0,-5,-10]} 
    // rotation-x={Math.PI * 0.5} 
    scale={1.5}>
     <boxGeometry  args={[2, 2, 2, 64,64,64]}/>
     <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        side={THREE.DoubleSide}
        uniforms={uniforms}
     />
    </mesh>



    {/* ghost */}

    <group raycast={meshBounds} dispose={null}>
    <group name="Scene">
        <group 
        ref={ghostRef}
          name="ghost001"
          position={[-4.63, 0.488, -3.019]}
          rotation={[0, 0.609, 0]}
          onPointerEnter={() => scaleEnter(ghostRef.current)}
          onPointerLeave={() => scaleLeave(ghostRef.current)}
        >
          <mesh
            name="Cube003"
            castShadow
            receiveShadow
            geometry={ghosts.nodes.Cube003.geometry}
            material={ghosts.materials["Material.005"]}
          />
          <mesh
            name="Cube003_1"
            castShadow
            receiveShadow
            geometry={ghosts.nodes.Cube003_1.geometry}
            material={ghosts.materials["Material.004"]}
          />
        </group>
        <group
        ref={ghostRef2}
        // raycast={meshBounds}
        onPointerEnter={() => scaleEnter(ghostRef2.current)}
        onPointerLeave={() => scaleLeave(ghostRef2.current)}
          name="ghost003"
          position={[4.095, -3.688, -4.236]}
          rotation={[0.03, -1.054, 0.025]}
        >
          <mesh
            name="Cube010"
            castShadow
            receiveShadow
            geometry={ghosts.nodes.Cube010.geometry}
            material={ghosts.materials["Material.005"]}
          />
          <mesh
            name="Cube010_1"
            castShadow
            receiveShadow
            geometry={ghosts.nodes.Cube010_1.geometry}
            material={ghosts.materials["Material.004"]}
          />
        </group>
        <group
        ref={ghostRef3}
        // raycast={meshBounds}
          onPointerEnter={() => scaleEnter(ghostRef3.current)}
          onPointerLeave={() => scaleLeave(ghostRef3.current)}
          name="ghost004"
          position={[3.659, 0.368, 0.83]}
          rotation={[Math.PI, -1.337, Math.PI]}
        >
          <mesh
            name="Cube011"
            castShadow
            receiveShadow
            geometry={ghosts.nodes.Cube011.geometry}
            material={ghosts.materials["Material.005"]}
          />
          <mesh
            name="Cube011_1"
            castShadow
            receiveShadow
            geometry={ghosts.nodes.Cube011_1.geometry}
            material={ghosts.materials["Material.004"]}
          />
        </group>
        <group
        ref={ghostRef4}
        // raycast={meshBounds}
          onPointerEnter={() => scaleEnter(ghostRef4.current)}
          onPointerLeave={() => scaleLeave(ghostRef4.current)}
          name="ghost007"
          position={[-5.669, -2.626, -4.523]}
          rotation={[0, 0.257, 0]}
        >
          <mesh
            name="Cube015"
            castShadow
            receiveShadow
            geometry={ghosts.nodes.Cube015.geometry}
            material={ghosts.materials["Material.005"]}
          />
          <mesh
            name="Cube015_1"
            castShadow
            receiveShadow
            geometry={ghosts.nodes.Cube015_1.geometry}
            material={ghosts.materials["Material.004"]}
          />
        </group>
      </group>
    </group>
    </Suspense>
    {/* <Loader/> */}


    {/* <Environment preset="sunset" /> */}


    </>
  )
}

useGLTF.preload(pumpkin);

export default HalloweenScene