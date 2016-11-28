var Yelp = require('yelp');

var yelp = new Yelp({
    consumer_key: '0UXXnlrVDVdlVf0ep6Z71A',
    consumer_secret: 'yiaqJptybCX3NovTtsGA-Hs-7S8',
    token: 'k6Ietk_TA37nzW3m3d0pfHUlEBlocxTx',
    token_secret: 'LukkVdKDpnKazlpROsZWO-JpP4g',
    });

// See http://www.yelp.com/developers/documentation/v2/search_api
yelp.search({ term: 'food', location: 'Montreal' })
.then(function (data) {
  console.log(data);
})
.catch(function (err) {
  console.error(err);
});
