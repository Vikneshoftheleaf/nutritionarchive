export type Category =
  | "fruit"
  | "vegetable"
  | "grain"
  | "meat"
  | "seafood"
  | "dairy"
  | "legume"
  | "beverage"
  | "herb_or_spice"
  | "nut_or_seed"
  | "oil_or_fat"
  | "egg"
  | "other";

export interface Serving {
  description: string;
  grams: number;
}

export interface Per100g {
  calories_kcal: number;
  protein_g: number;
  carbs_g: number;
  fiber_g: number;
  sugars_g: number;
  fat_g: number;
  saturated_fat_g: number;
  sodium_mg: number;
  water_g: number;
}

export interface Micronutrient {
  name: string;
  amount_per_100g: string;
  daily_value_percent: number;
}

export interface HealthBenefit {
  title: string;
  explanation: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export type GlycemicIndexCategory = "low" | "medium" | "high" | "not_applicable";

export interface NutritionItem {
  slug: string;
  keyword: string;
  name: string;
  category: Category;
  intro: string;
  serving: Serving;
  per_100g: Per100g;
  key_micronutrients: Micronutrient[];
  glycemic_index_category: GlycemicIndexCategory;
  health_benefits: HealthBenefit[];
  things_to_consider: string[];
  serving_ideas: string[];
  storage_tip: string;
  faqs: Faq[];
  meta_title: string;
  meta_description: string;
}
