import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrandingFormData, languages } from "@/types/branding";

interface StepOneProps {
  form: UseFormReturn<BrandingFormData>;
}

export function StepOne({ form }: StepOneProps) {
  return (
    <div className='space-y-6'>
      <FormField
        control={form.control}
        name='step1.brandName'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Brand Name (Optional)</FormLabel>
            <FormControl>
              <Input placeholder='Enter your brand name' {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='step1.language'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Language</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder='Select language' />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
