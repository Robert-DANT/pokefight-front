import React, { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei/core/useGLTF'
import { OrbitControls } from "@react-three/drei"
import './fiber.css'


function Pokeball(props) {
    const mesh = useRef()
    const { nodes, materials } = useGLTF("/pokeball4.gltf")
    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        mesh.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 1
        mesh.current.rotation.x = -(Math.cos(t / 4)) / 0.5
        mesh.current.rotation.y = -(Math.sin(t / 4)) / 0.5
        mesh.current.position.y = (1 + Math.sin(t / 1.5)) / 3
      })

    return (
        <group ref={mesh} {...props} dispose={null}>
            <group scale={[0.8, 0.8, 0.8]}>
            <mesh geometry={nodes.pin_1.geometry} material={materials.white1} />
            <mesh geometry={nodes.pin_2.geometry} material={materials.black} />
            <mesh geometry={nodes.pin_3.geometry} material={materials.white2} />
            <mesh geometry={nodes.pin_4.geometry} material={materials.white3} />
            <mesh geometry={nodes.pin_5.geometry} material={materials.red} />
            </group>
        </group>
    )
}
// Lights
function KeyLight({ brightness, color }) {
    return (
      <rectAreaLight
        width={3}
        height={3}
        color={color}
        intensity={brightness}
        position={[-2, 0, 5]}
        lookAt={[0, 0, 0]}
        penumbra={1}
        castShadow
      />
    );
  }
  function FillLight({ brightness, color }) {
    return (
      <rectAreaLight
        width={3}
        height={3}
        intensity={brightness}
        color={color}
        position={[2, 1, 4]}
        lookAt={[0, 0, 0]}
        penumbra={2}
        castShadow
      />
    );
  }
  
  function RimLight({ brightness, color }) {
    return (
      <rectAreaLight
        width={2}
        height={2}
        intensity={brightness}
        color={color}
        position={[1, 4, -2]}
        rotation={[0, 180, 0]}
        castShadow
      />
    );
  }

export default function Fiber({position}) {
    return (
        <div className="fiberDiv">
            <Canvas camera={{ position: [0,0,4], fov: 50 }}>
             <KeyLight brightness={5.6} color={"#ffc9f9"} />
        <FillLight brightness={2.6} color={"#bdefff"} />
        <RimLight brightness={54} color={"#fff"} />
                <ambientLight intensity={0.5} />
                <Suspense fallback={null}>
                    <Pokeball />
                </Suspense>
                <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} />
            </Canvas>
        </div>
    )
}