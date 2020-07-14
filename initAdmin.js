const process = require('process');
const path = require('path');
const { exit } = require('process');

const SCRIPT_NAME = path.basename(__dirname );
const DATA_NAME = path.join(__dirname, '..') + '/_' + SCRIPT_NAME + '_DATA';

var dockerFn = __dirname + '/admin/dockerFile';

var site_image = 'admin-image';
var site_container = 'admin-container';

var site_path = __dirname + '/admin';

var cmd = '';
cmd += 'echo "Start admin .."' + "\n";
cmd += 'cd ' + site_path + "\n";
cmd += 'docker build -f ' + dockerFn + ' -t ' + site_image + ' .' + "\n";
cmd += 'docker container stop ' + site_container + "\n";
cmd += 'docker container rm ' + site_container + "\n";


cmd += 'docker run -d -p 10000:10000 -v "' + site_path + '":/var/_localApp -v "' + DATA_NAME + '":/var/_localAppDATA --name  ' + site_container + ' ' + site_image  + "\n";

fs = require('fs');
fs.writeFile(DATA_NAME + '/_cron/initAdmin_' + new Date().getTime() + '.sh', cmd, function (err) {
    if (err) return console.log(err);
    console.log('success');
});

console.log(cmd);
