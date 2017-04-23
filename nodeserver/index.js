var express = require('express');

const MongoClient = require('mongodb').MongoClient;

var app = express();

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Methods', 'GET,POST');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
})

app.get('/:collection', function(req, res) {
	var url = 'mongodb://localhost/stocks';

		MongoClient.connect(url).then(function(db) {
			if (req.params.collection === 'beststocks') {
				var collec = db.collection('beststocks');
				collec.find({}).toArray().then(function(docs) {
					res.end(JSON.stringify(docs));
				});
			} else if (req.params.collection === 'bestvol') {
				var collec = db.collection('bestvol');
				collec.find({}).toArray().then(function(docs) {
					res.end(JSON.stringify(docs));
				});
			} else if (req.params.collection === 'volatile') {
				var collec = db.collection('volatile');
				collec.find({}).toArray().then(function(docs) {
					res.end(JSON.stringify(docs));
				});
			}
		});
});

app.listen(3000, function() {
	console.log("listening");
});


/*

#Volatile


{
	"_id" : "58fc10dc421aa95182fe6d73",
	"Rating" : 66,
	"Name" : "Chipotle Mexican Grill, Inc.",
	"Symbol" : "CMG",
	"Suggestion" : "SELL",
	"Volatility" : 109.4129632596979
}
{
	"_id" : "58fc10db421aa95182fe6cff",
	"Rating" : 66,
	"Name" : "Amazon.com, Inc.",
	"Symbol" : "AMZN",
	"Suggestion" : "SELL",
	"Volatility" : 105.51032392217803
}
{
	"_id" : "58fc10dd421aa95182fe6e8b",
	"Rating" : 66,
	"Name" : "Intuitive Surgical, Inc.",
	"Symbol" : "ISRG",
	"Suggestion" : "SELL",
	"Volatility" : 85.01975345568849
}
{
	"_id" : "58fc10dc421aa95182fe6d1b",
	"Rating" : 33,
	"Name" : "Acuity Brands Inc (Holding Comp",
	"Symbol" : "AYI",
	"Suggestion" : "SELL",
	"Volatility" : 67.52409050371102
}
{
	"_id" : "58fc10dd421aa95182fe6e47",
	"Rating" : 34,
	"Name" : "W.W. Grainger, Inc.",
	"Symbol" : "GWW",
	"Suggestion" : "SELL",
	"Volatility" : 65.21939515468199
}
{
	"_id" : "58fc10de421aa95182fe6f63",
	"Rating" : 84,
	"Name" : "The Priceline Group Inc.",
	"Symbol" : "PCLN",
	"Suggestion" : "HOLD",
	"Volatility" : 64.63764867401187
}
{
	"_id" : "58fc10dc421aa95182fe6d1d",
	"Rating" : 33,
	"Name" : "AutoZone, Inc.",
	"Symbol" : "AZO",
	"Suggestion" : "SELL",
	"Volatility" : 58.1413725311495
}
{
	"_id" : "58fc10df421aa95182fe6ffd",
	"Rating" : 49,
	"Name" : "Transdigm Group Incorporated Tr",
	"Symbol" : "TDG",
	"Suggestion" : "SELL",
	"Volatility" : 49.56182920472929
}
{
	"_id" : "58fc10df421aa95182fe704d",
	"Rating" : 66,
	"Name" : "Vertex Pharmaceuticals Incorpor",
	"Symbol" : "VRTX",
	"Suggestion" : "SELL",
	"Volatility" : 48.50536010739843
}
{
	"_id" : "58fc10dd421aa95182fe6e43",
	"Rating" : 67,
	"Name" : "Goldman Sachs Group, Inc. (The)",
	"Symbol" : "GS",
	"Suggestion" : "SELL",
	"Volatility" : 41.34223380532097
}





# Best volatile


{
	"_id" : "58fc10de421aa95182fe6f63",
	"Rating" : 84,
	"Name" : "The Priceline Group Inc.",
	"Symbol" : "PCLN",
	"Suggestion" : "HOLD",
	"Volatility" : 64.63764867401187
}
{
	"_id" : "58fc10dd421aa95182fe6e43",
	"Rating" : 67,
	"Name" : "Goldman Sachs Group, Inc. (The)",
	"Symbol" : "GS",
	"Suggestion" : "SELL",
	"Volatility" : 41.34223380532097
}
{
	"_id" : "58fc10dc421aa95182fe6d73",
	"Rating" : 66,
	"Name" : "Chipotle Mexican Grill, Inc.",
	"Symbol" : "CMG",
	"Suggestion" : "SELL",
	"Volatility" : 109.4129632596979
}
{
	"_id" : "58fc10db421aa95182fe6cff",
	"Rating" : 66,
	"Name" : "Amazon.com, Inc.",
	"Symbol" : "AMZN",
	"Suggestion" : "SELL",
	"Volatility" : 105.51032392217803
}
{
	"_id" : "58fc10dd421aa95182fe6e8b",
	"Rating" : 66,
	"Name" : "Intuitive Surgical, Inc.",
	"Symbol" : "ISRG",
	"Suggestion" : "SELL",
	"Volatility" : 85.01975345568849
}
{
	"_id" : "58fc10df421aa95182fe704d",
	"Rating" : 66,
	"Name" : "Vertex Pharmaceuticals Incorpor",
	"Symbol" : "VRTX",
	"Suggestion" : "SELL",
	"Volatility" : 48.50536010739843
}
{
	"_id" : "58fc10df421aa95182fe6ffd",
	"Rating" : 49,
	"Name" : "Transdigm Group Incorporated Tr",
	"Symbol" : "TDG",
	"Suggestion" : "SELL",
	"Volatility" : 49.56182920472929
}
{
	"_id" : "58fc10dd421aa95182fe6e47",
	"Rating" : 34,
	"Name" : "W.W. Grainger, Inc.",
	"Symbol" : "GWW",
	"Suggestion" : "SELL",
	"Volatility" : 65.21939515468199
}
{
	"_id" : "58fc10dc421aa95182fe6d1b",
	"Rating" : 33,
	"Name" : "Acuity Brands Inc (Holding Comp",
	"Symbol" : "AYI",
	"Suggestion" : "SELL",
	"Volatility" : 67.52409050371102
}
{
	"_id" : "58fc10dc421aa95182fe6d1d",
	"Rating" : 33,
	"Name" : "AutoZone, Inc.",
	"Symbol" : "AZO",
	"Suggestion" : "SELL",
	"Volatility" : 58.1413725311495
}
*/
