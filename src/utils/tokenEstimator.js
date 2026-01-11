// Estimasi kasar: 1 token ≈ 4 karakter
export function estimateTokens(text = "") {
  return Math.ceil(text.length / 4);
}
