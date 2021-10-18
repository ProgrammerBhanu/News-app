var timerId;
var sbar = document.getElementById("news-search");

async function news(name) {


    //cf604e15a3d24f9bb451387dbb8aede0

    let res = await fetch(`https://newsapi.org/v2/everything?q=${name}&from=2021-09-18&language=en&sortBy=publishedAt&apiKey=cf604e15a3d24f9bb451387dbb8aede0`);

    let data = await res.json();
    return data;
}
var parent = document.getElementById("product");

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

        let pro_content = document.createElement("p");
        pro_content.textContent = product.content;

        let pro_des = document.createElement("p");
        pro_des.textContent = "Description :" + product.description;

        let author = document.createElement("p");
        author.textContent = "Author :" + product.author;

        pro_name.onclick = () => {
            details(product);
        };
        pro_div2.append(pro_img)
        pro_div3.append(pro_name, pro_content, pro_des, author);
        pro_div.append(pro_div2, pro_div3);
        parent.append(pro_div);
    });
}

// Searching Part

function main() {
    sbar.classList.add("hidden");

    let name = document.getElementById("news").value;

    let x = news(name);
    console.log(x)
    x.then((res) => {
        showItem(res.articles);
    });
    document.getElementById("news").value = "";
}


function appendNews(news_data) {
    if (news_data === undefined) {
        return false;
    }
    sbar.innerHTML = null;

    news_data.forEach((mve) => {
        let box_div = document.createElement('div');
        box_div.setAttribute('class', 'box_div');

        let box_name = document.createElement('p');
        box_name.innerText = mve.author;

        box_div.append(box_name);

        box_div.onclick = () => {
            details(mve);
        };
        sbar.append(box_div);
    });
}

async function searchData() {

    sbar.classList.remove("hidden");

    let name = document.getElementById("news").value;

    if (name.length < 3) {
        return false;
    }
    let x = news(name);
    x.then((res) => {
        appendNews(res.articles);
        console.log(res.articles);
    })

}

function debounce(func, delay) {
    if (timerId) {
        clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
        func();
    }, delay);
}

async function highlights() {


    //cf604e15a3d24f9bb451387dbb8aede0

    let res = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=cf604e15a3d24f9bb451387dbb8aede0");

    let data = await res.json();
    showItem(data.articles);
}
highlights();

// details

function details(pr) {

    localStorage.setItem("AboutNews", JSON.stringify([]));


    var mov = JSON.parse(localStorage.getItem("AboutNews"));
    mov.push(pr);
    localStorage.setItem("AboutNews", JSON.stringify(mov));

    window.open("news.html", "_self")
}