import express from 'express';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import fs from 'fs';

const app = express();
const PORT = 3000;

// Definindo a interface para o produto
interface Product {
    title: string;
    url: string;
    rating?: string;
    reviews?: string;
    image: string;
}

// Função para fazer scraping da Amazon
async function scrapeAmazon(keyword: string): Promise<Product[]> {
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;

    try {

        const userAgents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
            'Mozilla/5.0 (Linux; Android 13; SM-S908B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0'
        ];

        const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];

        const response = await axios.get(url, {
            headers: {
                'User-Agent': randomUserAgent,
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
            }
        });

        const data = response.data;
        fs.writeFileSync('amazon.html', data);
        console.log('HTML salvo em amazon.html');
        const dom = new JSDOM(data);
        const document = dom.window.document;
        


        const products: Product[] = [];
        const items = document.querySelectorAll('span[data-component-type="s-product-image"]');

        items.forEach(item => {
            const linkElement = item.querySelector('a.a-link-normal');
            const imageElement = item.querySelector('img.s-image');

            if (linkElement && imageElement) {
                const imageSrc = imageElement.getAttribute('src') || '';
                const product = {
                    title: imageElement.getAttribute('alt') || 'Sem título',
                    url: 'https://www.amazon.com' + linkElement.getAttribute('href'),
                    image: imageSrc
                };
                products.push(product);

                // Preview no terminal
                console.log(`Produto: ${product.title}`);
                console.log(`Link: ${product.url}`);
                console.log(`Imagem: ${product.image}`);
                console.log('--------------------------');
            }
        });

        return products;

    } catch (error) {
        console.error('Error fetching data from Amazon:', error);
        throw new Error('Failed to scrape Amazon');
    }
}

// Endpoint de API
app.get('/api/scrape', async (req, res) => {
    const keyword = req.query.keyword as string;

    if (!keyword) {
        return res.status(400).json({ error: 'Keyword is required' });
    }

    try {
        const results = await scrapeAmazon(keyword);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Failed to scrape Amazon' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
