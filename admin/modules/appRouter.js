(function () { //
	var obj =  function (env, pkg, req, res) {
		var fs = require('fs');
		this.get = function() {
		    var me = this, p = req.params[0];
		    var fn = env.root + '/www/' + ((!p) ? 'index.html' : p);
		    me.sendFile(fn);
		};	
		this.post = () => {
            var me = this;
		};

		this.sendFile = (fn) => {
			fs.stat(fn, function(err, stat) {
				if(err == null) {
					res.sendFile(fn);
				} else  {
					res.render('html/page404.ect');
				}
		    });
		}


	};
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 

})();
