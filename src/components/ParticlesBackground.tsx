"use client";

import { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function ParticlesBackground() {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        // console.log(container);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            className="absolute inset-0 -z-0"
            options={{
                fullScreen: { enable: false },
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onClick: { enable: false, mode: "push" },
                        onHover: { enable: true, mode: "repulse" },
                        resize: true,
                    },
                    modes: {
                        push: { quantity: 4 },
                        repulse: { distance: 100, duration: 0.4 },
                    },
                },
                particles: {
                    color: { value: "#ffffff" },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: true,
                        opacity: 0.3,
                        width: 1,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: { default: "bounce" },
                        random: false,
                        speed: 1,
                        straight: false,
                    },
                    number: {
                        density: { enable: true, area: 800 },
                        value: 60,
                    },
                    opacity: { value: 0.3 },
                    shape: { type: "circle" },
                    size: { value: { min: 1, max: 3 } },
                },
                detectRetina: true,
            }}
        />
    );
}
