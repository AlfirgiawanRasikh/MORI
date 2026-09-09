// Optional preparation of checked-in derivatives. The reference originals remain intact.
import sharp from "sharp";
for (const name of ["hero", "pause", "privacy"]) {
  const source = `public/images/${name}.webp`;
  const { width: originalWidth } = await sharp(source).metadata();
  for (const width of [400, 640, 960, 1280].filter((w) => w < originalWidth)) {
    await sharp(source)
      .resize({ width })
      .webp({ quality: 80, effort: 6 })
      .toFile(`public/images/${name}-${width}.webp`);
  }
}
