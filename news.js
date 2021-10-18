let parent = document.getElementById("product");
let span = document.getElementById("spr");

let movie_ab = JSON.parse(localStorage.getItem("AboutNews"));
console.log(movie_ab);

function showItem(data) {
    parent.innerText = null;
    data.forEach(function(product) {

        let pro_div = document.createElement("div");
        pro_div.setAttribute('class', 'xyz');
        let pro_div2 = document.createElement("div");
        let pro_div3 = document.createElement("div");

        let pro_img = document.createElement("img");

        pro_img.src = product.urlToImage;

        let pro_name = document.createElement("h3");
        pro_name.textContent = "Title :" + product.title;
        span.textContent = product.source.name;
        let pro_content = document.createElement("p");
        pro_content.textContent = product.content;

        let pro_des = document.createElement("p");
        pro_des.textContent = "Description :" + product.description;

        let author = document.createElement("p");
        author.textContent = "Author :" + product.author;

        pro_div2.append(pro_img)
        pro_div3.append(pro_name, pro_content, pro_des, author);
        pro_div.append(pro_div2, pro_div3);
        parent.append(pro_div);
    });
}
showItem(movie_ab);