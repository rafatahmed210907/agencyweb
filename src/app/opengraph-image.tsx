import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#141018",
          backgroundImage:
            "radial-gradient(60% 60% at 18% 0%, rgba(139,92,246,0.42), transparent 60%), radial-gradient(50% 50% at 100% 100%, rgba(56,189,248,0.24), transparent 62%)",
          color: "#f5f3fb",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              border: "1.5px solid rgba(167,139,250,0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              color: "#c4b5fd",
            }}
          >
            N
          </div>
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-0.02em" }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 68, fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.04em", maxWidth: 900 }}>
            Software studio for ambitious products.
          </div>
          <div style={{ fontSize: 26, color: "#b7b1c9", maxWidth: 820 }}>
            Product design, web platforms, and design systems — built by a small senior team.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#9a93ad" }}>
          <span>northlane.studio</span>
          <span>Next.js · TypeScript · Tailwind</span>
        </div>
      </div>
    ),
    size,
  );
}
