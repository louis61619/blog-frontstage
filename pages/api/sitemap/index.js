import { getSitemap } from '~/services/home';

export default async (req, res) => {
  const result = await getSitemap()
  let xml = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"><url><loc>${process.env.NEXTAUTH_URL}/home</loc><priority>1.00</priority></url>`;
  for (const item of result) {
    const ariticelXml = `<url><loc>${process.env.NEXTAUTH_URL}/detail/${item.id}</loc><lastmod>${item.updateAt}</lastmod><priority>0.8</priority></url>`;
    xml = xml + ariticelXml;
  }
  xml = xml + '</urlset>'
  res.setHeader('Content-Type', 'text/xml')
  res.send(xml)
}