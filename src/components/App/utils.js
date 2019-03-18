import { Asset, Font } from 'expo';

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map((font) => Font.loadAsync(font));
}

/**
 * https://docs.expo.io/versions/latest/guides/preloading-and-caching-assets/
 */
export async function loadAssets(images, fonts) {
  const imageAssets = cacheImages(images);
  const fontAssets = cacheFonts(fonts);
  await Promise.all([...imageAssets, ...fontAssets]);
}
