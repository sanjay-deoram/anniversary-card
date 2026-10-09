// Everything personal lives here, so the card can be edited without touching the layout.

export const letter = {
  to: "Bee",
  from: "Ban",
  // ✎ Write your message here. Each string in the list is its own paragraph.
  paragraphs: [
    "Happy Anniversary Bee,",
    "I'm losing count of the years, 8 years! Godamn. wanted to create a website card so you can always have it, and it just to showcase some photos of japan :).",
    "I love you so so much, I know im hard on you sometimes but thats because I love you and I care about you. Our kids need a athletic mom you know...GYM.",
    "We grow together as one, and push each other each day, although you need the pushing the most but its ok hehe.",
    "We have the rest our lives together. I love you so much",
  ],
};

// shape: "tall" (portrait polaroid) or "wide" (landscape polaroid)
// focus: CSS object-position, so the crop keeps the two of you in frame
// tilt: resting angle on the clothesline, in degrees
export const photos = [
  {
    id: "proposal",
    caption: "the question",
    alt: "Ban on one knee proposing to Bee on a red bridge in front of a temple in Kyoto",
    shape: "tall",
    focus: "50% 70%",
    tilt: -3,
  },
  {
    id: "bridge",
    caption: "she said yes",
    alt: "Bee looking at her new ring while Ban smiles on the vermilion bridge",
    shape: "wide",
    focus: "48% 50%",
    tilt: 2,
  },
  {
    id: "pagoda",
    caption: "tiny us, big pagoda",
    alt: "The two of us holding each other in front of a five-story pagoda",
    shape: "tall",
    focus: "50% 75%",
    tilt: -1.5,
  },
  {
    id: "ring",
    caption: "mine, forever",
    alt: "Close-up of Bee's hand with the engagement ring resting on Ban's arm",
    shape: "tall",
    focus: "50% 40%",
    tilt: 3,
  },
  {
    id: "rainbow",
    caption: "a rainbow, just for us",
    alt: "The two of us under a clear umbrella with a rainbow over the mountain behind a temple gate",
    shape: "tall",
    focus: "50% 70%",
    tilt: 2.5,
  },
  {
    id: "pond",
    caption: "our bridge",
    alt: "Wide shot of the two of us on the red bridge over a pond surrounded by autumn maples",
    shape: "wide",
    focus: "66% 55%",
    tilt: -2,
  },
  {
    id: "hands",
    caption: "holding on",
    alt: "Bee's ring hand holding Ban's hand at a cafe table",
    shape: "tall",
    focus: "50% 55%",
    tilt: 1.5,
  },
  {
    id: "selfie",
    caption: "my favorite goof",
    alt: "A silly selfie of the two of us dressed up, Bee sticking her tongue out",
    shape: "tall",
    focus: "50% 35%",
    tilt: -2.5,
  },
].map((p) => ({
  ...p,
  src: `/photos/${p.id}.jpg`,
  thumb: `/photos/${p.id}-sm.jpg`,
}));

// The photo inside the card, opposite the letter.
export const insidePhoto = {
  src: "/photos/proposal-sm.jpg",
  alt: "Ban proposing to Bee on the bridge at Daigo-ji",
  place: "醍醐寺 · Kyoto",
  date: "11 · 01 · 2025",
  line: "the day you said yes",
};

export const video = {
  src: "/video/kyoto-noodles.mp4",
  poster: "/video/kyoto-noodles-poster.jpg",
  title: "Noodle dates with you",
  caption: "Japan · 2025",
};
