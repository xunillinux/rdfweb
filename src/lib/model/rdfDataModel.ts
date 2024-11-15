export type RdfWebData = {
  feature: Feature;
  concerts: Concert[];
  members: Member[];
  presstexts: PressText[];
  links: Link[];
  socialMediaLinks: SocialMediaLinksType;
}

export type Feature = {
  image: string; // should be blob
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
  marginBottom?: string;
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
  image: string; // should be blob
}