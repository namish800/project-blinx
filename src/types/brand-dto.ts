export interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
}

export interface Logo {
  id: string;
  url: string;
}

export interface Font {
  id: string;
  name: string;
  usage: string;
}

export interface TextStyleItem {
  id: string;
  title: string;
  description: string;
}

export interface Term {
  id: string;
  text: string;
}

export interface Rules {
  preferredTerms: Term[];
  termsToAvoid: Term[];
}

export interface BrandDTO {
  name: string;
  description: string;
  brandStyle: {
    colorPalettes: ColorPalette[];
    logos: Logo[];
    fonts: Font[];
  };
  textStyleGuide: {
    values: TextStyleItem[];
    tones: TextStyleItem[];
    rules: Rules;
  };
  language: string;
}


export interface Brand {
  id: string;
  name: string;
  description: string;
}