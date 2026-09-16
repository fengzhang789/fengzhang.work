import Image from "next/image";
import type { WorkItem } from "../data/work";
import DbAsciiArt from "./DbAsciiArt";

export default function WorkTile({ item }: { item: WorkItem }) {
  const isLogo = item.fit === "logo";
  // A logo carrying its own ground has margins built in, so it needs only a
  // little inset; one dropped onto the default white plate needs more room.
  const baseX = item.plateBg ? 12 : 9;
  const baseY = item.plateBg ? 18 : 12;
  // logoScale shrinks the inset box further around its own centre, e.g. 0.7
  // pulls a logo in another 30% without moving its middle.
  const scale = item.logoScale ?? 1;
  const insetX = 50 - (50 - baseX) * scale;
  const insetY = 50 - (50 - baseY) * scale;
  const logoInsetStyle = {
    left: `${insetX}%`,
    right: `${insetX}%`,
    top: `${insetY}%`,
    bottom: `${insetY}%`,
  };
  const Wrapper = item.href ? "a" : "div";
  const wrapperProps = item.href
    ? { href: item.href, target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <Wrapper {...wrapperProps} className="tile group block focus:outline-none">
      <div
        className={`plate aspect-video w-full ${
          item.art ? "has-image" : item.image ? (isLogo ? "is-logo" : "has-image") : ""
        }`}
        style={isLogo && item.plateBg ? { backgroundColor: item.plateBg } : undefined}
      >
        {item.art === "db" ? (
          <DbAsciiArt label={item.alt ?? `${item.name} diagram`} />
        ) : item.image && isLogo ? (
          <div className="absolute" style={logoInsetStyle}>
            <Image
              src={item.image}
              alt={item.alt ?? item.name}
              fill
              sizes="(max-width: 768px) 82vw, 480px"
              className="object-contain"
            />
          </div>
        ) : item.image ? (
          <Image
            src={item.image}
            alt={item.alt ?? item.name}
            fill
            sizes="(max-width: 768px) 100vw, 580px"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="plate-empty">
            <span className="plate-hint">/images/{item.id}.jpg</span>
          </div>
        )}
      </div>

      <div className="mt-4 leading-tight">
        {/* Non-breaking space reserves the line so tiles without a date keep
            their title on the same baseline as their neighbour. */}
        <p className="tile-meta">{item.period || "\u00A0"}</p>
        <p className="tile-name mt-1.5">{item.name}</p>
        <p className="muted mt-1 leading-tight">{item.sub}</p>
      </div>
    </Wrapper>
  );
}
