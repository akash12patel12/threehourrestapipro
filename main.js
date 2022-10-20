var baseurl = "https://crudcrud.com/api/f1542f4e67d5421e99e612c97562c42f/data/";
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
  var users = await axios.get(baseurl);
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
  await axios.delete(baseurl, id)
    .then((res) => {
      console.log(res);
    //   getAll();
    })
    .catch((err) => console.log(err));
}

async function editexpense(e){
    let doc = await axios.get(baseurl+e.target.val)
    console.log(doc.data);
    // await deleteexpense(e);

}
