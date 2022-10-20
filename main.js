var baseurl = "https://crudcrud.com/api/114996a918c24b62abfe8c9335860a16/data";

async function addexpense(e) {
  e.preventDefault();
  const cat = e.target.cat.value;
  const amount = e.target.amount.value;
  const desc = e.target.desc.value;
  const obj = {
    cat: cat,
    amount: amount,
    desc: desc,
  };
  await axios
    .post(baseurl, obj)
    .then((res) => {
      console.log(res);
      getAll();
    })
    .catch((err) => console.log(err));
}

getAll();
async function getAll() {
  // var users = await axios.get(baseurl);
  var users = await axios(baseurl, {
    Headers: {
      "app-id": "6350fab77ea582428bd742ee",
    },
  });
  users = users.data;

  let t = document.getElementById("t");
  t.innerHTML = "";
  users.forEach((user) => {
    t.innerHTML =
      t.innerHTML +
      `<tr><td> ${user.amount} </td><td> ${user.cat}</td><td>${user.desc}</td>  <td><button onclick="deleteexpense(event)" class="btn-danger btn" value=${user._id}> Delete </button></td><td>  <button onclick="editexpense(event)" class="btn-warning btn" value=${user._id}> Edit </button>  </td></tr>`;
  });
}

async function deleteexpense(e) {
  // console.log("Delete called");
  let id = e.target.value;
  //  console.log(id);
  await axios
    .delete(`${baseurl}/${id}`)
    .then((res) => {
      console.log(res);
        getAll();
    })
    .catch((err) => console.log(err));
}

async function editexpense(e) {
  let doc = await axios.get(`${baseurl}/${e.target.value}`);
  // console.log(doc.data);
  await deleteexpense(e);
  document.getElementById('amount').value = doc.data.amount;
  document.getElementById('cat').value = doc.data.cat;
  document.getElementById('desc').value = doc.data.desc;
}
