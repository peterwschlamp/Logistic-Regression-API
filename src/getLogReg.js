let ml = module.exports;
ml.LogisticRegression = require('./LogisticRegression');

module.exports = function getLogReg(W, b, predictTheseInputs){
	var classifier = new ml.LogisticRegression({});
  var result = classifier.predictWithWeights([predictTheseInputs], W, b);
	return result[0][0];
}