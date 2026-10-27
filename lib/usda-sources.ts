import rawSourceMap from "@/data/usda-source-map.json";

export interface VerifiedUsdaSource {
  fdcId: number;
  sourceUrl: string;
  dataType: string;
  description: string;
  preparationMatch: string;
  checkedOn: string;
  notes: string;
}

interface CheckedCandidate {
  fdcId: number;
  dataType: string;
  description: string;
  checkedOn: string;
  notes: string;
}

interface UsdaSourceMap {
  verified: Record<string, VerifiedUsdaSource>;
  checkedCandidates: Record<string, CheckedCandidate>;
}

const sourceMap = rawSourceMap as UsdaSourceMap;

export function getVerifiedUsdaSource(
  foodSlug: string,
): VerifiedUsdaSource | undefined {
  const source = sourceMap.verified[foodSlug];
  if (!source) return undefined;

  let url: URL;
  try {
    url = new URL(source.sourceUrl);
  } catch {
    return undefined;
  }

  if (
    url.protocol !== "https:" ||
    url.hostname !== "fdc.nal.usda.gov" ||
    !Number.isInteger(source.fdcId) ||
    !source.dataType.trim() ||
    !source.description.trim() ||
    !source.preparationMatch.trim() ||
    !/^\d{4}-\d{2}-\d{2}$/.test(source.checkedOn) ||
    !source.notes.trim()
  ) {
    return undefined;
  }

  return source;
}
