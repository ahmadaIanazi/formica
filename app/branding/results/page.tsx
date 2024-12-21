"use client";

import { useEffect, useRef, useState } from "react";
import { getCookie, deleteCookie } from "cookies-next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrandingFormData } from "@/types/branding";
import { Share2 } from "lucide-react";

export default function ResultsPage() {
  const [formData, setFormData] = useState<BrandingFormData | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    const data = getCookie("brandingData");
    if (data) {
      setFormData(JSON.parse(data as string));
    }
    // Check if Web Share API is available
    setCanShare(!!navigator.share);
  }, []);

  const exportAsPDF = async () => {
    if (!resultRef.current) return;
    setIsGenerating(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = resultRef.current;
      const opt = {
        margin: 1,
        filename: "branding-results.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };
      await html2pdf().set(opt).from(element).save();
      deleteCookie("brandingData");
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
    setIsGenerating(false);
  };

  const exportAsImage = async () => {
    if (!resultRef.current) return;
    setIsGenerating(true);
    try {
      const domtoimage = (await import("dom-to-image-improved")).default;
      const dataUrl = await domtoimage.toPng(resultRef.current);
      const link = document.createElement("a");
      link.download = "branding-results.png";
      link.href = dataUrl;
      link.click();
      deleteCookie("brandingData");
    } catch (error) {
      console.error("Failed to generate image:", error);
    }
    setIsGenerating(false);
  };

  const shareResult = async () => {
    if (!resultRef.current) return;
    setIsSharing(true);
    try {
      const domtoimage = (await import("dom-to-image-improved")).default;
      const dataUrl = await domtoimage.toPng(resultRef.current);

      // Convert data URL to Blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      // Create file from blob
      const file = new File([blob], "branding-results.png", { type: "image/png" });

      // Share data
      await navigator.share({
        title: "My Brand Identity",
        text: "Check out my brand identity design!",
        files: [file],
      });
    } catch (error) {
      console.error("Failed to share:", error);
      // Fallback to regular image download if sharing fails
      await exportAsImage();
    }
    setIsSharing(false);
  };

  if (!formData) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p>No branding data found. Please complete the form first.</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto'>
        <div className='space-y-8'>
          <div ref={resultRef}>
            <Card>
              <CardHeader>
                <CardTitle>Your Branding Details</CardTitle>
              </CardHeader>
              <CardContent className='space-y-6'>
                {formData.step1.brandName && (
                  <div>
                    <h3 className='font-semibold mb-2'>Brand Name</h3>
                    <p className='text-muted-foreground'>{formData.step1.brandName}</p>
                  </div>
                )}

                <div>
                  <h3 className='font-semibold mb-2'>Language</h3>
                  <p className='text-muted-foreground capitalize'>{formData.step1.language}</p>
                </div>

                <div>
                  <h3 className='font-semibold mb-2'>Logo Style</h3>
                  <p className='text-muted-foreground capitalize'>{formData.step2.logoStyle.replace(/([A-Z])/g, " $1").trim()}</p>
                </div>

                <div>
                  <h3 className='font-semibold mb-2'>Font Styles</h3>
                  <div className='flex gap-2 flex-wrap'>
                    {formData.step3.fontStyles.map((font, index) => (
                      <div key={index} className='px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800'>
                        {font.charAt(0).toUpperCase() + font.slice(1)}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className='font-semibold mb-2'>Brand Colors</h3>
                  <div className='space-y-2'>
                    {formData.step4.colors.map((color, index) => (
                      <div key={index} className='flex items-center gap-2'>
                        <div className='w-6 h-6 rounded-full border' style={{ backgroundColor: color.color }} />
                        <span className='text-muted-foreground'>
                          {color.color} ({color.type})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className='font-semibold mb-2'>Deliverables</h3>
                  <div className='flex gap-2 flex-wrap'>
                    {formData.step5.deliverables.map((deliverable, index) => (
                      <div key={index} className='px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800'>
                        {deliverable
                          .replace(/([A-Z])/g, " $1")
                          .trim()
                          .split(" ")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className='flex gap-4 justify-center flex-wrap'>
            <Button onClick={exportAsPDF} disabled={isGenerating || isSharing}>
              {isGenerating ? "Generating..." : "Download PDF"}
            </Button>
            <Button variant='outline' onClick={exportAsImage} disabled={isGenerating || isSharing}>
              {isGenerating ? "Generating..." : "Download Image"}
            </Button>
            {canShare && (
              <Button variant='outline' onClick={shareResult} disabled={isGenerating || isSharing} className='gap-2'>
                <Share2 className='w-4 h-4' />
                {isSharing ? "Sharing..." : "Share"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
