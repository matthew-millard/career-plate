interface BentoCardProps {
  card: Card;
  className?: string;
}

interface Card {
  imageUrl: string;
  altText: string;
  title: string;
  subtitle: string;
  description: string;
}

const cards: Card[] = [
  {
    imageUrl:
      "https://res.cloudinary.com/hospohub/image/upload/v1758410472/ember_june_2024-7_f5nryo.jpg",
    altText:
      "Professional server in restaurant setting providing excellent customer service",
    title: "Front of House",
    subtitle: "Exceptional service careers",
    description:
      "Connect with top restaurants, hotels, and venues looking for skilled servers, hosts, managers, and service professionals who deliver memorable experiences.",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/hospohub/image/upload/v1758409732/06_13_2025_linden_pizza_2048px-15_kvfccw.jpg",
    altText: "Chef preparing food in a professional kitchen environment",
    title: "Back of House",
    subtitle: "Culinary excellence opportunities",
    description:
      "Discover positions for chefs, line cooks, prep cooks, kitchen managers, and culinary professionals who create exceptional dining experiences behind the scenes.",
  },
  {
    imageUrl:
      "https://tailwindcss.com/plus-assets/img/component-images/bento-01-speed.png",
    altText: "Network connections and professional networking visualization",
    title: "Networking",
    subtitle: "Connect with industry peers",
    description:
      "Build relationships with fellow hospitality professionals, share experiences, and grow your network within the industry.",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/hospohub/image/upload/v1758410472/ember_june_2024-7_f5nryo.jpg",
    altText:
      "Hospitality professional advancing their career through training and development",
    title: "Career Growth",
    subtitle: "Advance your hospitality career",
    description:
      "Access training resources, mentorship opportunities, and career advancement paths to help you reach your professional goals in hospitality.",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/hospohub/image/upload/c_crop,w_1463,h_1463,x_0,y_194,ar_1:1/v1758409732/06_13_2025_linden_pizza_2048px-15_kvfccw.jpg",
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
    <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
      {cards.map((card, index) => (
        <BentoCard
          key={card.title}
          card={card}
          className={index < 2 ? "lg:col-span-3" : "lg:col-span-2"}
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
        <img
          src={card.imageUrl}
          alt={card.altText}
          className="h-80 w-full object-cover object-top"
        />
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
