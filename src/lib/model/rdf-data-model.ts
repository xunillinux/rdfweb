export type RdfWebData = {
  headerImages: HeaderImage[];
  feature: Feature;
  concerts: Concert[];
  members: Member[];
  presstexts: PressText[];
  links: Link[];
  socialMediaLinks: SocialMediaLinksType;
}

export type HeaderImage = {
  src: string;
  category: ImageCategory;
}

export enum ImageCategory {
  Portrait = "portrait",
  Landscape = "landscape"
}

export type Feature = {
  image: string;
  heading: string;
  subheading: string;
  caption: string;
  featureLinks: Link[];
}

export type Concert = {
  date: Date;
  name: string;
  location: string;
}

export type Link = {
  text: string;
  href: string;
}

export type SocialMediaLinksType = {
  linkInstagram?: string;
  linkYoutube?: string;
  linkSpotify?: string;
  linkFacebook?: string;
}

export type PressText = {
  language: string;
  text: string;
}

export type Member = {
  name: string;
  role: string;
  image: string;
}