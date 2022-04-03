/** 
 * wf2-1-3.js 
 */

function run(){
    console.log('sub task: run after 3 seconds');
}

function go(){
    console.log('start');
    setTimeout(run, 3000);
    console.log('end');
}

go();