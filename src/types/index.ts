export type Project = {
  slug: string;
  name: string;
  label: string;
  year: string;
  description: string;
  problem: string;
  solution: string;
  contribution: string;
  architecture: string;
  stack: string[];
  github: string;
  accent: string;
  team?: string;
  duration?: string;
  database?: string;
  challenges?: string;
  learned?: string;
  process?: string[];
  architectureNodes?: string[];
  contributions?: string[];
  screenshots?: string[];
  /* Opsional: path gambar untuk tiap screenshot (urutannya sama dengan `screenshots`).
     Kalau kosong dipakai /projects/<slug>/screenshot-<nomor>.png dari folder public. */
  screenshotImages?: string[];
};