interface Card {
  icon: string;
  title: string;
  description: string;
  wide?: boolean;
}

const CARDS: Card[] = [
  {
    icon: "/icon-students.svg",
    title: "Students",
    description:
      "From ADA, BANM, UFAZ, BMU, and beyond. Learn AI-powered development skills that will set you apart in the local and global job market.",
    wide: true,
  },
  {
    icon: "/icon-developers.svg",
    title: "Developers",
    description:
      "Ship production-ready features faster. Debug, test, and build full-stack applications with AI assistance.",
  },
  {
    icon: "/icon-startupers.svg",
    title: "Startupers",
    description:
      "Prototype MVPs in hours, build landing pages, and validate ideas without a technical co-founder.",
  },
  {
    icon: "/icon-designers.svg",
    title: "Designers",
    description:
      "Turn designs into code. Build prototypes, automate workflows, and create professional deliverables faster.",
  },
  {
    icon: "/icon-ai-agents.svg",
    title: "AI Agents",
    description:
      "Yes, agents too! Register your AI agent, claim ownership, and join our community alongside human members.",
  },
];

function AudienceCard({ icon, title, description, wide }: Card) {
  return (
    <div
      className={`relative flex flex-col gap-[30px] md:justify-between md:gap-0 md:h-[300px] rounded-[20px] bg-cursor-card overflow-hidden p-5 md:p-10 ${
        wide ? "md:w-[750px]" : "flex-1"
      } w-full`}
    >
      {/* Icon + title row */}
      <div className="flex items-start justify-between">
        {/* Orange icon — SVG uses --stroke-0 CSS var, falls back to #F54E00 */}
        <img
          src={icon}
          alt=""
          aria-hidden
          className="size-8 md:size-[50px] shrink-0"
        />
        <h3 className="font-sans font-medium text-[28px] md:text-[44px] text-cursor-primary tracking-[-1.12px] md:tracking-[-1.76px] leading-none text-right">
          {title}
        </h3>
      </div>

      {/* Description */}
      <p className="font-ibm text-[14px] md:text-[20px] text-cursor-secondary tracking-[-0.28px] md:tracking-[-0.4px] leading-[1.45]">
        {description}
      </p>
    </div>
  );
}

export default function WhoItsFor() {
  const [students, developers, ...bottomRow] = CARDS;

  return (
    <section className="bg-cursor-bg py-[80px] md:py-[120px]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-[80px]">

        {/* Heading — keep mb in sync with JoinCommunity section-heading → cards gap */}
        <div className="mb-[50px] flex max-w-[720px] flex-col gap-[10px] md:mb-[60px]">
          <p className="font-ibm text-[14px] md:text-[24px] text-cursor-secondary tracking-[-0.28px] md:tracking-[-0.48px] leading-none">
            Who&apos;s This For?
          </p>
          <h2 className="font-sans font-medium text-[36px] md:text-[72px] leading-none md:leading-[0.92] tracking-[-1.44px] md:tracking-[-2.88px]">
            <span className="text-cursor-primary">From Juniors </span>
            <span className="text-cursor-secondary">to</span>
            <br />
            <span className="text-cursor-secondary">Architects</span>
          </h2>
        </div>

        {/* Cards grid */}
        <div className="flex flex-col gap-[6px]">

          {/* Row 1: Students (wide) + Developers */}
          <div className="flex flex-col md:flex-row gap-[6px]">
            <AudienceCard {...students} />
            <AudienceCard {...developers} />
          </div>

          {/* Row 2: Startupers + Designers + AI Agents */}
          <div className="flex flex-col md:flex-row gap-[6px]">
            {bottomRow.map((card) => (
              <AudienceCard key={card.title} {...card} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
