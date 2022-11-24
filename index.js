console.log(typeof NaN);

let num;
console.log(num);

console.log(typeof "Infinity");

console.log(typeof String(undefined));
console.log(typeof (45 != "45"));
console.log(typeof ("" + "25" * "4"));
console.log(typeof ("25" * "4"));
console.log(typeof (25 + "4"));
console.log(typeof Boolean(256));

let sum = 0;
for (let i = 1; i < 10; i++) {
  let sum = +i;
}
console.log(sum);

let matrix = [
  [1, 2],
  [3, 4],
  [5, 6],
];
for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    console.log(matrix[i][j]);
  }
}

let  nums = [1, 2, 3, 4, 5, 0, -3, -2];
const res = nums.find((item,index)=>{
     return item>0;
});

console.log(res);

const wand = {
    wood:'Holly',
    core:'dsdsdsd',
    length:11
}

console.log(wand['core'])
console.log(wand.core)


