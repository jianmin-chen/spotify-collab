import { useState, useRef, useEffect } from "react";
import p5 from "p5";
import * as Tone from "tone";

export default function Visualizer() {
    const canvasRef = useRef(null);
    const [processing, setProcessing] = useState(null);
    const meter = new Tone.Meter();
    const analyzer = new Tone.Analyser("waveform", 128);

    const s = sketch => {
        sketch.setup = () => {
            sketch.createCanvas(window.innerWidth, window.innerHeight);
            sketch.background(0);
        };

        sketch.draw = () => {
            const dim = Math.min(window.innerWidth, window.innerHeight);
            sketch.background(0);
            sketch.strokeWeight(dim * 0.0025);
            sketch.stroke(255);
            sketch.noFill();
            const values = analyzer.getValue();
            sketch.beginShape();
            for (let i = 0; i < values.length; i++) {
                const amplitude = values[i];
                const x = sketch.map(
                    i,
                    0,
                    values.length - 1,
                    0,
                    window.innerWidth
                );
                const y =
                    window.innerHeight / 2 + amplitude * window.innerHeight;
                sketch.vertex(x, y);
            }
            sketch.endShape();
        };
    };

    useEffect(() => {
        const load = async () => {
            if (canvasRef.current) {
                setProcessing(new p5(s, canvasRef.current));
                Tone.Destination.volume.value = 0.2;
                const mic = new Tone.UserMedia();
                await mic.open();
                console.log("Mic connected: ", mic);
                mic.connect(meter);
                mic.connect(analyzer);
            }
        };
        load();
    }, []);

    return (
        <div
            className="bg-black w-full h-full fixed top-0 left-0 -z-[1]"
            ref={canvasRef}
        />
    );
}
