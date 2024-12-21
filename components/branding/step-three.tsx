import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { BrandingFormData, fontStyles } from "@/types/branding";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StepThreeProps {
  form: UseFormReturn<BrandingFormData>;
}

export function StepThree({ form }: StepThreeProps) {
  const selectedFonts = form.watch("step3.fontStyles");

  const handleFontSelect = (font: string, field: any) => {
    const currentFonts = field.value || [];
    if (currentFonts.includes(font)) {
      field.onChange(currentFonts.filter((f: string) => f !== font));
    } else if (currentFonts.length < 4) {
      field.onChange([...currentFonts, font]);
    }
  };

  return (
    <div className='space-y-6'>
      <FormField
        control={form.control}
        name='step3.fontStyles'
        render={({ field }) => (
          <FormItem className='space-y-4'>
            <FormLabel>Choose Font Styles (Up to 4)</FormLabel>
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
              {fontStyles.map((style) => (
                <Card
                  key={style}
                  className={cn("cursor-pointer transition-all hover:border-primary", field.value?.includes(style) ? "border-2 border-primary" : "border-border")}
                  onClick={() => handleFontSelect(style, field)}
                >
                  <CardContent className='p-4'>
                    <p className='text-center font-medium capitalize'>{style.charAt(0).toUpperCase() + style.slice(1)}</p>
                    <p className='text-center text-sm text-muted-foreground'>{field.value?.includes(style) && `Selected (${field.value.indexOf(style) + 1} of 4)`}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            {selectedFonts?.length === 4 && <p className='text-sm text-muted-foreground'>Maximum of 4 fonts selected</p>}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
