export const DEFAULT_TTL = Number(process.env.CACHE_TTL) || 300;

export const TTL_MAP = {
  weather: 300,
  nasa: 3600,
  news: 600,
  youtube: 900,
  github: 180,
  unsplash: 1800,
  pexels: 1800
};
