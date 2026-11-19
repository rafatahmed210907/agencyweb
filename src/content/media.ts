export interface MediaAsset {
  src: string;
  alt: string;
  credit: string;
}

/**
 * Photography lives here and nowhere else, so swapping to local assets or a CMS
 * is a one-file change. Widths are kept modest (1200px) and quality at 70 — the
 * images are decorative covers, never full-bleed hero art.
 */
export const media = {
  caseAtlas: {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=70",
    alt: "Abstract violet and indigo gradient sculpture",
    credit: "Unsplash",
  },
  caseKite: {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=70",
    alt: "Laptop displaying code in a dim studio",
    credit: "Unsplash",
  },
  caseMeridian: {
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=70",
    alt: "Earth at night with a glowing network of lights",
    credit: "Unsplash",
  },
  caseSignal: {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=70",
    alt: "Close-up of a circuit board with violet lighting",
    credit: "Unsplash",
  },
  caseHarbor: {
    src: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?auto=format&fit=crop&w=1200&q=70",
    alt: "Minimal desk setup with laptop and notebook",
    credit: "Unsplash",
  },
  caseVerdant: {
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=70",
    alt: "Code editor filled with colored syntax",
    credit: "Unsplash",
  },
  galleryStudio: {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=70",
    alt: "Team collaborating around a table",
    credit: "Unsplash",
  },
  galleryWorkspace: {
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=70",
    alt: "Bright open-plan studio workspace",
    credit: "Unsplash",
  },
  galleryDesk: {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=70",
    alt: "Desk with notes and computer",
    credit: "Unsplash",
  },
  galleryMeeting: {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=70",
    alt: "Colleagues reviewing work together",
    credit: "Unsplash",
  },
} satisfies Record<string, MediaAsset>;

export type MediaKey = keyof typeof media;
