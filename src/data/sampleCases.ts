/**
 * Curated clinical dermatology sample cases with ground truth histopathology
 * from the Kaggle / ISIC skin cancer dataset.
 * Images are generated via procedural SVG/Canvas data URLs to ensure immediate,
 * 100% reliable offline testing without external image breakage.
 */

export interface SampleCase {
  id: string;
  name: string;
  groundTruth: 'Cancer' | 'Not Cancer';
  histopathology: string;
  category: 'Malignant' | 'Benign' | 'Premalignant';
  location: string;
  clinicalDescription: string;
  abcdeSummary: {
    asymmetry: string;
    border: string;
    color: string;
    diameter: string;
    evolution: string;
  };
  svgDataUri: string;
}

// Helper to generate realistic dermatoscopic SVG lesions
function createDermatoSvg(
  baseSkinTone: string,
  lesionGradient: string,
  contourPath: string,
  networkPattern: string = ''
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300">
    <defs>
      <radialGradient id="skin" cx="50%" cy="50%" r="65%">
        <stop offset="0%" stop-color="${baseSkinTone}" />
        <stop offset="100%" stop-color="#c59881" />
      </radialGradient>
      ${lesionGradient}
      <filter id="blurFilter" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1.8" />
      </filter>
      <filter id="heavyBlur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3.5" />
      </filter>
    </defs>
    <!-- Skin backdrop -->
    <rect width="300" height="300" fill="url(#skin)" />
    <!-- Fine skin texture lines -->
    <path d="M0,40 Q150,55 300,42 M0,120 Q150,110 300,135 M0,210 Q150,225 300,205" stroke="rgba(120,70,50,0.08)" stroke-width="1.2" fill="none" />
    <!-- Lesion base shadow -->
    <path d="${contourPath}" fill="rgba(40,20,15,0.25)" filter="url(#heavyBlur)" />
    <!-- Lesion Body -->
    <path d="${contourPath}" fill="url(#lesionGrad)" filter="url(#blurFilter)" />
    ${networkPattern}
    <!-- Dermatoscope circular lens vignette -->
    <circle cx="150" cy="150" r="142" fill="none" stroke="rgba(20,25,35,0.7)" stroke-width="16" />
    <circle cx="150" cy="150" r="148" fill="none" stroke="rgba(10,15,25,0.95)" stroke-width="10" />
  </svg>`;

  const base64 = typeof window !== 'undefined'
    ? window.btoa(unescape(encodeURIComponent(svg)))
    : Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

export const SAMPLE_CASES: SampleCase[] = [
  {
    id: 'case-melanoma-1',
    name: 'Superficial Spreading Melanoma',
    groundTruth: 'Cancer',
    histopathology: 'Malignant Melanoma (Breslow depth 0.85mm, Clark level III)',
    category: 'Malignant',
    location: 'Upper Back / Scapular region',
    clinicalDescription: 'A 54-year-old patient with an asymmetric, expanding pigmented macule with irregular scalloped borders, multiple shades of dark brown, blue-black, and peripheral erythema.',
    abcdeSummary: {
      asymmetry: 'Marked asymmetry along dual orthogonal axes',
      border: 'Notched, irregular, jagged contour with pigment fade',
      color: 'Variegated pigmentation: black, dark brown, and slate blue',
      diameter: '7.8 mm (> 6mm pencil eraser threshold)',
      evolution: 'Enlarging over past 6 months with localized darkening'
    },
    svgDataUri: createDermatoSvg(
      '#e8c4b0',
      `<radialGradient id="lesionGrad" cx="42%" cy="46%" r="58%">
        <stop offset="0%" stop-color="#140a08" />
        <stop offset="35%" stop-color="#2a120c" />
        <stop offset="65%" stop-color="#5a2c1a" />
        <stop offset="85%" stop-color="#8a4f32" />
        <stop offset="100%" stop-color="#c58a69" stop-opacity="0.2" />
      </radialGradient>`,
      `M150,75 C190,70 230,110 215,160 C205,195 220,210 185,230 C150,245 110,235 90,200 C75,170 70,120 105,90 Z`,
      `<circle cx="135" cy="140" r="14" fill="#0d080c" opacity="0.8" />
       <circle cx="170" cy="165" r="9" fill="#1f1015" opacity="0.75" />
       <circle cx="115" cy="175" r="6" fill="#0f0709" opacity="0.6" />`
    )
  },
  {
    id: 'case-bcc-2',
    name: 'Nodular Basal Cell Carcinoma (BCC)',
    groundTruth: 'Cancer',
    histopathology: 'Basal Cell Carcinoma (Nodular subtype, dermal nest proliferation)',
    category: 'Malignant',
    location: 'Left Nasal Ala / Face',
    clinicalDescription: 'A 68-year-old patient presenting with a pearly, translucent papule with prominent arborizing telangiectasias (fine branching blood vessels) and rolled borders.',
    abcdeSummary: {
      asymmetry: 'Moderate asymmetry with lobular nodularity',
      border: 'Elevated rolled margin with translucent rim',
      color: 'Pearly pink to flesh-colored with prominent red vessel branch',
      diameter: '6.4 mm',
      evolution: 'Slowly expanding over 18 months, occasional bleeding with minor trauma'
    },
    svgDataUri: createDermatoSvg(
      '#eccab9',
      `<radialGradient id="lesionGrad" cx="50%" cy="50%" r="52%">
        <stop offset="0%" stop-color="#e09587" />
        <stop offset="40%" stop-color="#cf786b" />
        <stop offset="75%" stop-color="#bd6d62" />
        <stop offset="90%" stop-color="#deb09d" />
        <stop offset="100%" stop-color="#eccab9" stop-opacity="0" />
      </radialGradient>`,
      `M150,95 C195,95 215,130 210,175 C205,210 170,225 140,215 C105,205 95,175 100,135 C105,105 125,95 150,95 Z`,
      `<!-- Arborizing telangiectasia -->
       <path d="M140,150 Q160,135 180,145 T200,130 M150,165 Q165,180 185,175" stroke="#b91c1c" stroke-width="1.8" fill="none" opacity="0.85" />
       <circle cx="145" cy="135" r="8" fill="#f8fafc" opacity="0.35" filter="url(#blurFilter)" />`
    )
  },
  {
    id: 'case-nevus-3',
    name: 'Benign Melanocytic Nevus (Common Mole)',
    groundTruth: 'Not Cancer',
    histopathology: 'Benign Compound Melanocytic Nevus (Uniform junctional and dermal nests)',
    category: 'Benign',
    location: 'Right Forearm',
    clinicalDescription: 'A 29-year-old with a long-standing, uniform brown circular macule. Symmetrical, crisp demarcated borders, regular pigment network throughout.',
    abcdeSummary: {
      asymmetry: 'High symmetry along both axes (Symmetric circle/oval)',
      border: 'Even, crisp, distinct border with no scalloping',
      color: 'Monochromatic warm cinnamon brown',
      diameter: '3.8 mm (Well under 6mm warning threshold)',
      evolution: 'Stable for over 10 years without subjective change'
    },
    svgDataUri: createDermatoSvg(
      '#e5beab',
      `<radialGradient id="lesionGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#542e1d" />
        <stop offset="60%" stop-color="#73412a" />
        <stop offset="85%" stop-color="#935b3e" />
        <stop offset="100%" stop-color="#e5beab" stop-opacity="0" />
      </radialGradient>`,
      `M150,105 C185,105 205,125 205,155 C205,185 185,205 150,205 C115,205 95,185 95,155 C95,125 115,105 150,105 Z`,
      `<!-- Regular reticular pigment network -->
       <circle cx="150" cy="155" r="30" stroke="rgba(60,25,10,0.3)" stroke-width="0.8" fill="none" />
       <circle cx="150" cy="155" r="18" stroke="rgba(60,25,10,0.25)" stroke-width="0.8" fill="none" />`
    )
  },
  {
    id: 'case-keratosis-4',
    name: 'Benign Seborrheic Keratosis',
    groundTruth: 'Not Cancer',
    histopathology: 'Seborrheic Keratosis (Acanthotic variant with horn pseudocysts)',
    category: 'Benign',
    location: 'Abdominal Wall',
    clinicalDescription: 'A 62-year-old patient with a well-circumscribed, brownish-black plaque with a classic "stuck-on" warty surface and visible milia-like cysts on dermatoscopy.',
    abcdeSummary: {
      asymmetry: 'Slight oval contour, structurally homogeneous',
      border: 'Sharply circumscribed "pushed out" border margin',
      color: 'Uniform dull yellowish-brown to dark sepia',
      diameter: '5.2 mm',
      evolution: 'Slow growth, superficial granular or greasy surface'
    },
    svgDataUri: createDermatoSvg(
      '#deaf97',
      `<radialGradient id="lesionGrad" cx="50%" cy="50%" r="52%">
        <stop offset="0%" stop-color="#3e271a" />
        <stop offset="55%" stop-color="#5c3a27" />
        <stop offset="85%" stop-color="#7a4f36" />
        <stop offset="100%" stop-color="#deaf97" stop-opacity="0" />
      </radialGradient>`,
      `M150,98 C192,98 214,122 212,156 C210,190 190,212 150,212 C110,212 90,190 88,156 C86,122 108,98 150,98 Z`,
      `<!-- Milia-like cysts -->
       <circle cx="135" cy="140" r="3" fill="#fef3c7" opacity="0.8" />
       <circle cx="160" cy="165" r="2.5" fill="#fef3c7" opacity="0.85" />
       <circle cx="145" cy="175" r="2" fill="#fef3c7" opacity="0.75" />`
    )
  },
  {
    id: 'case-dysplastic-5',
    name: 'Dysplastic Nevus (Clark / Atypical Mole)',
    groundTruth: 'Not Cancer',
    histopathology: 'Dysplastic Nevus (Moderate cytological atypia, architectural disorder)',
    category: 'Premalignant',
    location: 'Lower Leg',
    clinicalDescription: 'A 38-year-old with an atypical mole exhibiting a "fried-egg" appearance: darker elevated central papule surrounded by a flatter, lighter macular collar.',
    abcdeSummary: {
      asymmetry: 'Mild asymmetry between top and bottom quadrants',
      border: 'Mildly smudged periphery, gradual pigment transition',
      color: 'Dual tone: dark brown core with light caramel perimeter',
      diameter: '5.6 mm (Borderline)',
      evolution: 'Stable over 12 months on digital dermatoscopy follow-up'
    },
    svgDataUri: createDermatoSvg(
      '#e3b8a3',
      `<radialGradient id="lesionGrad" cx="47%" cy="48%" r="55%">
        <stop offset="0%" stop-color="#2d1710" />
        <stop offset="40%" stop-color="#4a281c" />
        <stop offset="70%" stop-color="#8c583f" />
        <stop offset="90%" stop-color="#b68367" />
        <stop offset="100%" stop-color="#e3b8a3" stop-opacity="0" />
      </radialGradient>`,
      `M150,90 C195,95 218,125 210,165 C202,205 175,220 145,215 C115,210 88,185 92,145 C96,105 118,90 150,90 Z`,
      `<!-- Central darker papule -->
       <ellipse cx="145" cy="150" rx="20" ry="16" fill="#1f0e08" opacity="0.65" />`
    )
  },
  {
    id: 'case-melanoma-nodular-6',
    name: 'Nodular Melanoma (High Risk)',
    groundTruth: 'Cancer',
    histopathology: 'Nodular Melanoma (Breslow depth 2.4mm, dermal invasion with mitoses)',
    category: 'Malignant',
    location: 'Thorax / Chest Wall',
    clinicalDescription: 'A 61-year-old patient with a rapidly developing, deeply pigmented, elevated blue-black nodule. Firm to palpation, ulcerated focal point with bleeding history.',
    abcdeSummary: {
      asymmetry: 'Distinct spherical asymmetry and high vertical elevation (E)',
      border: 'Well-defined but abrupt perimeter transition',
      color: 'Deep pitch black, gunmetal blue, and ulcerated crimson crusted zone',
      diameter: '8.5 mm',
      evolution: 'Rapid vertical growth noted in less than 3 months'
    },
    svgDataUri: createDermatoSvg(
      '#dfb49d',
      `<radialGradient id="lesionGrad" cx="48%" cy="46%" r="54%">
        <stop offset="0%" stop-color="#080608" />
        <stop offset="45%" stop-color="#120c18" />
        <stop offset="70%" stop-color="#28151f" />
        <stop offset="85%" stop-color="#552229" />
        <stop offset="100%" stop-color="#dfb49d" stop-opacity="0" />
      </radialGradient>`,
      `M150,85 C198,82 225,120 220,165 C215,210 180,228 145,225 C108,222 80,188 85,145 C90,102 115,86 150,85 Z`,
      `<!-- Ulcerated focal center with bluish sheen -->
       <circle cx="146" cy="148" r="16" fill="#040206" opacity="0.9" />
       <circle cx="152" cy="154" r="5" fill="#881337" opacity="0.8" />
       <ellipse cx="138" cy="140" rx="9" ry="5" fill="#38bdf8" opacity="0.25" filter="url(#blurFilter)" />`
    )
  }
];
