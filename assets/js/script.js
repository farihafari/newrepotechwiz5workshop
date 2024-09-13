$(document).ready(function(){
    $.ajax({
        url:"assets/json/data.json",
        type:"get",
        success:function(data){
            let x = "";
            // console.log(data)
            $.each(data,function(index,objects){
// console.log(objects.price);
x += ` <div class="col-lg-3 mt-3">
                <div class="card">
                    <img src="${objects.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${objects.name}</h5>
                      <p class="card-text">${objects.price}</p>
                      <p class="card-text">${objects.description}</p>

                      <a href="#" class="btn btn-primary" onclick="addToCart(${index})">Add to cart</a>
                    </div>
                  </div>
            </div>`
            })
            $("#dataprint").html(x);

        }
    })
})
function addToCart(id){
    let localData = localStorage.getItem("cart");
    // console.log(localData);
    $.ajax({
        url:"assets/json/data.json",
        type:"get",
        success:function(data){
            $.each(data,function(index,objects){
                if(index == id){
                    if(localData == null ){
localStorage.setItem("cart",'[]');

                    }
                    let oldData = JSON.parse(localStorage.getItem("cart"));
                    let proObject = {
                        productName :objects.name,
                        productPrice :objects.price,
                        productImage : objects.image
                    }
                    oldData.push(proObject);
                    localStorage.setItem("cart",JSON.stringify(oldData));
                    alert("cart has been added");
                    location.assign("index.html")
                }

            })
        }

    })
}
let localpro = JSON.parse(localStorage.getItem('cart'));
$("#cartcount").html("cart count "+localpro.length)
// console.log(JSON.parse(localStorage.getItem("cart")));
// console.log([]);\
// view cart
let tb = ``;
let count =0;
let total  = 0;
for(let  objects of localpro){
    count++;
    total = total+ Number(objects.productPrice);
    console.log(objects);
    tb +=`<tr>
                <th scope="row">${count}</th>
                <td>${objects.productName}</td>
                <td>${objects.productPrice}</td>
                <td><img src ='${objects.productImage}' width="80"></td>
              </tr>`
}
document.querySelector("#tabledata").innerHTML=tb;
document.querySelector("#totalAmount").innerHTML = "total AMount "+total;