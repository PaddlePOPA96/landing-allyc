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

        // Set a realistic user agent
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        console.log("Navigating to Instagram...");
        // Use domcontentloaded to start interacting sooner, we'll wait for content manually
        await page.goto('https://www.instagram.com/jasmine.allyc/', { waitUntil: 'domcontentloaded', timeout: 60000 });

        // Wait for body to be engaged
        try {
            await page.waitForSelector('main', { timeout: 10000 });
        } catch (e) {
            console.log("Main selector not found immediately");
        }

        const title = await page.title();
        console.log("Page title:", title);

        if (title.includes("Login") || page.url().includes("login")) {
            console.warn("Hit Instagram login wall.");
            return NextResponse.json({ success: false, error: 'Instagram Login detected.' });
        }

        // aggressive scrolling to trigger lazy load
        await page.evaluate(async () => {
            const distance = 1000;
            const scrolls = 3;
            for (let i = 0; i < scrolls; i++) {
                window.scrollBy(0, distance);
                await new Promise((resolve) => setTimeout(resolve, 1500)); // Wait 1.5s per scroll
            }
        });

        // Extract posts
        const crawledPosts = await page.evaluate(() => {
            const posts: { media_url: string; permalink: string }[] = [];

            // Select all links that might be posts
            const anchors = Array.from(document.querySelectorAll('a'));

            const postLinks = anchors.filter(a => a.href.includes('/p/') || a.href.includes('/reel/'));
            console.log(`Found ${postLinks.length} post links candidates.`);

            postLinks.forEach(link => {
                // Find image inside
                const img = link.querySelector('img');

                if (img && img.src) {
                    posts.push({
                        permalink: link.href,
                        media_url: img.src
                    });
                }
            });

            // Dedup by permalink
            const uniquePosts = Array.from(new Map(posts.map(item => [item.permalink, item])).values());
            return uniquePosts.slice(0, 12);
        });

        console.log(`Found ${crawledPosts.length} valid posts.`);

        await browser.close();
        return NextResponse.json({ success: true, posts: crawledPosts, debug_title: title });

    } catch (error) {
        console.error('Crawling failed:', error);
        if (browser) await browser.close();
        return NextResponse.json({ success: false, error: 'Failed to crawl Instagram: ' + (error instanceof Error ? error.message : String(error)) }, { status: 500 });
    }
}
