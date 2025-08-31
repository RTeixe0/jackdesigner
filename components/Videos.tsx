"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";

const DEFAULT_IDS = ["v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9"];

type Props = {
  ids?: string[];
  maxHeight?: string; // ex: "36vh"
  maxWidth?: string; // ex: "min(92vw, 880px)"
  peekScale?: number; // escala dos vizinhos
  peekOpacity?: number; // opacidade dos vizinhos
  peekBlurPx?: number; // blur dos vizinhos
};

export default function Videos({
  ids,
  maxHeight = "min(82vw, 400px)",
  maxWidth = "min(92vw, 880px)",
  peekScale = 0.8, // menos diferença de tamanho
  peekOpacity = 0.5, // vizinhos um pouco mais visíveis
  peekBlurPx = 1, // leve desfoque
}: Props) {
  const items = useMemo(() => (ids && ids.length ? ids : DEFAULT_IDS), [ids]);

  const [emblaRef, embla] = useEmblaCarousel({
    loop: true,
    align: "center",
    inViewThreshold: 0.6,
  });

  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const setVideoRef = (el: HTMLVideoElement | null, i: number) => {
    if (!el) return;
    videoRefs.current[i] = el;
    el.playbackRate = 0.75;
    el.muted = true;
    el.playsInline = true;
  };

  const [selected, setSelected] = useState(0);

  const playOnlySelected = useCallback(
    (api?: EmblaCarouselType) => {
      const e = api ?? embla;
      if (!e) return;
      const idx = e.selectedScrollSnap();
      setSelected(idx);

      videoRefs.current.forEach((v, i) => {
        if (!v) return;
        v.playbackRate = 0.75;
        if (i === idx) {
          try {
            v.currentTime = 0;
          } catch {}
          const p = v.play();
          if (p && typeof p.catch === "function") p.catch(() => {});
        } else {
          v.pause();
        }
      });
    },
    [embla]
  );

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => playOnlySelected(embla);
    embla.on("select", onSelect);
    embla.on("reInit", onSelect);
    onSelect();
  }, [embla, playOnlySelected]);

  const handleEnded = (i: number) => {
    if (embla && i === selected) embla.scrollNext();
  };

  const Sources = ({ id }: { id: string }) => (
    <>
      <source src={`/portfolio/${id}.webm`} type="video/webm" />
      <source src={`/portfolio/${id}.mp4`} type="video/mp4" />
    </>
  );

  return (
    <section id="videos" className="max-w-6xl mx-auto px-4 mt-10">

      {/* Viewport */}
      <div ref={emblaRef} className="overflow-hidden">
        {/* Track - MENOR GAP e MENOR PADDING lateral */}
        <div className="flex gap-2 md:gap-3 px-2 md:px-4">
          {items.map((id, i) => {
            const isCenter = i === selected;
            return (
              <div
                key={id}
                className="
                  flex-[0_0_60%] sm:flex-[0_0_50%] md:flex-[0_0_40%] lg:flex-[0_0_40%]
                "
              >
                {/* diretamente o vídeo: sem wrapper, sem borda, sem sombra */}
                <video
                  ref={(el) => setVideoRef(el, i)}
                  onEnded={() => handleEnded(i)}
                  onClick={() => {
                    const v = videoRefs.current[i];
                    if (!v) return;
                    if (v.paused) {
                      const p = v.play();
                      if (p && typeof p.catch === "function") p.catch(() => {});
                    } else {
                      v.pause();
                    }
                  }}
                  className="block rounded-xl mx-auto transition-all duration-250 ease-out"
                  style={{
                    maxHeight,
                    maxWidth,
                    height: "auto",
                    width: "auto",
                    opacity: isCenter ? 1 : peekOpacity,
                    transform: `scale(${isCenter ? 1 : peekScale})`,
                    filter: isCenter ? "none" : `blur(${peekBlurPx}px)`,
                  }}
                >
                  <Sources id={id} />
                </video>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
