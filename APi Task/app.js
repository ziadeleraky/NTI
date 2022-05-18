const mainURL = "https://jsonplaceholder.typicode.com/";
const apis = [
  {
    urlKeyWord: "posts",
    showKeyWord: "Posts Data",
    classes: "btn btn-danger mx-3",
    headers: ["userId", "id", "title", "body"],
  },
  {
    urlKeyWord: "comments",
    showKeyWord: "Comments Data",
    classes: "btn btn-warning mx-3",
    headers: ["postId", "id", "name", "email", "body"],
  },
  {
    urlKeyWord: "photos",
    showKeyWord: "Photos Data",
    classes: "btn btn-success mx-3",
    headers: ["albumId", "id", "title", "url", "thumbnailUrl"],
  },
  {
    urlKeyWord: "todos",
    showKeyWord: "ToDos Data",
    classes: "btn btn-dark mx-3",
    headers: ["userId", "id", "title", "completed"],
  },
];
const Buttons = document.querySelector("#Buttons");
const data = document.querySelector("#data");

apis.forEach((api) => {
  btn = document.createElement("button");
  btn.innerText = api.showKeyWord;
  btn.classList = api.classes;
  Buttons.appendChild(btn);
  btn.addEventListener("click", async function () {
    document.querySelector("#heads").innerHTML = "";
    document.querySelector("#body").innerHTML = "";
    let myResult = await (
      await fetch(`${mainURL}${api.urlKeyWord}?_limit=5`)
    ).json();
    console.log(myResult);
    const heads = document.querySelector("#heads");
    api.headers.forEach((head, i) => {
      console.log(head);
      let th = document.createElement("th");
      th.innerText = head;
      heads.appendChild(th);
    });
    myResult.forEach((res) => {
      console.log(res);
      let tr = document.createElement("tr");
      let tbody = document.querySelector("#body");
      api.headers.forEach((head, i) => {
        console.log(res[head]);
        let td = document.createElement("td");
        td.innerText = res[head];
        document.querySelector("#body").appendChild(td);
        tr.appendChild(td);
        tbody.appendChild(tr);
      });
    });
  });
});
