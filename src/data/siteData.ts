/**
 * Verified content, taken from akkadpictures.com (titles, services, contact) and the
 * YouTube channel "Akkad Films" (video titles). Nothing here is invented.
 */

export const SITE = {
  name: "Akkad Pictures",
  quote: {
    en: "“Quality means doing it right when no one is looking.”",
    ar: "“الجودة تعني أن تصنع العمل بإتقان تام حتى حين لا يراك أحد.”",
  },
  contact: {
    email: "akkad.pictures@gmail.com",
    whatsapp: "+90 505 011 4411",
    whatsappLink: "https://wa.me/905050114411",
    instagram: "https://www.instagram.com/zaid.akkad/",
    instagramHandle: "@zaid.akkad",
    youtube: "https://www.youtube.com/c/AkkadPictures/videos",
  },
  hubs: [
    { en: "Istanbul", ar: "إسطنبول" },
    { en: "Dubai", ar: "دبي" },
    { en: "Kuwait", ar: "الكويت" },
    { en: "Doha", ar: "الدوحة" },
  ],
};

export const SERVICES = [
  {
    en: "TV Commercials",
    ar: "الإعلانات التلفزيونية",
    textEn:
      "Changing traditional ways of telling stories in TV commercials — bringing to life newer and better ways of filmmaking, without compromising on the soul.",
    textAr: "نغيّر الطرق التقليدية في سرد القصص بالإعلانات التلفزيونية، بأساليب جديدة وأفضل في صناعة الأفلام دون التفريط بالروح.",
  },
  {
    en: "Short Films",
    ar: "الأفلام القصيرة",
    textEn:
      "A journey of love, loss and redemption — captivating storytelling and breathtaking visuals that stay with you long after the credits roll.",
    textAr: "رحلة من الحب والفقد والخلاص، بسرد آسر وصور مبهرة تبقى معك طويلًا بعد انتهاء العرض.",
  },
  {
    en: "Promotional Videos",
    ar: "الفيديوهات الترويجية",
    textEn:
      "From YouTube ads to TV commercials — highly effective videos that engage a specific audience and transform your marketing campaign.",
    textAr: "من إعلانات يوتيوب إلى الإعلانات التلفزيونية — فيديوهات فعّالة تجذب جمهورك المستهدف وتُحوّل حملتك التسويقية.",
  },
  {
    en: "Product Photography",
    ar: "تصوير المنتجات",
    textEn: "Make your products shine — photography that captures their essence and elevates your brand with stunning visuals.",
    textAr: "اجعل منتجاتك تتألق — تصوير يلتقط جوهرها ويرتقي بعلامتك بصور مذهلة.",
  },
];

export interface Film {
  id: string;
  youtubeId: string;
  title: string; // official video title
  titleAr?: string;
  year?: string;
  kind: { en: string; ar: string };
}

const K = {
  showreel: { en: "Showreel", ar: "شوريل" },
  tvc: { en: "TV Commercial", ar: "إعلان تلفزيوني" },
  film: { en: "Film", ar: "فيلم" },
  short: { en: "Short Film", ar: "فيلم قصير" },
  bts: { en: "Behind the Scenes", ar: "كواليس" },
  intro: { en: "Brand Film", ar: "فيلم تعريفي" },
};

export const FILMS: Film[] = [
  { id: "showreel-2025", youtubeId: "O_NxsX52uNM", title: "Akkad Films — Showreel", year: "2025", kind: K.showreel },
  { id: "rolex", youtubeId: "tkMdjH0GuzQ", title: "The Rolex Submariner", year: "2021", kind: K.tvc },
  { id: "hugo-boss", youtubeId: "0PIk7MWOd08", title: "Hugo Boss Bottled Night", year: "2022", kind: K.tvc },
  { id: "spacetoon", youtubeId: "Fv175lhQL3U", title: "SpacetoonGo — Emotional TVC", year: "2021", kind: K.tvc },
  { id: "london", youtubeId: "POQKv4r1agw", title: "London — The City of Ghosts", year: "2024", kind: K.film },
  { id: "isolation", youtubeId: "ytK3a88PQLg", title: "Isolation II", titleAr: "عُزلة", kind: K.short },
  { id: "allure", youtubeId: "SIpWmjE2HNU", title: "Allure Projects — Official Intro", year: "2021", kind: K.intro },
  { id: "bts", youtubeId: "d7qprd0sfMI", title: "Moments Behind the Scenes", kind: K.bts },
  { id: "showreel-2019", youtubeId: "uEKxGlSg9tE", title: "Akkad Pictures — Showreel", year: "2019", kind: K.showreel },
];

