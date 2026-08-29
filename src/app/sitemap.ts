import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://48lawsbangla.neonweb.xyz";
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/payment-success`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
