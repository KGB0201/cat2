let y = 120;
let x = 5;
try {
    if (x === 0) {
        throw new Error("受験者数に0が入っています");
    }
    let avg = y / x;
    console.log("平均点：" + avg);
}
catch (e) {
    console.log(e.message);
}