export interface Shot {
  id: string;
  src: string;
  title: { en: string; ar: string };
  category: { en: string; ar: string };
}

const W = (id: string) => `https://static.wixstatic.com/media/e272fc_${id}`;
const STILLS = { en: "Film stills", ar: "لقطات من الأفلام" };
const PRODUCT = { en: "Product photography", ar: "تصوير المنتجات" };
const FERRARI = { en: "Ferrari TVC", ar: "إعلان فيراري" };

const ferrari = ["330858b43b1f40ef84b11086dda6022f", "33a262e7393b4d6b8e5aabb11e4e20f5", "c7e86fb7275e44be806fe89bd66b427c", "5f340dbf0ebd4470bfc3abbcd5cadcb8", "be67d94a3f45480abb95064a0a3b3b07", "915fb224bf314e99aac71d71d27628c3", "314cbf4fe1f34bb7a5341d890b2a794c", "b293476bd90947088ac62a2739960ae6", "faee16ce04114dc89d4f1a2bd993443c"];
const stills = ["20326b6ffcb042d1be39cf7be6b4c3bb", "599905d31ba242dfb8a05e61e809a752", "d2e1caf510124ff4b766d6fd60ca3b58", "f226a2993a324da2b2f078058ed47cbc", "d89a211e66a54e57a2caad21384082cb", "24a647bc78114697985eb344f95847cb", "6e59befd8b444389b70aa82427da164f", "a63f264035f04141b63a597fc75a9b03", "dac23e1b47074c2a87983447d37f215c", "4ef8da8af34b41e1a0a144ac8ba53344", "5d99573ce89449edbdfaa7410f09b541", "7ca24c3a572f44279a2851b25b72c44d", "0c7f6182d4024324939f6f6f78edd3d4", "5d3c5ae373af47e497c9c0a34343adae", "9cd2baafeca94d95934cae6ac76240a2", "4facc514b06142bbbc9eee171aa42b9a"];
const product = ["3cc5d26fdeb94417a60e6f467959f9eb~mv2.jpg", "9ffad269961e484695cdd945c2058817~mv2.jpg", "f1b1cb29a98e4e5182080bff2b6aa733~mv2.jpg", "38a11072b46d457e9b3861db2f5f69cf~mv2.jpg", "d14ba2bd279740678580a2fef658eb0b~mv2.jpg", "ac4fbee787604b39a1281f61e6f2028e~mv2.png", "f3d9eb6f7d544b15803a3e3a41fe90a0~mv2.jpg", "fe334fc3fa134147a73bad626636216e~mv2.jpg"];

const num = (n: number) => String(n + 1).padStart(2, "0");

/** One entry per unique image, grouped: product → Ferrari → film stills. */
export const SHOTS: Shot[] = [
  ...product.map((f, i) => ({
    id: `product-${i}`,
    src: W(f),
    title: { en: `Product ${num(i)}`, ar: `منتج ${num(i)}` },
    category: PRODUCT,
  })),
  ...ferrari.map((f, i) => ({
    id: `ferrari-${i}`,
    src: W(`${f}~mv2.jpg`),
    title: { en: `Ferrari — frame ${num(i)}`, ar: `فيراري — لقطة ${num(i)}` },
    category: FERRARI,
  })),
  ...stills.map((f, i) => ({
    id: `still-${i}`,
    src: W(`${f}~mv2.jpg`),
    title: { en: `Still ${num(i)}`, ar: `لقطة ${num(i)}` },
    category: STILLS,
  })),
];

/** Wix serves resized, high-quality renditions: request the width actually needed. */
export function sized(url: string, w: number): string {
  if (!url.startsWith("https://static.wixstatic.com")) return url;
  return `${url}/v1/fit/w_${w},h_${w},q_90,enc_auto/file.jpg`;
}
