var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true })

nightmare
  .goto('http://sudouest.fr')
  //.type('form[action*="/search"] [name=p]', 'github nightmare')
  .click('.premium img')
  .inject('js', `node_modules/jquery/dist/jquery.js`)
  .wait('.long')
  .screenshot('page.png')
  .evaluate(function () {
    if($('.long').text())
    	return $('.long').text();
    else
        return "Not in page context";
 

  })
  .end()
  .then(function (result) {
    console.log(result)
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });