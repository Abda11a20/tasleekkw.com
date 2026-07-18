export interface Service {
  id: string;
  title: string;
  icon: string;
  desc: string;
  color?: string;
}

export interface AreaGroup {
  governorate: string;
  areas: string[];
}

export interface Feature {
  id: string;
  title: string;
  icon: string;
  desc: string;
}
