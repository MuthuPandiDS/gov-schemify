const axios = require("axios");
const cheerio = require('cheerio');


async function scrapeSchemes(){
    var url = "https://www.myscheme.gov.in/search/user-journey"
//   curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_a5c0577f-zone-pricewise:48nonx67e8ej -k https://lumtest.com/myip.json
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 33335;
  const session_id = (1000000 * Math.random()) | 0;

  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: 'brd.superproxy.io',
    port,
    rejectUnauthorized: false,
  }
  try{
    //Fetch the product page
   const responce = await axios.get(url,options);
   const $ = cheerio.load(responce.data)
   console.log($.text())
}
  catch (error) {
    console.log(error);
  }
}
scrapeSchemes()