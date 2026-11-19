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
          background: "#050706",
          backgroundImage:
            "radial-gradient(55% 55% at 50% -10%, rgba(198,249,138,0.22), transparent 62%), radial-gradient(45% 45% at 100% 100%, rgba(57,255,20,0.12), transparent 64%)",
          color: "#f2f5ef",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              border: "1.5px solid rgba(166,240,76,0.55)",
              background: "rgba(166,240,76,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
              color: "#c6f98a",
            }}
          >
            N
          </div>
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-0.02em" }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              maxWidth: 960,
            }}
          >
            <span>Plan it. Build it.&nbsp;</span>
            <span style={{ color: "#a6f04c" }}>Grow it.</span>
          </div>
          <div style={{ fontSize: 26, color: "#9aa79a", maxWidth: 860 }}>
            One studio for the whole product lifecycle — planning and establishment, design and
            development, maintenance, and marketing.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#6b776b",
            borderTop: "1px solid rgba(166,240,76,0.16)",
            paddingTop: 24,
          }}
        >
          <span>northlane.studio</span>
          <span>Next.js · TypeScript · Tailwind</span>
        </div>
      </div>
    ),
    size,
  );
}
