const request = require("request")
const cheerio = require("cheerio")
const lineNotify = require("./lineNotify")
const moment = require("moment")
const getStock = () => {
  request(
    {
      url: "https://store.isseymiyake.com/c/hp_all_all/hp_basic_all/HP55JF150",
      method: "GET",
    },
    function (error, response, body) {
      if (error || !body) {
        return
      }
      const $ = cheerio.load(body) // 載入 body
      // const result = []; // 建立一個儲存結果的容器
      const isStock = $(
        ".fs-c-variationAndActions__variation.fs-c-variationList > div:nth-child(2) > div.fs-c-variationList__item__body > ul > li:nth-child(2) > div.fs-c-variationCart__cartButton.fs-c-variationCart__cartButton--subscribeToArrivalNotice > button > span"
      )
      if (isStock.text() !== "入荷お知らせメール") {
        console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')} 補貨了!!!!`)
        lineNotify()
      } else {
        console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')} 沒貨`)
      }
    }
  )
}

getStock()
// 每一分鐘爬一次資料
setInterval(getStock, 60 * 1000)
