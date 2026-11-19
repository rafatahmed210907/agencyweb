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
          background: "#050706",
        }}
      >
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: 8,
            border: "1.5px solid #a6f04c",
            background: "rgba(166,240,76,0.14)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#c6f98a",
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          N
        </div>
      </div>
    ),
    size,
  );
}
