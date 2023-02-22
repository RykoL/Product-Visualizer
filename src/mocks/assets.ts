import { Asset, AssetType } from "../assets/domain/Asset";
import { Product } from "../assets/domain/Product";

export const studioEnvironment = new Asset(
  "2",
  "studio",
  "assets/brown_photostudio_02_4k.hdr",
  AssetType.HDRI
);

export const cozyStudioEnvironment = new Asset(
  "3",
  "studio",
  "assets/christmas_photo_studio_06_4k.hdr",
  AssetType.HDRI
);

export const beachEnvironment = new Asset(
  "4",
  "beach",
  "assets/blouberg_sunrise_2_4k.hdr",
  AssetType.HDRI
);

export const avocadoAsset = new Asset(
  "1",
  "avocado",
  "assets/Avocado.gltf",
  AssetType.GLTF
);
export const avocadoProduct = new Product("1", "avocado", [avocadoAsset]);

export const Products: Product[] = [avocadoProduct];
