export interface ProjectVideo {
  id: string;
  youtubeId: string;
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  year: string;
  roleEn: string;
  roleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  thumbnail: string;
  camera: string;
  aspectRatio: string;
  featured?: boolean;
}

export interface PhotographItem {
  id: string;
  titleEn: string;
  titleAr: string;
  category: 'commercial' | 'editorial' | 'product' | 'bts';
  categoryLabelEn: string;
  categoryLabelAr: string;
  imageUrl: string;
  logImageUrl?: string; // For DaVinci grade comparison
  aspectRatio: 'square' | 'portrait' | 'landscape' | 'wide';
  exif: {
    camera: string;
    lens: string;
    focalLength: string;
    aperture: string;
    shutter: string;
    iso: string;
    format: string;
  };
  palette: string[];
  descriptionEn: string;
  descriptionAr: string;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  captionEn: string;
  captionAr: string;
  likes: string;
  comments: string;
  date: string;
  url: string;
}

export const PORTFOLIO_DATA = {
  director: {
    nameEn: "Zaid Akkad",
    nameAr: "زيد العقاد",
    titleEn: "Film Director & Master Cinematographer",
    titleAr: "مخرج سينمائي ومدير تصوير محترف",
    companyEn: "Akkad Pictures / Akkad Films",
    companyAr: "أفلام العقاد / عـقـاد بيكتشرز",
    quoteEn: "“Quality means doing it right when no one is looking.”",
    quoteAr: "”الجودة تعني أن تصنع العمل بإتقان تام حتى حين لا يراك أحد.“",
    bioEn: "Continuing a celebrated cinematic legacy spanning generations, Zaid Akkad stands at the vanguard of high-concept visual storytelling, commercial directing, and color mastery. Headquartered in Istanbul and operating across Dubai, Riyadh, Kuwait, and Doha, Akkad Pictures crafts immersive visual narratives for world-class luxury brands, high-profile cinema, and television.",
    bioAr: "امتداداً لإرث سينمائي عريق تناقلته الأجيال، يقف زيد العقاد في طليعة الإخراج الإعلاني البصري والسينمائي وإتقان تدريج الألوان. متخذاً من إسطنبول مقراً، ومع نشاط ممتد عبر دبي، الرياض، الكويت، والدوحة، تقدم شركة أفلام العقاد تجارب بصرية رفيعة المستوى لكبرى العلامات التجارية العالمية والإنتاجات التلفزيونية والسينمائية.",
    heritageEn: "Son of the visionary Hollywood director & producer Moustapha Akkad (The Message, Lion of the Desert, Halloween). Rooted in legendary cinematic discipline, elevated by modern anamorphic technology and high-end digital workflows.",
    heritageAr: "نجل المخرج والمنتج العالمي الراحل مصطفى العقاد (مخرج فيلمي 'الرسالة' و'أسد الصحراء'). متجذر في تقاليد الانضباط السينمائي الأصيل، ومقترن بأحدث تقنيات التصوير الأنالوج والرقمي والعدسات السينمائية.",
    hubs: [
      { nameEn: "Istanbul", nameAr: "إسطنبول", country: "Turkey" },
      { nameEn: "Dubai", nameAr: "دبي", country: "UAE" },
      { nameEn: "Riyadh", nameAr: "الرياض", country: "KSA" },
      { nameEn: "Kuwait", nameAr: "الكويت", country: "Kuwait" },
      { nameEn: "Doha", nameAr: "الدوحة", country: "Qatar" },
    ],
    contact: {
      phone: "+90 50 10000 411",
      email: "info@akkadpictures.com",
      instagram: "https://www.instagram.com/zaid.akkad/",
      instagramHandle: "@zaid.akkad",
      youtube: "https://www.youtube.com/c/AkkadPictures/videos",
      location: "Istanbul, Turkey",
    },
    gearList: [
      { category: "Cameras", items: ["ARRI Alexa 35", "ARRI Alexa Mini LF", "RED V-Raptor 8K VV", "Hasselblad X2D 100C", "Leica M11"] },
      { category: "Optics", items: ["Cooke Anamorphic /i Full Frame Plus", "ARRI Master Anamorphic", "Leica Noctilux 50mm f/0.95", "Zeiss Supreme Prime"] },
      { category: "Finishing & Color", items: ["DaVinci Resolve Studio 19", "Advanced Surface Console", "Sony BVM-HX310 4K HDR Master Monitor"] },
    ]
  },

  videos: [
    {
      id: "showreel-2025",
      youtubeId: "O_NxsX52uNM",
      titleEn: "Akkad Films — Master Showreel 2025",
      titleAr: "شوريـل أفلام العقاد الرئيسي 2025",
      categoryEn: "Director's Cut & Showreel",
      categoryAr: "عرض الأعمال الرئيسي",
      year: "2025",
      roleEn: "Director & Cinematographer",
      roleAr: "المخرج ومدير التصوير",
      descriptionEn: "A cinematic anthology featuring luxury automotive, high-fashion TVCs, narrative cinema, and world-class visual composition.",
      descriptionAr: "بانوراما سينمائية تجمع بين إعلانات السيارات الفاخرة، الأزياء الراقية، الأعمال الدرامية، والبراعة التكوينية الخالصة.",
      thumbnail: "https://i.ytimg.com/vi/O_NxsX52uNM/hqdefault.jpg",
      camera: "ARRI Alexa Mini LF / Cooke Anamorphic",
      aspectRatio: "2.39:1",
      featured: true
    },
    {
      id: "rolex-submariner",
      youtubeId: "tkMdjH0GuzQ",
      titleEn: "The Rolex Submariner ⌛ TVC",
      titleAr: "إعلان رولكس سابمارينر الفاخر",
      categoryEn: "Luxury Commercial",
      categoryAr: "إعلان فاخر وتجاري",
      year: "2021",
      roleEn: "Director & Macro Cinematographer",
      roleAr: "المخرج ومدير تصوير الماكرو",
      descriptionEn: "Precision macro cinematography capturing the perpetual mechanical heart and heritage of the iconic Rolex Submariner timepiece.",
      descriptionAr: "تصوير سينمائي دقيق بالماكرو يبرز الحركة الميكانيكية الخالدة والتفاصيل الدقيقة لساعة رولكس سابمارينر الأيقونية.",
      thumbnail: "https://i.ytimg.com/vi/tkMdjH0GuzQ/hqdefault.jpg",
      camera: "RED Monstro 8K VV / Probe Macro Lens",
      aspectRatio: "16:9",
      featured: true
    },
    {
      id: "hugo-boss",
      youtubeId: "0PIk7MWOd08",
      titleEn: "Hugo Boss Bottled Night | TVC",
      titleAr: "إعلان هوغو بوس بوتلد نايت",
      categoryEn: "Perfume & Lifestyle TVC",
      categoryAr: "إعلان عطور وأسلوب حياة",
      year: "2022",
      roleEn: "Director & Colorist",
      roleAr: "المخرج ومصحح الألوان",
      descriptionEn: "Moody low-key lighting, nocturnal ambiance, and sophisticated chromatic color grading conveying timeless masculine elegance.",
      descriptionAr: "إضاءة درامية خافتة، وأجواء ليلية ساحرة مع تدريج لوني غني يعكس الأناقة والجاذبية الاستثنائية.",
      thumbnail: "https://i.ytimg.com/vi/0PIk7MWOd08/hqdefault.jpg",
      camera: "ARRI Alexa Mini LF / Master Primes",
      aspectRatio: "2.35:1",
      featured: true
    },
    {
      id: "london-ghosts",
      youtubeId: "POQKv4r1agw",
      titleEn: "London 🇬🇧 — The City of Ghosts",
      titleAr: "لندن — مدينة الأطياف",
      categoryEn: "Cinematic Narrative & Doc",
      categoryAr: "عمل سينمائي وثائقي",
      year: "2024",
      roleEn: "Director of Photography",
      roleAr: "مدير التصوير والإخراج",
      descriptionEn: "An evocative atmospheric exploration of London's foggy architecture, subterranean reflections, and solitary shadows.",
      descriptionAr: "استكشاف بصري شاعري لمعمار لندن وأضوائها الضبابية وانعكاسات الظلال في أزقتها التاريخية.",
      thumbnail: "https://i.ytimg.com/vi/POQKv4r1agw/hqdefault.jpg",
      camera: "ARRI Alexa 35 / Vintage Anamorphic",
      aspectRatio: "2.39:1"
    },
    {
      id: "bts-moments",
      youtubeId: "d7qprd0sfMI",
      titleEn: "Moments Behind the Scenes (BTS)",
      titleAr: "كواليس العمل خلف الكاميرا (BTS)",
      categoryEn: "Behind The Scenes",
      categoryAr: "كواليس الإنتاج",
      year: "2023",
      roleEn: "On-Set Director & Crew Leader",
      roleAr: "إدارة موقع التصوير وطاقم العمل",
      descriptionEn: "An authentic, raw glimpse into the precision, crane rigs, lighting setups, and adrenaline on set with Zaid Akkad.",
      descriptionAr: "نظرة حية وصادقة على إيقاع العمل خلف العدسة، الرافعات الضخمة، وضبط الإضاءة السينمائية بقيادة زيد العقاد.",
      thumbnail: "https://i.ytimg.com/vi/d7qprd0sfMI/hqdefault.jpg",
      camera: "Cinema Rig & Steadicam",
      aspectRatio: "16:9"
    },
    {
      id: "isolation",
      youtubeId: "ytK3a88PQLg",
      titleEn: "Isolation ll عُزلة",
      titleAr: "عُزلة ll فيلم سينمائي قصير",
      categoryEn: "Short Film & Drama",
      categoryAr: "فيلم درامي قصير",
      year: "2022",
      roleEn: "Director & Producer",
      roleAr: "المخرج والمنتج",
      descriptionEn: "A psychological visual poem exploring solitude, emotional depth, and silent human resonance.",
      descriptionAr: "قصيدة بصرية سينمائية تستعرض مشاعر الوحدة والعمق النفسي وتجليات الصمت الإنساني.",
      thumbnail: "https://i.ytimg.com/vi/ytK3a88PQLg/hqdefault.jpg",
      camera: "Sony FX9 / Cooke Cine Primes",
      aspectRatio: "2.39:1"
    },
    {
      id: "spacetoon-go",
      youtubeId: "Fv175lhQL3U",
      titleEn: "SpacetoonGo 📺 — Emotional TVC",
      titleAr: "إعلان سبيستون غو العاطفي",
      categoryEn: "Commercial TVC",
      categoryAr: "إعلان تجاري",
      year: "2021",
      roleEn: "Director",
      roleAr: "المخرج",
      descriptionEn: "Touching childhood nostalgia brought to life through warm cinematic color palettes and dynamic family storytelling.",
      descriptionAr: "استحضار نوستالجيا الطفولة من خلال لوحات لونية سينمائية دافئة وسرد بصري عائلي مؤثر.",
      thumbnail: "https://i.ytimg.com/vi/Fv175lhQL3U/hqdefault.jpg",
      camera: "ARRI Alexa Mini / Ultra Primes",
      aspectRatio: "16:9"
    },
    {
      id: "showreel-2019",
      youtubeId: "uEKxGlSg9tE",
      titleEn: "Akkad Pictures — Showreel 2019",
      titleAr: "شوريـل عـقـاد بيكتشرز 2019",
      categoryEn: "Classic Showreel",
      categoryAr: "أرشيف الأعمال",
      year: "2019",
      roleEn: "Director & Editor",
      roleAr: "المخرج والمونتير",
      descriptionEn: "A legacy collection showcasing early milestone international productions, TV commercials, and music videos.",
      descriptionAr: "مختارات كلاسيكية توثق محطات إنتاجية دولية بارزة وأعمال فيديو كليب وإعلانات تلفزيونية.",
      thumbnail: "https://i.ytimg.com/vi/uEKxGlSg9tE/hqdefault.jpg",
      camera: "ARRI Alexa / RED Epic",
      aspectRatio: "16:9"
    }
  ] as ProjectVideo[],

  photographs: [
    {
      id: "photo-01",
      titleEn: "The Anamorphic Silhouette",
      titleAr: "ظلال سينمائية أنامورفيك",
      category: "editorial",
      categoryLabelEn: "Editorial & Cinema",
      categoryLabelAr: "أزياء وسينما",
      imageUrl: "https://static.wixstatic.com/media/e272fc_0168c2a0123d472f920752ddb884154e~mv2.jpg",
      aspectRatio: "landscape",
      exif: {
        camera: "ARRI Alexa Mini LF",
        lens: "Cooke Anamorphic /i 65mm",
        focalLength: "65mm",
        aperture: "f/2.3",
        shutter: "1/48s (180°)",
        iso: "800",
        format: "ARRIRAW 4.5K"
      },
      palette: ["#0e1117", "#c29b62", "#2e3b4e", "#8c7355", "#05070a"],
      descriptionEn: "Cinematic lighting setup with dual tungsten fresnels and cold rim highlights, captured on full frame anamorphic glass.",
      descriptionAr: "إضاءة سينمائية محبوكة بمصابيح تنجستن دافئة مع إضاءة حافة باردة على عدسة أنامورفيك عريضة."
    },
    {
      id: "photo-02",
      titleEn: "Monochrome Gaze",
      titleAr: "نظرة أحادية الملامح",
      category: "editorial",
      categoryLabelEn: "Fine Portraiture",
      categoryLabelAr: "بورتريه فني رفيع",
      imageUrl: "https://static.wixstatic.com/media/e272fc_175ddb461d9b4790b33dbb4efdd3d9bdf000.jpg",
      aspectRatio: "portrait",
      exif: {
        camera: "Hasselblad X2D 100C",
        lens: "XCD 90mm f/2.5 V",
        focalLength: "90mm",
        aperture: "f/2.8",
        shutter: "1/250s",
        iso: "64",
        format: "16-Bit Medium Format RAW"
      },
      palette: ["#121212", "#ffffff", "#4a4a4a", "#8e8e8e", "#252525"],
      descriptionEn: "100-megapixel medium format portrait capturing ultra-fine skin textures and expressive micro-contrast in dramatic monochrome.",
      descriptionAr: "بورتريه بدقة 100 ميغابكسل بمستشعر ميديوم فورمات يبرز أدق تفاصيل الملامح والتباين الدرامي بالأبيض والأسود."
    },
    {
      id: "photo-03",
      titleEn: "Horology Macro Precision",
      titleAr: "دقة الماكرو للساعات الفاخرة",
      category: "product",
      categoryLabelEn: "Luxury Timepieces",
      categoryLabelAr: "منتجات وساعات فاخرة",
      imageUrl: "https://static.wixstatic.com/media/e272fc_f1b1cb29a98e4e5182080bff2b6aa733~mv2.jpg",
      aspectRatio: "square",
      exif: {
        camera: "Hasselblad X2D 100C",
        lens: "XCD 120mm f/3.5 Macro",
        focalLength: "120mm",
        aperture: "f/11",
        shutter: "1/160s",
        iso: "100",
        format: "Focus-Stacked 16-Bit RAW"
      },
      palette: ["#1c1c20", "#cbb179", "#4b443b", "#8a7e6f", "#0a0a0c"],
      descriptionEn: "48-frame focus stack capturing every chamfer, dial brushing, and sapphire crystal anti-reflective coat under controlled studio softboxes.",
      descriptionAr: "دمج بؤري لـ 48 لقطة متعاقبة لإبراز تفاصيل المينا والزجاج الياقوتي والانعكاسات المعدنية بأعلى دقة ممكنة."
    },
    {
      id: "photo-04",
      titleEn: "Haute Parfumerie Refraction",
      titleAr: "انكسارات زجاج العطور الفاخرة",
      category: "product",
      categoryLabelEn: "Commercial Product",
      categoryLabelAr: "تصوير المنتجات التجارية",
      imageUrl: "https://static.wixstatic.com/media/e272fc_3cc5d26fdeb94417a60e6f467959f9eb~mv2.jpg",
      aspectRatio: "portrait",
      exif: {
        camera: "Leica SL2-S",
        lens: "APO-Summicron-SL 75mm f/2",
        focalLength: "75mm",
        aperture: "f/8.0",
        shutter: "1/200s",
        iso: "100",
        format: "DNG 14-Bit"
      },
      palette: ["#111722", "#457b9d", "#a8dadc", "#1d3557", "#050b14"],
      descriptionEn: "Sculpting caustics and amber liquid viscosity using polarized directional backlight grids.",
      descriptionAr: "تطويع انكسارات الضوء وكثافة العطر الذهبي باستخدام شبكات إضاءة خلفية مستقطبة بدقة متناهية."
    },
    {
      id: "photo-05",
      titleEn: "Nocturnal Cityscape Geometry",
      titleAr: "هندسة المدينة في سكون الليل",
      category: "commercial",
      categoryLabelEn: "Commercial Campaign",
      categoryLabelAr: "حملات إعلانية ومعمارية",
      imageUrl: "https://static.wixstatic.com/media/e272fc_fe334fc3fa134147a73bad626636216e~mv2.jpg",
      aspectRatio: "landscape",
      exif: {
        camera: "ARRI Alexa Mini LF",
        lens: "Zeiss Supreme Prime 29mm",
        focalLength: "29mm",
        aperture: "f/1.5",
        shutter: "1/50s",
        iso: "1600",
        format: "ARRIRAW"
      },
      palette: ["#08090f", "#3a4a68", "#d19a66", "#566b8b", "#0f1420"],
      descriptionEn: "High-dynamic range night architectural framing with anamorphic cyan street flares and tungsten window glows.",
      descriptionAr: "تكوين معماري ليلي عالي المدى الديناميكي مع توهجات النيون وأضواء النوافذ التنجستنية الدافئة."
    },
    {
      id: "photo-06",
      titleEn: "High-Speed Fluid Splashes",
      titleAr: "ديناميكية السوائل الفائقة السرعة",
      category: "product",
      categoryLabelEn: "High-Speed Commercial",
      categoryLabelAr: "تصوير فائق السرعة",
      imageUrl: "https://static.wixstatic.com/media/e272fc_9ffad269961e484695cdd945c2058817~mv2.jpg",
      aspectRatio: "portrait",
      exif: {
        camera: "Phantom Flex4K",
        lens: "Cooke S4/i 100mm Macro",
        focalLength: "100mm",
        aperture: "f/5.6",
        shutter: "1/10000s (Flash 1/40000s t0.1)",
        iso: "250",
        format: "Cine RAW 4K"
      },
      palette: ["#0a0a0a", "#386641", "#6a994e", "#a7c957", "#f2e8cf"],
      descriptionEn: "Microsecond laser-triggered liquid suspension capturing droplet crowns in crystal-clear definition.",
      descriptionAr: "التقاط قطرات السوائل المتناثرة بجزء من المليون من الثانية بواسطة ومضات ليزرية فائقة السرعة."
    },
    {
      id: "photo-07",
      titleEn: "Behind the Viewfinder — The Director",
      titleAr: "خلف عدسة المخرج — صناعة اللحظة",
      category: "bts",
      categoryLabelEn: "On-Set Production",
      categoryLabelAr: "كواليس مواقع التصوير",
      imageUrl: "https://static.wixstatic.com/media/e272fc_ceaf88729e274e949d57e7639fbb1aa0~mv2.jpg",
      aspectRatio: "landscape",
      exif: {
        camera: "Leica M11-P",
        lens: "Noctilux-M 50mm f/0.95 ASPH",
        focalLength: "50mm",
        aperture: "f/0.95",
        shutter: "1/500s",
        iso: "400",
        format: "Leica Content Credential RAW"
      },
      palette: ["#141416", "#c59b27", "#444444", "#888888", "#1e1e24"],
      descriptionEn: "Zaid Akkad lining up the hero shot on monitor with wireless focus puller and heavy lighting rig on soundstage.",
      descriptionAr: "المخرج زيد العقاد أثناء توجيه اللقطة الرئيسية عبر شاشة المراقبة مع فريق الفوكس والإضاءة في الاستوديو."
    },
    {
      id: "photo-08",
      titleEn: "Automotive Reflections & Form",
      titleAr: "انسيابية المعدن وإعلانات السيارات",
      category: "commercial",
      categoryLabelEn: "Automotive Commercial",
      categoryLabelAr: "تصوير السيارات التجاري",
      imageUrl: "https://static.wixstatic.com/media/e272fc_d89a211e66a54e57a2caad21384082cb~mv2.jpg",
      aspectRatio: "landscape",
      exif: {
        camera: "ARRI Alexa Mini LF",
        lens: "ARRI Signature Prime 40mm",
        focalLength: "40mm",
        aperture: "f/2.8",
        shutter: "1/50s",
        iso: "800",
        format: "ProRes 4444 XQ"
      },
      palette: ["#0c0f14", "#8a9ba8", "#1c2430", "#405060", "#e0e6ec"],
      descriptionEn: "Continuous 20-meter light bank overhead highlighting the aerodynamic waistline and chrome contours.",
      descriptionAr: "بنك إضاءة بطول 20 متراً ينساب فوق سقف وهيكل السيارة لإظهار الخطوط الديناميكية والانعكاسات المصقولة."
    },
    {
      id: "photo-09",
      titleEn: "The DaVinci Color Suite",
      titleAr: "استوديو تدريج الألوان دافينشي",
      category: "bts",
      categoryLabelEn: "Color Grading Suite",
      categoryLabelAr: "غرفة تصحيح وتدريج الألوان",
      imageUrl: "https://static.wixstatic.com/media/e272fc_4ba3985ad5514893885734b4e6692f2a~mv2.jpg",
      aspectRatio: "landscape",
      exif: {
        camera: "Sony A7S III",
        lens: "FE 24-70mm f/2.8 GM II",
        focalLength: "35mm",
        aperture: "f/2.8",
        shutter: "1/60s",
        iso: "12800",
        format: "Raw Still"
      },
      palette: ["#070709", "#007acc", "#ff5500", "#181a20", "#303440"],
      descriptionEn: "Grading on DaVinci Resolve Studio with calibrated 1000-nit OLED mastering monitor in 18% gray neutral booth.",
      descriptionAr: "جلسة تلوين داخل استوديو دافينشي ريزولف المظلم على شاشات معايرة بدقة 1000 شمعة مع لوحات تحكم تخصصية."
    }
  ] as PhotographItem[],

  colorGradingDemo: {
    titleEn: "DaVinci Resolve 35mm Color Suite",
    titleAr: "استوديو تدريج الألوان دافينشي 35 مم",
    subtitleEn: "Drag the slider to reveal the transformation from flat sensor RAW to rich cinema film emulation.",
    subtitleAr: "اسحب المؤشر لمشاهدة التحول المذهل من خام الكاميرا الباهت (LOG) إلى ألوان السينما 35 مم الغنية.",
    logLabel: "ARRI LogC3 (Sensor RAW)",
    gradeLabel: "Rec.709 35mm Print LUT (Graded)",
    logImage: "https://static.wixstatic.com/media/e272fc_0168c2a0123d472f920752ddb884154e~mv2.jpg",
    gradeImage: "https://static.wixstatic.com/media/e272fc_fe334fc3fa134147a73bad626636216e~mv2.jpg",
    scopes: {
      lutName: "Akkad_Kodak_5219_FilmPrint_v3.cube",
      colorSpace: "ARRI Wide Gamut 4 → Rec.709 D65",
      gamma: "Film 2.4",
      lift: "-0.012",
      gammaVal: "+0.045",
      gain: "+1.080",
      saturation: "112%"
    }
  },

  instagramFeed: [
    {
      id: "ig-1",
      imageUrl: "https://static.wixstatic.com/media/e272fc_20326b6ffcb042d1be39cf7be6b4c3bb~mv2.jpg",
      captionEn: "Framing the golden hour in Istanbul. Anamorphic flares on the Bosphorus with the team. 🎬",
      captionAr: "ضبط كادر الساعة الذهبية في إسطنبول. وهج سينمائي فوق مياه البوسفور مع طاقم العمل. 🎬",
      likes: "4,280",
      comments: "142",
      date: "2 days ago",
      url: "https://www.instagram.com/zaid.akkad/"
    },
    {
      id: "ig-2",
      imageUrl: "https://static.wixstatic.com/media/e272fc_599905d31ba242dfb8a05e61e809a752~mv2.jpg",
      captionEn: "Light, shadows, and precision. High-contrast commercial set in Dubai. ⚡",
      captionAr: "الضوء والظلال والإتقان. موقع تصوير تجاري عالي التباين في دبي. ⚡",
      likes: "5,910",
      comments: "218",
      date: "5 days ago",
      url: "https://www.instagram.com/zaid.akkad/"
    },
    {
      id: "ig-3",
      imageUrl: "https://static.wixstatic.com/media/e272fc_d2e1caf510124ff4b766d6fd60ca3b58~mv2.jpg",
      captionEn: "Color grading session. Dialing in skin tones and deep shadows in the suite. 🎨",
      captionAr: "جلسة تلوين مكثفة. ضبط درجات البشرة وعمق الظلال في استوديو التلوين. 🎨",
      likes: "3,840",
      comments: "98",
      date: "1 week ago",
      url: "https://www.instagram.com/zaid.akkad/"
    },
    {
      id: "ig-4",
      imageUrl: "https://static.wixstatic.com/media/e272fc_f226a2993a324da2b2f078058ed47cbc~mv2.jpg",
      captionEn: "On set with the heavy crane rig. Pushing visual boundaries every single take. 🎥",
      captionAr: "في موقع التصوير مع رافعة الكاميرا السينمائية. نبتكر في كل لقطة ومسار. 🎥",
      likes: "6,410",
      comments: "310",
      date: "2 weeks ago",
      url: "https://www.instagram.com/zaid.akkad/"
    }
  ] as InstagramPost[]
};
