const crypto = require('crypto');

function mycrypto() {
	this.myencrypt = (data) => {
		var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
		var mystr = mykey.update(data, 'utf8', 'hex')
		mystr += mykey.final('hex');
		return mystr
	}

	this.mydecrypt = (data) => {
		var mykey = crypto.createDecipher('aes-128-cbc', 'mypassword');
		var mystr = mykey.update(data, 'hex', 'utf8')
		mystr += mykey.final('utf8');
		return mystr
	}
}
module.exports = new mycrypto()
