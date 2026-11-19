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
    role: "VP Engineering",
    company: "Atlas Systems",
  },
  {
    quote:
      "The prototypes were so close to production that our stakeholder reviews became conversations about behavior instead of pixels. Enormous time saver.",
    name: "Marco Ferrante",
    role: "Head of Product",
    company: "Kite",
  },
  {
    quote:
      "We hired them for a rebuild and got a design system, a performance budget, and a team that finally understands our own frontend.",
    name: "Priya Raman",
    role: "Director of Customer Experience",
    company: "Signal",
  },
  {
    quote:
      "Clear communication, real estimates, no theater. The weekly live demos meant we never wondered where the project stood.",
    name: "Lena Osei",
    role: "COO",
    company: "Harbor Logistics",
  },
];
