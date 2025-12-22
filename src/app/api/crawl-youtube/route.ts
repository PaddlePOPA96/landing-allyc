import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET() {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();

        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        console.log("Navigating to YouTube...");
        await page.goto('https://www.youtube.com/@Allyccc/streams', { waitUntil: 'networkidle2', timeout: 60000 });

        // Wait for video elements
        try {
            await page.waitForSelector('ytd-rich-grid-media', { timeout: 10000 });
        } catch (e) {
            console.log("Video selector not found immediately, might need scrolling or different selector");
        }

        // Scroll to trigger lazy loading
        await page.evaluate(async () => {
            window.scrollBy(0, 500);
            await new Promise(resolve => setTimeout(resolve, 1000));
            window.scrollBy(0, 500);
            await new Promise(resolve => setTimeout(resolve, 1000));
        });

        const videos = await page.evaluate(() => {
            const items = Array.from(document.querySelectorAll('ytd-rich-grid-media'));
            return items.slice(0, 8).map(item => {
                const titleEl = item.querySelector('#video-title');
                const linkEl = item.querySelector('a#video-title-link');

                // Try to find the image in yt-image container which is more specific
                const ytImage = item.querySelector('yt-image img');
                const basicImg = item.querySelector('img');
                const thumbEl = ytImage || basicImg;

                const metadataLine = item.querySelector('#metadata-line');
                const viewsEl = metadataLine?.querySelectorAll('span')[0];

                let thumbnailUrl = '';
                if (thumbEl) {
                    thumbnailUrl = thumbEl.src;
                    if (!thumbnailUrl || thumbnailUrl.includes('data:image/gif')) { // clear gif often used as placeholder
                        // @ts-ignore
                        thumbnailUrl = thumbEl.dataset.ytImgSrc || thumbEl.dataset.src || '';
                    }
                }

                // Fallback: Construct high-res thumbnail from video ID if possible
                let videoId = '';
                if (linkEl && (linkEl as HTMLAnchorElement).href) {
                    const href = (linkEl as HTMLAnchorElement).href;
                    const url = new URL(href);
                    videoId = url.searchParams.get('v') || '';
                }

                if ((!thumbnailUrl || thumbnailUrl.indexOf('http') !== 0) && videoId) {
                    thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
                }

                return {
                    title: titleEl?.textContent?.trim() || '',
                    videoUrl: linkEl ? (linkEl as HTMLAnchorElement).href : '',
                    thumbnailUrl: thumbnailUrl,
                    views: viewsEl?.textContent?.trim() || '',
                };
            }).filter(v => v.videoUrl && v.title);
        });

        console.log(`Found ${videos.length} videos.`);

        await browser.close();
        return NextResponse.json({ success: true, videos });

    } catch (error) {
        console.error('YouTube Crawling failed:', error);
        if (browser) await browser.close();
        return NextResponse.json({ success: false, error: 'Failed to crawl YouTube: ' + (error instanceof Error ? error.message : String(error)) }, { status: 500 });
    }
}
