import fetch from 'node-fetch';
import send from '@polka/send';
import { getFirestoreRequestUrl, parseFirestoreResults } from '../firebase.js';

const render = (items) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
  http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
>
  <url>
    <loc>https://leechy.dev/</loc>
    <lastmod>${new Date().toISOString().substr(0, 19)}+02:00</lastmod>
    <priority>1.00</priority>
  </url>
  ${items.map(item => `
  <url>
    <loc>https://leechy.dev${item.id.substr(8)}</loc>
    <lastmod>${item.date}+02:00</lastmod>
    <priority>0.80</priority>
  </url>
  `).join('\n')}
</urlset>`;

export function get(req, res) {
  fetch(getFirestoreRequestUrl('articles'))
    .then(r => r.json())
    .then(r => {
      console.log(parseFirestoreResults(r.documents));
      const feed = render(parseFirestoreResults(r.documents))
      send(res, 200, feed, {
				'Cache-Control': `max-age=0, s-max-age=${86400}`, // 1 day
				'Content-Type': 'application/xml'
			});
    }).catch(err => {
      throw error(err.status, err.message);
    });
}
