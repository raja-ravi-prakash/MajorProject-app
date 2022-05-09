const { exec } = require('child_process');

exec('cd modules && bash run.sh < file.json', function(error, stdout, stderr){
    console.log(error, stderr);
    process.send(stdout);
});