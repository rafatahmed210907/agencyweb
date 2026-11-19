import { Container } from "@/components/layout/container";
import { CountUp } from "@/components/fx/count-up";
import { stats } from "@/content/stats";

export function Stats() {
  return (
    <section aria-label="Studio metrics" className="relative border-y border-[rgba(166,240,76,0.1)]">
      <Container className="py-4">
        <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-[rgba(166,240,76,0.14)] bg-[rgba(7,11,8,0.78)] md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={
                "stat-cell relative isolate min-h-[8.5rem] px-5 py-7 " +
                (index > 0 ? "border-l border-[rgba(166,240,76,0.12)]" : "border-l-0") +
                (index >= 2 ? " border-t border-[rgba(166,240,76,0.12)] md:border-t-0" : "")
              }
            >
              <span aria-hidden="true" className="stat-cell-filament" />
              <span aria-hidden="true" className="stat-cell-sheen" />
              <p className="text-[clamp(1.9rem,3.4vw,2.5rem)] font-semibold leading-none tracking-[-0.03em] tabular text-[#f2f5ef]">
                <CountUp value={stat.value} suffix={stat.suffix} decimals={stat.decimals ?? 0} />
              </p>
              <p className="mt-2.5 text-[12.5px] text-[#9aa79a]">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
