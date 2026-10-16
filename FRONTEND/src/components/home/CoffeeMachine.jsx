import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CoffeeMachine() {
  const svgRef = useRef(null);
  const machineWrapRef = useRef(null);
  const handleRef = useRef(null);
  const gaugeNeedleRef = useRef(null);
  const knobPointerRef = useRef(null);
  const coffeeCupRef = useRef(null);
  const machineBodyRef = useRef(null);
  const streamLeftRef = useRef(null);
  const streamRightRef = useRef(null);
  const servingGroupRef = useRef(null);
  const liquidFillRef = useRef(null);
  const liquidSurfaceRef = useRef(null);
  const rippleRef = useRef(null);
  const steamGroupRef = useRef(null);
  const ambientSteamRef = useRef(null);
  const powerIndicatorRef = useRef(null);
  const coffeeIndicatorRef = useRef(null);

  const CUP_EMPTY_Y = 492;
  const CUP_FULL_Y = 432;

  const stateRef = useRef("IDLE");

  const setMachineState = (newState) => {
    stateRef.current = newState;
  };

  const idleFloatTween = useRef(null);
  const idleGaugeTween = useRef(null);
  const vibrateTween = useRef(null);
  const streamTween = useRef(null);
  const cupSteamTween = useRef(null);

  useEffect(() => {
    gsap.set(machineWrapRef.current, { opacity: 0, scale: 0.95, transformOrigin: "50% 55%" });
    gsap.set(handleRef.current, { rotate: 0, svgOrigin: "298 335" });
    gsap.set(gaugeNeedleRef.current, { rotate: 0, svgOrigin: "308 196" });
    gsap.set(knobPointerRef.current, { rotate: 0, svgOrigin: "428 196" });
    if (servingGroupRef.current) gsap.set(servingGroupRef.current, { x: 0, y: 0, svgOrigin: "310 460" });
    gsap.set([streamLeftRef.current, streamRightRef.current], { opacity: 0, scaleY: 0, transformOrigin: "50% 0%" });
    gsap.set(steamGroupRef.current, { opacity: 0 });
    gsap.set(ambientSteamRef.current, { opacity: 0 });
    gsap.set(liquidFillRef.current, { scaleY: 0, opacity: 1, svgOrigin: "310 498" });
    gsap.set(liquidSurfaceRef.current, { attr: { cy: CUP_EMPTY_Y } });
    gsap.set(rippleRef.current, { opacity: 0 });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        startIdleBreathing();
        startIdleGaugeWobble();
      },
    });

    tl.to(machineWrapRef.current, { opacity: 1, scale: 1, duration: 1.2 })
      .from(handleRef.current, { rotate: 12, svgOrigin: "298 335", duration: 0.8 }, 0.2)
      .from(gaugeNeedleRef.current, { rotate: -25, svgOrigin: "308 196", duration: 0.7 }, 0.4);

    return () => {
      if (idleFloatTween.current) idleFloatTween.current.kill();
      if (idleGaugeTween.current) idleGaugeTween.current.kill();
      if (vibrateTween.current) vibrateTween.current.kill();
      if (streamTween.current) streamTween.current.kill();
      if (cupSteamTween.current) cupSteamTween.current.kill();
    };
  }, []);

  const startIdleBreathing = () => {
    if (idleFloatTween.current) idleFloatTween.current.kill();
    idleFloatTween.current = gsap.to(machineWrapRef.current, {
      y: -6,
      duration: 3.2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  };

  const stopIdleBreathing = () => {
    if (idleFloatTween.current) {
      idleFloatTween.current.kill();
      idleFloatTween.current = null;
    }
    gsap.to(machineWrapRef.current, { y: 0, duration: 0.4, ease: "power2.out" });
  };

  const startIdleGaugeWobble = () => {
    if (idleGaugeTween.current) idleGaugeTween.current.kill();
    idleGaugeTween.current = gsap.to(gaugeNeedleRef.current, {
      rotate: 3,
      svgOrigin: "308 196",
      duration: 2.2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  };

  const stopIdleGaugeWobble = () => {
    if (idleGaugeTween.current) {
      idleGaugeTween.current.kill();
      idleGaugeTween.current = null;
    }
  };

  const handleInteraction = () => {
    if (stateRef.current === "IDLE") {
      startBrewSequence();
    } else if (stateRef.current === "FULL") {
      startEmptySequence();
    }
  };

  const startBrewSequence = () => {
    setMachineState("BREWING");
    stopIdleGaugeWobble();

    const tl = gsap.timeline({ onComplete: runBrewPhysics });
    tl.to(handleRef.current, { rotate: -34, svgOrigin: "298 335", duration: 0.45, ease: "power3.in" })
      .to(handleRef.current, { rotate: -30, svgOrigin: "298 335", duration: 0.3, ease: "elastic.out(1, 0.5)" })
      .to([powerIndicatorRef.current, coffeeIndicatorRef.current], { fill: "#c17a3e", duration: 0.3 }, "<")
      .to(gaugeNeedleRef.current, { rotate: 64, svgOrigin: "308 196", duration: 0.6, ease: "power2.inOut" }, "<")
      .to(knobPointerRef.current, { rotate: 20, svgOrigin: "428 196", duration: 0.5, ease: "power2.out" }, "<");
  };

  const runBrewPhysics = () => {
    stopIdleBreathing();

    vibrateTween.current = gsap.timeline({ repeat: -1 })
      .to(machineBodyRef.current, { x: 0.6, duration: 0.06, ease: "sine.inOut" })
      .to(machineBodyRef.current, { x: -0.6, duration: 0.06, ease: "sine.inOut" });

    gsap.set([streamLeftRef.current, streamRightRef.current], { opacity: 0, scaleY: 0.1, transformOrigin: "50% 0%" });
    streamTween.current = gsap.timeline();
    streamTween.current.to([streamLeftRef.current, streamRightRef.current], { opacity: 1, scaleY: 1, duration: 0.4, ease: "power2.out", stagger: 0.05 });
    streamTween.current.to([streamLeftRef.current, streamRightRef.current], { x: "+=1.2", duration: 0.18, ease: "sine.inOut", yoyo: true, repeat: -1 }, ">-0.1");

    fillCupPhysics();
  };

  const fillCupPhysics = () => {
    const brewDuration = 3.6;
    const fillTl = gsap.timeline({ onComplete: completeBrewSequence });

    fillTl.to(liquidFillRef.current, { scaleY: 1, duration: brewDuration, ease: "power1.inOut" }, 0);
    fillTl.to(liquidSurfaceRef.current, {
      attr: { cy: CUP_FULL_Y },
      duration: brewDuration,
      ease: "power1.inOut",
      onUpdate: function () {
        const currentCy = gsap.getProperty(liquidSurfaceRef.current, "attr", "cy");
        if (rippleRef.current) rippleRef.current.setAttribute("d", `M270 ${currentCy} q20 -3 40 0 q20 3 40 0`);
      }
    }, 0);

    fillTl.to(rippleRef.current, { opacity: 0.65, duration: 0.4 }, 0.2);
    fillTl.to(steamGroupRef.current, { opacity: 1, duration: 1, ease: "sine.out" }, brewDuration * 0.4);

    cupSteamTween.current = gsap.timeline({ repeat: -1 });
    cupSteamTween.current.to(".steam-puff", {
      y: -12, opacity: 0, duration: 2.2, ease: "sine.out", stagger: 0.3, transformOrigin: "50% 100%"
    }).set(".steam-puff", { y: 0, opacity: 0.5 });
  };

  const completeBrewSequence = () => {
    if (vibrateTween.current) vibrateTween.current.kill();
    gsap.to(machineBodyRef.current, { x: 0, duration: 0.3 });
    if (streamTween.current) streamTween.current.kill();

    const tl = gsap.timeline({
      onComplete: () => {
        setMachineState("FULL");
        startIdleBreathing();
      }
    });

    tl.to([streamLeftRef.current, streamRightRef.current], { scaleY: 0.15, opacity: 0, duration: 0.5, ease: "power2.in" })
      .to(gaugeNeedleRef.current, { rotate: 4, svgOrigin: "308 196", duration: 0.6, ease: "power2.out" }, "<")
      .to(knobPointerRef.current, { rotate: 0, svgOrigin: "428 196", duration: 0.5 }, "<");
  };

  const startEmptySequence = () => {
    setMachineState("EMPTYING");
    stopIdleBreathing();
    stopIdleGaugeWobble();

    if (cupSteamTween.current) cupSteamTween.current.kill();

    const emptyDuration = 2.2;
    const tl = gsap.timeline({ onComplete: resetSequence });

    tl.to(steamGroupRef.current, { opacity: 0, duration: 0.4 }, 0);
    if (servingGroupRef.current) {
      tl.to(servingGroupRef.current, { x: 60, y: 6, duration: emptyDuration * 0.45, ease: "power2.inOut" }, 0);
    }

    tl.to(liquidFillRef.current, { scaleY: 0, duration: emptyDuration, ease: "power1.inOut" }, 0.1);
    tl.to(liquidSurfaceRef.current, {
      attr: { cy: CUP_EMPTY_Y },
      duration: emptyDuration,
      ease: "power1.inOut",
      onUpdate: function () {
        const currentCy = gsap.getProperty(liquidSurfaceRef.current, "attr", "cy");
        if (rippleRef.current) rippleRef.current.setAttribute("d", `M270 ${currentCy} q20 -3 40 0 q20 3 40 0`);
      }
    }, 0.1);
    tl.to(rippleRef.current, { opacity: 0, duration: emptyDuration * 0.4 }, 0.1);

    if (servingGroupRef.current) {
      tl.to(servingGroupRef.current, { x: 0, y: 0, duration: emptyDuration * 0.55, ease: "power2.out" }, emptyDuration * 0.45);
    }
  };

  const resetSequence = () => {
    setMachineState("RESETTING");

    const tl = gsap.timeline({
      onComplete: () => {
        setMachineState("IDLE");
        startIdleBreathing();
        startIdleGaugeWobble();
      }
    });

    tl.to(handleRef.current, { rotate: 0, svgOrigin: "298 335", duration: 0.7, ease: "elastic.out(1, 0.6)" })
      .to([powerIndicatorRef.current, coffeeIndicatorRef.current], { fill: "#cabb97", duration: 0.4 }, "<0.1")
      .set(liquidFillRef.current, { opacity: 1 })
      .to(gaugeNeedleRef.current, { rotate: 0, svgOrigin: "308 196", duration: 0.5, ease: "power2.out" }, "<");
  };

  return (
    <div className="hero-machine w-full relative" ref={machineWrapRef}>
      <svg
        ref={svgRef}
        id="coffee-machine"
        viewBox="0 0 640 660"
        className="w-full h-auto drop-shadow-2xl overflow-visible select-none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Interactive Espresso Machine"
      >
        <defs>
          <linearGradient id="creamGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f4ecdb" />
            <stop offset="100%" stopColor="#e6dabf" />
          </linearGradient>
          <linearGradient id="blackGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a2622" />
            <stop offset="100%" stopColor="#141210" />
          </linearGradient>
          <linearGradient id="metalGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#dfe3e6" />
            <stop offset="45%" stopColor="#9aa2a8" />
            <stop offset="100%" stopColor="#5b6166" />
          </linearGradient>
          <linearGradient id="cupGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fffdf8" />
            <stop offset="100%" stopColor="#efe6d4" />
          </linearGradient>
          <linearGradient id="cupGlassGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
            <stop offset="45%" stopColor="#f8efe0" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#e6dabf" stopOpacity="0.45" />
          </linearGradient>
          <radialGradient id="coffeeGrad" cx="50%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#7a4a26" />
            <stop offset="100%" stopColor="#3c210f" />
          </radialGradient>
          <linearGradient id="cremaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d4a85c" />
            <stop offset="40%" stopColor="#ab6b39" />
            <stop offset="100%" stopColor="#7a4422" />
          </linearGradient>
          <linearGradient id="knobGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a352f" />
            <stop offset="100%" stopColor="#0f0d0b" />
          </linearGradient>
          <clipPath id="cupClip">
            <path d="M256 424 h108 v18 c0 30 -24 50 -54 50 c-30 0 -54 -20 -54 -50 z" />
          </clipPath>
        </defs>

        <g id="drip-tray">
          <rect x="150" y="486" width="340" height="56" rx="10" fill="url(#blackGrad)" />
          <rect x="150" y="486" width="340" height="14" rx="7" fill="#3a3530" />
          <g stroke="#050403" strokeWidth="4" strokeLinecap="round" opacity="0.7">
            <line x1="178" y1="512" x2="196" y2="530" />
            <line x1="222" y1="512" x2="240" y2="530" />
            <line x1="266" y1="512" x2="284" y2="530" />
            <line x1="310" y1="512" x2="328" y2="530" />
            <line x1="354" y1="512" x2="372" y2="530" />
            <line x1="398" y1="512" x2="416" y2="530" />
            <line x1="442" y1="512" x2="460" y2="530" />
          </g>
        </g>

        <g id="machine-base">
          <rect x="120" y="536" width="400" height="46" rx="12" fill="url(#creamGrad)" />
          <rect x="150" y="578" width="18" height="12" rx="3" fill="#171412" />
          <rect x="472" y="578" width="18" height="12" rx="3" fill="#171412" />
        </g>

        <ellipse id="machine-floor-shadow" cx="320" cy="600" rx="230" ry="18" fill="#000000" opacity="0.4" />

        <g id="machine-body" ref={machineBodyRef}>
          <rect x="130" y="272" width="380" height="270" rx="18" fill="url(#blackGrad)" />
          <rect x="108" y="96" width="424" height="196" rx="26" fill="url(#creamGrad)" />
          <rect x="108" y="96" width="424" height="40" rx="20" fill="#ffffff" opacity="0.35" />
          <rect x="108" y="270" width="424" height="6" fill="#00000022" />
        </g>

        <g id="top-cup-left">
          <path d="M198 44 h64 v40 c0 16 -14 28 -32 28 c-18 0 -32 -12 -32 -28 z" fill="url(#cupGrad)" stroke="#d8cbac" strokeWidth="2" />
          <path d="M262 56 c16 -4 26 6 26 18 c0 12 -10 20 -26 18" fill="none" stroke="#d8cbac" strokeWidth="6" strokeLinecap="round" />
        </g>
        <g id="top-cup-right">
          <path d="M340 44 h64 v40 c0 16 -14 28 -32 28 c-18 0 -32 -12 -32 -28 z" fill="url(#cupGrad)" stroke="#d8cbac" strokeWidth="2" />
          <path d="M404 56 c16 -4 26 6 26 18 c0 12 -10 20 -26 18" fill="none" stroke="#d8cbac" strokeWidth="6" strokeLinecap="round" />
        </g>
        <rect x="185" y="90" width="270" height="10" rx="5" fill="#c9bb98" />

        <g id="control-panel">
          <g id="power-button">
            <circle cx="198" cy="152" r="17" fill="#f7f1e4" stroke="#c9bb98" strokeWidth="2" />
            <path d="M198 143 v9" stroke="#3a3128" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="198" cy="152" r="6.4" fill="none" stroke="#3a3128" strokeWidth="2.2" />
            <circle ref={powerIndicatorRef} id="power-indicator" cx="238" cy="152" r="4.5" fill="#cabb97" />
          </g>
          <g id="coffee-button">
            <circle cx="198" cy="198" r="17" fill="#f7f1e4" stroke="#c9bb98" strokeWidth="2" />
            <path d="M191 194 h14 v9 a7 7 0 0 1 -14 0 z" fill="none" stroke="#3a3128" strokeWidth="2.2" />
            <path d="M205 196 c5 0 5 7 0 7" fill="none" stroke="#3a3128" strokeWidth="2" />
            <circle ref={coffeeIndicatorRef} id="coffee-indicator" cx="238" cy="198" r="4.5" fill="#cabb97" />
          </g>
          <g id="steam-button">
            <circle cx="198" cy="244" r="17" fill="#f7f1e4" stroke="#c9bb98" strokeWidth="2" />
            <path d="M192 250 q3 -6 0 -10 M198 250 q3 -8 0 -13 M204 250 q3 -6 0 -10" fill="none" stroke="#3a3128" strokeWidth="2" strokeLinecap="round" />
            <circle id="steam-indicator" cx="238" cy="244" r="4.5" fill="#cabb97" />
          </g>
        </g>

        <g id="pressure-gauge">
          <circle cx="308" cy="196" r="56" fill="#efe6d1" stroke="#2a241c" strokeWidth="4" />
          <circle cx="308" cy="196" r="47" fill="#f7f2e6" stroke="#c9bb98" strokeWidth="1.5" />
          <g stroke="#5b5140" strokeWidth="1.6">
            <line x1="308" y1="153" x2="308" y2="160" />
            <line x1="265" y1="196" x2="272" y2="196" />
            <line x1="308" y1="239" x2="308" y2="232" />
            <line x1="278" y1="166" x2="283" y2="171" />
            <line x1="338" y1="166" x2="333" y2="171" />
          </g>
          <line ref={gaugeNeedleRef} id="gauge-needle" x1="308" y1="196" x2="330" y2="178" stroke="#b4402c" strokeWidth="3" strokeLinecap="round" />
          <circle cx="308" cy="196" r="5" fill="#2a241c" />
        </g>

        <g id="main-knob">
          <circle cx="428" cy="196" r="40" fill="url(#knobGrad)" stroke="#000" strokeWidth="1" />
          <line ref={knobPointerRef} id="knob-pointer" x1="428" y1="196" x2="428" y2="164" stroke="#e7dcc3" strokeWidth="3" strokeLinecap="round" />
        </g>

        <g id="portafilter" className="cursor-pointer" onClick={handleInteraction}>
          <rect x="256" y="300" width="108" height="22" rx="6" fill="url(#metalGrad)" />
          <path d="M270 320 h80 l-14 34 a26 26 0 0 1 -52 0 z" fill="url(#metalGrad)" />
          <ellipse cx="310" cy="322" rx="42" ry="8" fill="#c9cfd3" />

          <g ref={handleRef} id="portafilter-handle" className="cursor-pointer">
            <rect x="120" y="326" width="192" height="20" rx="10" fill="#1c1916" />
            <rect x="120" y="328" width="192" height="6" rx="3" fill="#3d3228" />
            <circle cx="132" cy="336" r="13" fill="#0a0804" stroke="#5a4d42" strokeWidth="1.5" />
          </g>
        </g>

        <g id="coffee-outlet">
          <path d="M296 356 l4 16 h20 l4 -16 z" fill="#2a251f" />
        </g>
        <path ref={streamLeftRef} id="coffee-stream-left" d="M303 372 C 302 392, 302 402, 302 420" fill="none" stroke="#6b3a1c" strokeWidth="4" strokeLinecap="round" opacity="0" />
        <path ref={streamRightRef} id="coffee-stream-right" d="M317 372 C 318 392, 318 402, 318 420" fill="none" stroke="#6b3a1c" strokeWidth="4" strokeLinecap="round" opacity="0" />

        <g id="serving-group" ref={servingGroupRef}>
          <ellipse id="cup-saucer" cx="310" cy="496" rx="76" ry="9" fill="#e8dcc8" stroke="#c9bb98" strokeWidth="1.8" />

          <g ref={coffeeCupRef} id="coffee-cup" className="cursor-pointer" onClick={handleInteraction}>
            <path d="M250 420 h120 v22 c0 34 -27 56 -60 56 c-33 0 -60 -22 -60 -56 z" fill="#1c140e" opacity="0.3" />

            <g id="coffee-liquid" clipPath="url(#cupClip)">
              <rect ref={liquidFillRef} id="coffee-liquid-fill" x="256" y="432" width="108" height="66" fill="url(#coffeeGrad)" />
              <ellipse ref={liquidSurfaceRef} id="coffee-liquid-surface" cx="310" cy="492" rx="52" ry="7" fill="url(#cremaGrad)" />
              <path ref={rippleRef} id="coffee-ripple" d="M270 492 q20 -3 40 0 q20 3 40 0" fill="none" stroke="#d4a85c" strokeWidth="1.6" opacity="0.6" />
            </g>

            <path d="M250 420 h120 v22 c0 34 -27 56 -60 56 c-33 0 -60 -22 -60 -56 z" fill="url(#cupGlassGrad)" stroke="#d8cbac" strokeWidth="2" />
            <path d="M370 432 c20 -4 32 8 32 22 c0 14 -12 24 -32 22" fill="none" stroke="#d8cbac" strokeWidth="7" strokeLinecap="round" />
            <ellipse cx="310" cy="422" rx="60" ry="10" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.7" />
          </g>
        </g>

        <g ref={steamGroupRef} id="steam" opacity="0">
          <path className="steam-puff" d="M296 410 C 292 396, 302 392, 298 378 C 295 368, 302 362, 300 352" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" opacity="0.55" />
          <path className="steam-puff" d="M312 412 C 308 398, 318 392, 314 378 C 311 366, 320 360, 317 348" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" opacity="0.45" />
          <path className="steam-puff" d="M326 410 C 322 398, 331 393, 327 380 C 325 370, 332 364, 329 354" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
        </g>

        <g ref={ambientSteamRef} id="ambient-steam" opacity="0">
          <path d="M310 350 C 305 330, 316 322, 311 302" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" opacity="0.35" />
        </g>
      </svg>
    </div>
  );
}
