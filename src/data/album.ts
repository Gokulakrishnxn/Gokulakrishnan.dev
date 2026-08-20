export type AlbumShot = {
  src: string;
  alt: string;
  caption?: string;
  place?: string;
  aspect?: "portrait" | "square" | "wide" | "tall";
};

export const albumShots: AlbumShot[] = [
  {
    src: "/google.jpeg",
    alt: "Gokulakrishnan standing in front of the Google sign",
    caption: "Google singapore",
    aspect: "tall",
  },
  {
    src: "/manali.jpeg",
    alt: "Lying in the snow with mountains behind, Manali",
    caption: "Manali",
    aspect: "tall",
  },
  {
    src: "/singapore.jpeg",
    alt: "Merlion at dusk with Marina Bay Sands across the water",
    caption: "Singapore",
    aspect: "tall",
  },
  {
    src: "/chennai-kovalam.jpg",
    alt: "Sunset over the water at Kovalam beach, Chennai",
    caption: "Chennai Kovalam",
    aspect: "tall",
  },
];
