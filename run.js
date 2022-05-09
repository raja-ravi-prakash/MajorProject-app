const { exec } = require('child_process');

exec('whoami', function(error, stdout, stderr){
    console.log(error, stdout, stderr);
})