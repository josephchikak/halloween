import { OrbitControls, PointMaterial, useTexture, Bvh, Loader} from "@react-three/drei"
import * as THREE from "three"
import { Suspense, useEffect } from "react";
import HalloweenScene from "./Components/HalloweenScene";



const Experience = () => {
    
    return(
        <>
        {/* <OrbitControls />    */}
        <Bvh>
             <HalloweenScene />
        </Bvh>
        </>  
    )
}

export default Experience


