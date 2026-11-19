import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#141018",
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 7,
            border: "1.5px solid #a78bfa",
            background: "rgba(139,92,246,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ddd6fe",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          N
        </div>
      </div>
    ),
    size,
  );
}
