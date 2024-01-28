import React, { Component } from "react";
import { useLoader } from "@react-three/fiber";
import { AnimationAction, Group } from "three";
import { GameObject, AnimationComponents } from "../../BaseComponents"; // Import the abstract classes
import { useGLTF } from "@react-three/drei";

export class Beaker extends GameObject {
    animationComponents : AnimationComponents;
    // Implementing GameObject
    position: { x: number; y: number; z: number };
    rotation: { x: number; y: number; z: number };
    scale: { x: number; y: number; z: number };
    // Implementing AnimationComponents
    animations: Array<AnimationAction>;
    animationDelay: number;

    beakerScene: Group | null;

    constructor() {
        super();
        // Initialize GameObject and AnimationComponents properties
        this.position = { x: 0, y: 0, z: 0 };
        this.rotation = { x: 0, y: 0, z: 0 };
        this.scale = { x: 10, y: 10, z: 10 };
        this.animations = [];
        this.animationDelay = 0;
        this.animationComponents = new AnimationComponents();
        this.beakerScene = null;
    }

    componentDidMount() {
      
        this.beakerScene = useGLTF("./Beaker.gltf").scene.clone();
    }

    // Implementing abstract methods from GameObject
    onClick() {
        // Define click behavior
    }

    render() {
        if (!this.beakerScene) return null;

        // Implement custom rendering logic
        return (
            <primitive
                // {...this.props}
                object={this.beakerScene}
                position={[this.position.x, this.position.y, this.position.z]}
                rotation={[this.rotation.x, this.rotation.y, this.rotation.z]}
                scale={[this.scale.x, this.scale.y, this.scale.z]}
                opacity={0.8}
            />
        );
    }
}

useGLTF.preload("./Beaker.gltf");