import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://karatekool.ee";
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/apply-to-club`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blob`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/email-confirmed`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/forgot-password`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/invite-user`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/karateka`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/klubist`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/materjalid`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/reset-password`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/uustulnukale`,
      lastModified: new Date(),
    },
  ];
}
