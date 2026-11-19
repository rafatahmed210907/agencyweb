import { Marquee } from "@/components/fx/marquee";
import { Container } from "@/components/layout/container";

const CLIENTS = [
  "Atlas Systems",
  "Kite",
  "Meridian Labs",
  "Signal",
  "Harbor Logistics",
  "Verdant",
  "Lumen",
  "Northwind",
];

export function LogoCloud() {
  return (
    <section aria-label="Selected clients" className="relative border-y border-border py-10">
      <Container>
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          Trusted by product teams at
        </p>
        <Marquee className="mt-7" speed={46}>
          {CLIENTS.map((client) => (
            <span
              key={client}
              className="select-none whitespace-nowrap text-lg font-semibold tracking-[-0.02em] text-muted-foreground/55 transition-colors hover:text-foreground"
            >
              {client}
            </span>
          ))}
        </Marquee>
      </Container>
    </section>
  );
}
