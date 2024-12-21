import { z } from "zod";

export const logoStyles = ["abstract", "geometric", "textOnly", "textWithArt", "iconic"] as const;

export const fontStyles = [
  "childish",
  "smooth",
  "handwritten",
  "rounded",
  "texture",
  "brush",
  "tall",
  "trendy",
  "bold",
  "thin",
  "masculine",
  "classy",
  "retro",
  "elegant",
  "delicate",
  "cute",
] as const;

export const languages = ["arabic", "english", "mix"] as const;

export const deliverables = ["logo", "brandingStory", "colorPalette", "fonts", "packaging", "menuDesigns", "mockups", "socialMediaDesigns", "assets"] as const;

export const brandingFormSchema = z.object({
  step1: z.object({
    brandName: z.string().optional(),
    language: z.enum(languages),
  }),
  step2: z.object({
    logoStyle: z.enum(logoStyles),
  }),
  step3: z.object({
    fontStyles: z.array(z.enum(fontStyles)).min(1).max(4),
  }),
  step4: z.object({
    colors: z
      .array(
        z.object({
          color: z.string(),
          type: z.enum(["primary", "secondary", "tertiary"]),
        })
      )
      .min(1),
  }),
  step5: z.object({
    deliverables: z.array(z.enum(deliverables)).min(1),
  }),
});

export type BrandingFormData = z.infer<typeof brandingFormSchema>;

export type BrandingStep = "step1" | "step2" | "step3" | "step4" | "step5";
