import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { BrandingFormData, deliverables } from "@/types/branding";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepFiveProps {
  form: UseFormReturn<BrandingFormData>;
}

const deliverableIcons: Record<string, string> = {
  logo: "🎨",
  brandingStory: "📖",
  colorPalette: "🎨",
  fonts: "🔤",
  packaging: "📦",
  menuDesigns: "📋",
  mockups: "💻",
  socialMediaDesigns: "📱",
  assets: "🗂️",
};

export function StepFive({ form }: StepFiveProps) {
  const handleDeliverableSelect = (deliverable: string, field: any) => {
    const currentDeliverables = field.value || [];
    if (currentDeliverables.includes(deliverable)) {
      field.onChange(currentDeliverables.filter((d: string) => d !== deliverable));
    } else {
      field.onChange([...currentDeliverables, deliverable]);
    }
  };

  return (
    <div className='space-y-6'>
      <FormField
        control={form.control}
        name='step5.deliverables'
        render={({ field }) => (
          <FormItem className='space-y-4'>
            <FormLabel>What would you like to receive?</FormLabel>
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
              {deliverables.map((deliverable) => (
                <Card
                  key={deliverable}
                  className={cn("cursor-pointer transition-all hover:border-primary relative", field.value?.includes(deliverable) ? "border-2 border-primary" : "border-border")}
                  onClick={() => handleDeliverableSelect(deliverable, field)}
                >
                  {field.value?.includes(deliverable) && (
                    <div className='absolute top-2 right-2 text-primary'>
                      <Check size={16} />
                    </div>
                  )}
                  <CardContent className='p-4'>
                    <div className='text-center text-2xl mb-2'>{deliverableIcons[deliverable]}</div>
                    <p className='text-center font-medium'>
                      {deliverable
                        .replace(/([A-Z])/g, " $1")
                        .trim()
                        .split(" ")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
