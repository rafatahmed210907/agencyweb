import { Container } from "@/components/layout/container";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { CountUp } from "@/components/fx/count-up";
import { stats } from "@/content/stats";

export function Stats() {
  return (
    <section aria-label="Studio metrics" className="relative border-y border-border">
      <Container className="py-14">
        <RevealGroup className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
          {stats.map((stat, index) => (
            <RevealItem
              key={stat.label}
              className={
                index > 0
                  ? "md:border-l md:border-border md:pl-8"
                  : undefined
              }
            >
              <p className="text-[clamp(1.9rem,3.4vw,2.6rem)] font-semibold leading-none tracking-[-0.03em] tabular">
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals ?? 0}
                />
              </p>
              <p className="mt-2.5 text-[13px] text-muted-foreground">{stat.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
