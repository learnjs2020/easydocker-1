const process = require('process');
const path = require('path');
const { exit } = require('process');

const SCRIPT_NAME = path.basename(__dirname );
const DATA_NAME = path.join(__dirname, '..') + '/_' + SCRIPT_NAME + '_DATA';

var args = process.argv; 

var site = args[2];

var dockerFile = 'angular11';


var dockerFn = __dirname + '/dockerFiles/' + dockerFile;

var site_image = dockerFile + '-image';
var site_container = site + '-container';

var site_path = DATA_NAME + '/sites/' + site;
var site_cfg = DATA_NAME + '/sites/' + site + '/dockerSetting.json';

var cfg = {};

try {
    cfg = require(site_cfg); 
} catch (e) {}

var cmd = '';
cmd += 'echo "Start docker app .."' + "\n";
cmd += 'cd ' + site_path + "\n";
cmd += 'docker build -f ' + dockerFn + ' -t ' + site_image + ' .' + "\n";
cmd += 'docker container stop ' + site_container + "\n";
cmd += 'docker container rm ' + site_container + "\n";

var cmd_ports  = '';
for (var i = 0;  i < cfg.ports.length; i++) {
    cmd_ports += ' -p ' +  cfg.ports[i] + ':' +  cfg.ports[i] + ' '
}

cmd += 'docker run -d ' + cmd_ports + ' -v "'+ site_path + '":/var/_localApp  --name  ' + site_container + ' ' + site_image  + "\n";

fs = require('fs');
fs.writeFile(DATA_NAME + '/_cron/addHost_' + new Date().getTime() + '.sh', cmd, function (err) {
    if (err) return console.log(err);
    console.log('success');
});

// console.log(cfg.ports);
console.log(cmd);
