import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { BrandingFormData } from "@/types/branding";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StepFourProps {
  form: UseFormReturn<BrandingFormData>;
}

const colorTypes = ["primary", "secondary", "tertiary"] as const;

export function StepFour({ form }: StepFourProps) {
  const colors = form.watch("step4.colors");

  const addColor = () => {
    const currentColors = form.getValues("step4.colors") || [];
    form.setValue("step4.colors", [...currentColors, { color: "#000000", type: "primary" }]);
  };

  const removeColor = (index: number) => {
    const currentColors = form.getValues("step4.colors") || [];
    form.setValue(
      "step4.colors",
      currentColors.filter((_, i) => i !== index)
    );
  };

  return (
    <div className='space-y-6'>
      <FormField
        control={form.control}
        name='step4.colors'
        render={({ field }) => (
          <FormItem className='space-y-4'>
            <FormLabel>Brand Colors</FormLabel>
            <div className='space-y-4'>
              {colors?.map((_, index) => (
                <div key={index} className='flex gap-4 items-end'>
                  <div className='flex-1'>
                    <FormField
                      control={form.control}
                      name={`step4.colors.${index}.color`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Color {index + 1}</FormLabel>
                          <div className='flex gap-2'>
                            <Input type='color' className='w-12 h-10 p-1' {...field} />
                            <Input type='text' placeholder='#000000' value={field.value} onChange={(e) => field.onChange(e.target.value)} />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='flex-1'>
                    <FormField
                      control={form.control}
                      name={`step4.colors.${index}.type`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder='Select type' />
                            </SelectTrigger>
                            <SelectContent>
                              {colorTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type.charAt(0).toUpperCase() + type.slice(1)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type='button' variant='outline' size='icon' className='mb-2' onClick={() => removeColor(index)}>
                    ×
                  </Button>
                </div>
              ))}
            </div>
            <Button type='button' variant='outline' onClick={addColor} className='w-full'>
              Add Color
            </Button>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
