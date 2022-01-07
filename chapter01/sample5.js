
// var a = 5;
// setTimeout(() => {
//     a+=4;
// }, 3000);
// a*=3;
// setTimeout(() => {
//     a-=1;
// }, 2000);


// setTimeout(() => {
//     setTimeout(() => {
//         console.log('todo: Second work!');
//     }, 2000);
//     console.log('todo: First work!');
// }, 3000);


function work(sec, callback) {
    setTimeout(() => {
        callback(new Date().toISOString());
    }, sec * 1000);
};

work(1, (result) => {
    console.log('1', result);
});

work(1, (result) => {
    console.log('2', result);
});

work(1, (result) => {
    console.log('3', result);
});



