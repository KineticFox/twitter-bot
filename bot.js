console.log("starting");

var Twit = require('twit');
var config = require('./config');
const readline = require('readline');

var T = new Twit(config);



const rl = readline.createInterface({
  
  input: process.stdin,
  output: process.stdout


 })
/*
command line search;
there is until now no exception for an empty search!
*/
rl.question('what you want to serach for (x since:0000-00-0): ', function(answer){  

	
	console.log("ok im looking for: " + answer);
	
	rl.close();

	process.stdin.destroy();

	 var s =  `'${answer}'`;

	 var params = {

			q: s, 
			count: 10 

		}

	
	
	function searchtweets(search){


		T.get('search/tweets', search, gotData);

		function gotData(err, data, response){

			var tweets = data.statuses;

			for (var i = 0; i < tweets.length; i++) {
				console.log(tweets[i].text);
			}

		
		}
	}

	//searchtweets(params);
})


/*
a simple auto tweet function;
*/

function tweetit(){

	var rand = Math.floor(Math.random()*42)

	var tweet = {

		status: 'now it is gonna be random: ' + rand +' #machinetweet'

	}

	T.post('statuses/update', tweet, tweeted )

	function tweeted(err, data, response){
		if (err) {
			console.log("something went wrong")
		} else {
			console.log("it worked")
		}
		 
	}
}

var koblenz =  [ '7.50', '50.40', '7.67', '59.29' ]
var berlin = ['13.08','52.34','13.76','52.66']
var DE = ['5.98', '47.30', '15.01', '54.98']

/*
get all tweets in a certain area;
the location request is based in bounding boxes of the area 
i looked for the bounding box on the interne;t
remember to swap longitued and the latitued;
*/

var stream = T.stream('statuses/filter', { /*track: '@CaseyNeistat',*/ locations: DE /*language: 'en'*/ })

stream.on('tweet', function (tweet) {
  	
  	console.log(tweet.text)
})

//tweetit();
//setInterval(tweetit, 1000*20);








