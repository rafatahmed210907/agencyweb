export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Northlane operated like a senior product team inside our company. They pushed back on the right things and shipped faster than our internal estimate.",
    name: "Dana Whitfield",
    role: "Co-founder",
    company: "Atlas Systems",
  },
  {
    quote:
      "The planning phase paid for itself in the first month. We stopped re-deciding the same architecture question every sprint.",
    name: "Marco Ferrante",
    role: "Head of Product",
    company: "Kite",
  },
  {
    quote:
      "They designed it, built it, and then kept it running through two research seasons. That continuity is rare.",
    name: "Ines Marchetti",
    role: "Research Director",
    company: "Meridian Labs",
  },
  {
    quote:
      "Launch week used to be something we dreaded. Having the same team do the build and the launch changed everything.",
    name: "Lena Osei",
    role: "COO",
    company: "Harbor Logistics",
  },
];
