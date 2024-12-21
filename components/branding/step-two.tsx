import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { BrandingFormData, logoStyles } from "@/types/branding";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StepTwoProps {
  form: UseFormReturn<BrandingFormData>;
}

const logoStyleExamples = {
  abstract: "/examples/abstract-logo.svg",
  geometric: "/examples/geometric-logo.svg",
  textOnly: "/examples/text-logo.svg",
  textWithArt: "/examples/text-art-logo.svg",
  iconic: "/examples/iconic-logo.svg",
};

export function StepTwo({ form }: StepTwoProps) {
  return (
    <div className='space-y-6'>
      <FormField
        control={form.control}
        name='step2.logoStyle'
        render={({ field }) => (
          <FormItem className='space-y-4'>
            <FormLabel>Choose Logo Style</FormLabel>
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
              {logoStyles.map((style) => (
                <Card
                  key={style}
                  className={cn("cursor-pointer transition-all hover:border-primary", field.value === style ? "border-2 border-primary" : "border-border")}
                  onClick={() => field.onChange(style)}
                >
                  <CardContent className='p-4'>
                    <div className='aspect-square relative mb-2'>
                      <img src={logoStyleExamples[style]} alt={style} className='object-contain' />
                    </div>
                    <p className='text-center font-medium capitalize'>{style.replace(/([A-Z])/g, " $1").trim()}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
