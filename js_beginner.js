// variable declaration
// console.log(z)
// var x = 1;
// const y = 2; //immutable
// let z = 3;

// Khi khai báo var js sẽ auto đẩy biến var lên đầu => sẽ k bị lỗi khai báo
// Khi khai báo let trước khi khai báo sẽ bị lỗi khai báo

// if (x===y)
// {
//     console.log("equal")
// }
// else{
//     console.log("not equal")
// }

// const arr = [1,2,3,4,5]

// for (let i = 0; i<arr.length; i++){
//     console.log(arr[i])
// }

const obj={
    name :"Minh",
    age : 21,
    sayHello :function (){
        console.log("Hello World")
    }
}

console.log(obj.name)
console.log(obj["age"])
obj.sayHello()

obj.address = {
    district: "Dong Da",
    city: "Ha Noi"
}
console.log(obj.address.district)