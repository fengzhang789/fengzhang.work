import Image from "next/image";
import type { WorkItem } from "../data/work";

export default function WorkTile({ item }: { item: WorkItem }) {
  const isLogo = item.fit === "logo";
  // A logo carrying its own ground has margins built in, so it needs only a
  // little inset; one dropped onto the default white plate needs more room.
  const logoInset = item.plateBg
    ? "inset-x-[12%] inset-y-[18%]"
    : "inset-x-[9%] inset-y-[12%]";
  const Wrapper = item.href ? "a" : "div";
  const wrapperProps = item.href
    ? { href: item.href, target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <Wrapper {...wrapperProps} className="tile group block focus:outline-none">
      <div
        className={`plate aspect-video w-full ${
          item.image ? (isLogo ? "is-logo" : "has-image") : ""
        }`}
        style={isLogo && item.plateBg ? { backgroundColor: item.plateBg } : undefined}
      >
        {item.image && isLogo ? (
          <div className={`absolute ${logoInset}`}>
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
        <p className="muted mt-1 max-w-[46ch] leading-tight">{item.sub}</p>
      </div>
    </Wrapper>
  );
}
