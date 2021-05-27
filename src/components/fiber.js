import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import { useGLTF } from '@react-three/drei/core/useGLTF'
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei"
import './fiber.css'


function Shoe(props) {
    const ref = useRef()
    const { nodes, materials } = useGLTF("Pokeball_v02.glb") /* shoe-draco.glb */ /* Pokeball_v02.glb */
    console.log(nodes)
    console.log(materials)
    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 5
        ref.current.rotation.x = Math.cos(t / 4) / 2
        ref.current.rotation.y = Math.sin(t / 4) / 2
        ref.current.position.y = (1 + Math.sin(t / 1.5)) / 2.5
      })
    return (
        <group ref={ref} {...props} dispose={null} >
            <mesh geometry={nodes.black.geometry}  material={materials.black} />
            <mesh geometry={nodes.red.geometry}  material={materials.red} />
            <mesh geometry={nodes.white.geometry}  material={materials.white} />
            <mesh geometry={nodes.white2.geometry}  material={materials.white} />
            <mesh geometry={nodes.white3.geometry}  material={materials.white} />
{/*             <mesh geometry={nodes.shoe.geometry} material={materials.laces} />
            <mesh geometry={nodes.shoe_1.geometry} material={materials.mesh} />
            <mesh geometry={nodes.shoe_2.geometry} material={materials.caps} />
            <mesh geometry={nodes.shoe_3.geometry} material={materials.inner} />
            <mesh geometry={nodes.shoe_4.geometry} material={materials.sole} />
            <mesh geometry={nodes.shoe_5.geometry} material={materials.stripes} />
            <mesh geometry={nodes.shoe_6.geometry} material={materials.band} />
            <mesh geometry={nodes.shoe_7.geometry} material={materials.patch} /> */}
        </group>
    )
}

export default function Fiber() {
    return (
        <div className="fiberDiv">
            <Canvas camera={{ position: [100, 100, 500], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <Suspense fallback={null}>
                    <Shoe />
                </Suspense>
                <OrbitControls /* minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} */ enableZoom={false} enablePan={false} />
            </Canvas>
        </div>
    )
}




/* function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => {
     if(hovered) mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    })
    return (
      <mesh
        {...props}
        ref={mesh}
        scale={active ? 0.5 : 1}
        onClick={(e) => setActive(!active)}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}>
        <boxGeometry args={[2.5, 2.5, 2.5]} />
        <meshStandardMaterial color={hovered ? 'blue' : 'orange'} />
      </mesh>
    )
  }
export default function Fiber() {
    return (
        <div className="fiberDiv">
            <Canvas>
    <ambientLight intensity={0.5} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
    <pointLight position={[-10, -10, -10]} />
    <Box position={[-3, 0, 0]} />
    <Box position={[3, 0, 0]} />
            </Canvas>
        </div>
    )
} */