// select form element
const addForm = document.querySelector("#addForm");

// Array of objects - each object contains details about the saved data
const tableHeads = [
  { el: "id", viewEl: "ID", hasDefault: true, default: Date.now() },
  { el: "status", viewEl: "Is Finished", hasDefault: true, default: false },
  { el: "title", viewEl: "Title", hasDefault: false },
  { el: "content", viewEl: "Content", hasDefault: false },
  { el: "dueDate", viewEl: "Deadline", hasDefault: false },
  { el: "age", viewEl: "Age", hasDefault: false },
  { el: 'number', viewEl: 'Number', hasDefault:true, default: Date.now()},
  { el: null, viewEl: "Action", hasDefault: false },
];

// read from storage function and make sure that the data are array
const readFromStorage = function () {
  let data;
  try {
    data = JSON.parse(localStorage.getItem("tasks")) || [];
    if (!Array.isArray(data)) {
      throw new Error("No Data");
    }
  } catch (e) {
    data = [];
  }
  return data;
};

const writeToStorage = function (data) {
  localStorage.setItem("tasks", JSON.stringify(data));
};

const createMyOwnElements = (
  parent,
  element,
  classes,
  txt,
  attributes = []
) => {
  let myEle = document.createElement(element);
  if (classes) {
    myEle.classList = classes;
  }
  parent.appendChild(myEle);
  myEle.innerText = txt;
  attributes.forEach((attribute) => {
    myEle[attribute.attrName] = attribute.attrVal;
  });
  return myEle;
};

// select the table
const dataWrap = document.querySelector("#dataWrap");

/* Example
<table>
  <thead>
    <tr>
      <th>Month</th>
      <th>Savings</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>January</td>
      <td>$100</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$80</td>
    </tr>
  </tbody>
  */
// thead -> tr -> th -> tbody -> td (table elements) - tfoot -> td -

const showData = function () {
  const data = readFromStorage();
  dataWrap.innerHTML = "";

  const thead = createMyOwnElements(dataWrap, "thead", null, null);
  const tr = createMyOwnElements(thead, "tr", null, null);

  // creating dynamic table head (heading only)
  tableHeads.forEach((head) => {
    createMyOwnElements(tr, "th", null, head.viewEl);
  });
  // create dynamic table body
  const tbody = createMyOwnElements(dataWrap, "tbody", null, null);
  data.forEach((task, index) => {
    const tr = createMyOwnElements(tbody, "tr", null, null);
    tableHeads.forEach((element) => {
      if (element.el) {
        createMyOwnElements(tr, "td", null, task[element.el]);
      }
    });

    // Action Buttons
    const td = createMyOwnElements(tr, "td", null, null);
    // ************* Delete ****************
    const delBtn = createMyOwnElements(
      td,
      "button",
      "btn btn-danger mx-2",
      "Delete"
    );
    delBtn.addEventListener("click", function () {
      data.splice(index, 1);
      writeToStorage(data);
      showData();
    });
    // ************* Show ****************
    const showBtn = createMyOwnElements(
      td,
      "button",
      "btn btn-success mx-2",
      "Show"
    );
    showBtn.addEventListener("click", function () {
      localStorage.setItem("id", index);
      window.location.href = "single.html";
    });
    // ************* Change Status ****************
    const changeBtn = createMyOwnElements(
      td,
      "button",
      "btn btn-primary mx-2",
      "Change Status"
    );
    changeBtn.addEventListener("click", function () {
      data[index].status = !data[index].status;
      writeToStorage(data);
      showData();
    });
    // ************* Edit ****************
    const editBtn = createMyOwnElements(
      td,
      "button",
      "btn btn-warning mx-2",
      "edit"
    );
    editBtn.addEventListener('click', function () {
      localStorage.setItem('id-edit', index);
      window.location.href = 'edit.html';
    })
  });
};

if (dataWrap) {
  showData();
}

if (addForm) {
  addForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let task = {};
    tableHeads.forEach((head) => {
      if (head.hasDefault && head.el) {
        task[head.el] = head.default;
      } else if (head.el) {
        task[head.el] = addForm.elements[head.el].value;
      }
    });
    console.log(task);
    const allTasks = readFromStorage();
    allTasks.push(task);
    writeToStorage(allTasks);
    this.reset();
    window.location.href = "index.html";
  });
}

const singleEle = document.querySelector("#single-ele");
if (singleEle) {
  const itemId = localStorage.getItem("id");
  if (!itemId) {
    window.location.href = "index.html";
  }
  const data = readFromStorage();
  // console.log(data)
  const myElement = data[itemId];
  if (!myElement) {
    singleEle.innerHTML = `<div class='alert alert-danger'>Error in Loading</div>`;
  } else {
    singleEle.innerHTML = `<div class="alert alert-primary">
    <h4>ID: ${myElement.id}</h4>
    <h6>Title: ${myElement.title}</h6>
    </div>`;
  }
}

const editEle = document.querySelector('form');
if (editEle) {
  editEle.addEventListener('submit', function (e) {
    e.preventDefault();
    const idEdit = localStorage.getItem('id-edit');
    const data = readFromStorage(); // get all data
    const ele = data[idEdit]; // get specific data element

    let edTitle = ele.title;
    edTitle = document.querySelector('input[name="title"]').value;

    let edContent = ele.content;
    edContent = document.querySelector('textarea[name="content"]').value;

    let edAge = ele.age;
    edAge = document.querySelector('input[name="age"]').value;
    
    let edDate = ele.dueDate;
    edDate = document.querySelector('input[name="dueDate"]').value;

    let newTask = {
      title: edTitle,
      age: edAge,
      content: edContent,
      dueDate: edDate,
      status: false,
      id: ele.id
    };
    // console.log(newTask)
    const all = readFromStorage();
    all[idEdit] = newTask;
    writeToStorage(all)
    this.reset();
    window.location.href = 'index.html'
  })
}