const Filters = [
  {
    id: 1,
    title: "Genre",
    className: "genre-filter box-filter",
    filters: [
      { id: 13, name: "Action", value: "action" },
      { id: 14, name: "Adventure", value: "adventure" },
      { id: 15, name: "Role-playing", value: "rpg" },
      { id: 16, name: "Simulation", value: "simulation" },
      { id: 17, name: "Strategy", value: "strategy" },
      { id: 18, name: "Sports", value: "sports" },
      { id: 19, name: "Puzzle", value: "puzzle" },
      { id: 20, name: "Racing", value: "racing" },
    ],
  },
  {
    id: 2,
    title: "Features",
    className: "features-filter box-filter",
    filters: [
      { id: 5, name: "Multiplayer", value: "multiplayer" },
      { id: 6, name: "Single Player", value: "singleplayer" },
      { id: 7, name: "Online Co-op", value: "online-coop" },
      { id: 8, name: "Local Co-op", value: "local-coop" },
    ],
  },
  {
    id: 3,
    title: "Price",
    className: "price-filter box-filter",
    filters: [
      { id: 1, name: "Under $10", value: "under-10" },
      { id: 2, name: "$10 to $20", value: "10-20" },
      { id: 3, name: "$20 to $30", value: "20-30" },
      { id: 4, name: "Over $30", value: "over-30" },
    ],
  },
  {
    id: 4,
    title: "Platform",
    className: "platform-filter box-filter",
    filters: [
      { id: 21, name: "PC", value: "pc" },
      { id: 22, name: "Playstation", value: "playstation" },
      { id: 23, name: "Xbox", value: "xbox" },
      { id: 24, name: "Nintendo Switch", value: "switch" },
    ],
  },
  {
    id: 5,
    title: "Rating",
    className: "rating-filter box-filter",
    filters: [
      { id: 9, name: "4+ Stars", value: "4-stars" },
      { id: 10, name: "3+ Stars", value: "3-stars" },
      { id: 11, name: "2+ Stars", value: "2-stars" },
      { id: 12, name: "1+ Star", value: "1-star" },
    ],
  },
];

export default Filters;
