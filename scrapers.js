const puppeteer = require('puppeteer');
const pluginStealth = require('puppeteer-extra-plugin-stealth');

async function scrapeProduct(url){
    const browser = await puppeteer.launch({headless: false}); //{headless: false}
    try{
        const page = await browser.newPage();
        await page.goto(url);
        let comments = [];
        for (let i = 1; i <= 10; i++){
            await page.waitForXPath(`/html/body/ytd-app/div/ytd-page-manager/ytd-watch-flexy/div[4]/div[1]/div/ytd-comments/ytd-item-section-renderer/div[3]/ytd-comment-thread-renderer[${i}]/ytd-comment-renderer/div[1]/div[2]/ytd-expander/div/yt-formatted-string[2]`);
            
            const [el2] = await page.$x(`/html/body/ytd-app/div/ytd-page-manager/ytd-watch-flexy/div[4]/div[1]/div/ytd-comments/ytd-item-section-renderer/div[3]/ytd-comment-thread-renderer[${i}]/ytd-comment-renderer/div[1]/div[2]/ytd-expander/div/yt-formatted-string[2]`);
            const src = await el2.getProperty('textContent');
            const srcTxt = await src.jsonValue();

            comments.push(srcTxt);
        }

        console.log(comments);

    } catch(err){
        console.error(err.message);
    }finally{
        browser.close();
    }    
}

scrapeProduct('https://www.youtube.com/watch?v=D4ph_5Dls18');
