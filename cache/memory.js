const store = new Map();

export function getMemory(key) {
  const data = store.get(key);
  if (!data) return null;

  if (Date.now() > data.expireAt) {
    store.delete(key);
    return null;
  }

  return data.value;
}

export function setMemory(key, value, ttl) {
  store.set(key, {
    value,
    expireAt: Date.now() + ttl * 1000
  });
}
