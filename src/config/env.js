function need(n){ if(!process.env[n]) throw new Error(`ENV ${n} wajib`); return process.env[n]; }

export const env = {
  enable:{
    openai:process.env.ENABLE_OPENAI==="true",
    youtube:process.env.ENABLE_YOUTUBE==="true",
    weather:process.env.ENABLE_OPENWEATHER==="true",
    nasa:process.env.ENABLE_NASA==="true",
    unsplash:process.env.ENABLE_UNSPLASH==="true",
    pexels:process.env.ENABLE_PEXELS==="true",
    news:process.env.ENABLE_NEWS==="true",
    storage:process.env.ENABLE_STORAGE==="true",
  },
  openai:{ key: need("OPENAI_API_KEY") },
  youtube:{ key: need("YOUTUBE_API_KEY") },
  weather:{ key: need("OPENWEATHER_API_KEY") },
  nasa:{ key: need("NASA_API_KEY") },
  unsplash:{ key: need("UNSPLASH_ACCESS_KEY") },
  pexels:{ key: need("PEXELS_KEY") },
  news:{ key: need("NEWS_API_KEY") },
  s3:{
    accessKey: need("S3_ACCESS_KEY_ID"),
    secretKey: need("S3_SECRET_ACCESS_KEY"),
    endpoint: need("S3_ENDPOINT"),
    bucket: need("S3_BUCKET")
  }
};
