interface BentoCardProps {
  card: Card;
  className?: string;
}

interface Card {
  imageUrl: {
    sm?: string;
    base: string;
    lg?: string;
  };
  altText: string;
  title: string;
  subtitle: string;
  description: string;
}

const cards: Card[] = [
  {
    imageUrl: {
      base: "/images/bento_grid_1_camille_16x9.jpg",
      lg: "/images/bento_grid_1_camille_16x9.jpg",
    },
    altText:
      "Professional server in restaurant setting providing excellent customer service",
    title: "Front of House",
    subtitle: "Exceptional service careers",
    description:
      "Connect with top restaurants, hotels, and venues looking for skilled servers, hosts, managers, and service professionals who deliver memorable experiences.",
  },
  {
    imageUrl: {
      base: "https://res.cloudinary.com/hospohub/image/upload/v1758409732/06_13_2025_linden_pizza_2048px-15_kvfccw.jpg",
    },
    altText: "Chef preparing food in a professional kitchen environment",
    title: "Back of House",
    subtitle: "Culinary excellence opportunities",
    description:
      "Discover positions for chefs, line cooks, prep cooks, kitchen managers, and culinary professionals who create exceptional dining experiences behind the scenes.",
  },
  {
    imageUrl: { base: "/images/bento_grid_3_nathan.jpg" },
    altText: "Network connections and professional networking visualization",
    title: "Networking",
    subtitle: "Connect with industry peers",
    description:
      "Build relationships with fellow hospitality professionals, share experiences, and grow your network within the industry.",
  },
  {
    imageUrl: {
      base: "https://res.cloudinary.com/hospohub/image/upload/v1758410472/ember_june_2024-7_f5nryo.jpg",
    },
    altText:
      "Hospitality professional advancing their career through training and development",
    title: "Career Growth",
    subtitle: "Advance your hospitality career",
    description:
      "Access training resources, mentorship opportunities, and career advancement paths to help you reach your professional goals in hospitality.",
  },
  {
    imageUrl: {
      sm: "/images/bento_grid_4_cole_16x9.jpg",
      base: "/images/bento_grid_4_cole_1x1.jpg",
      lg: "/images/bento_grid_4_cole_1x1.jpg",
    },
    altText:
      "Professional chef in kitchen discovering new career opportunities",
    title: "Opportunities",
    subtitle: "Discover your next role",
    description:
      "Browse exclusive job opportunities from top restaurants, hotels, and hospitality venues looking for talented professionals like you.",
  },
];

export default function BentoGrid() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-6 md:grid-rows-2">
      {cards.map((card, index) => (
        <BentoCard
          key={card.title}
          card={card}
          className={index < 2 ? "md:col-span-3" : "md:col-span-2"}
        />
      ))}
    </div>
  );
}

function BentoCard({ card, className }: BentoCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border shadow-sm ${className}`}
    >
      <div className="bg-card absolute inset-0 -z-10" />
      <div className="mx-auto">
        <picture>
          <source media="(width < 768px)" srcSet={card.imageUrl?.sm} />
          <source media="(width >= 768px)" srcSet={card.imageUrl?.lg} />
          <img
            src={card.imageUrl.base}
            alt={card.altText}
            className="h-80 w-full object-cover"
          />
        </picture>
        <div className="p-10 pt-8">
          <h3 className="text-secondary text-sm/4 font-semibold">
            {card.title}
          </h3>
          <p className="mt-2 text-lg font-medium tracking-tight">
            {card.subtitle}
          </p>
          <p className="text-foreground-muted mt-2 max-w-lg text-sm/6">
            {card.description}
          </p>
        </div>
      </div>
    </div>
  );
}
