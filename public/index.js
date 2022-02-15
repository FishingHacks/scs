function autobuttons() {
  //to add an id to buttons with the tag auto_even, following type:  event:function. When you wanna call console.log on onclick, add onclick:console.log. Seperate using ";"
  const buttons = document.getElementsByClassName("auto_even");
  for (i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    var actions = button.id.split(";");
    actions.forEach((action) => {
      try {
        actiontype = action.split(":")[0];
        func = eval(action.split(":")[1]);
        button.addEventListener(actiontype, func);
      } catch (e) {}
    });
  }
}

function updateSearch(e) {
  $(".searchTitle").element.textContent = "Ergebnis: " + $(".searchTerm").text();
  $(".result").htmlin("");
  try {
    fetch(location.origin + "/api/search/" + $(".searchTerm").text()).then(res => res.json()).then(json => {
      json.users.forEach(u => {
        console.log(u);
        el = document.createElement("a");
        el.textContent = u.name;
        el.href = location.origin + "/user/" + u.id;
        el.classList.add("nla")
        $(".result").element.append(el);
      })
    });
  }
  catch (e) {
    $(".searchTitle").element.textContent = "App is not functioning";
  }
}

function _load() {
  console.log("executed load");
  autobuttons();
  $(".searchTerm").on("input", updateSearch);
}

function cmen() {
  document.querySelector(".navbar>ul").classList.remove("toggled");
  document.querySelector(".menc").classList.add("hide");
  document.querySelector(".meno").classList.remove("hide");
}

function omen() {
  document.querySelector(".navbar>ul").classList.add("toggled");
  document.querySelector(".menc").classList.remove("hide");
  document.querySelector(".meno").classList.add("hide");
}

function review(id) {
  elm = document.querySelectorAll(".review")[0];
  if (elm.value != null && elm.value != undefined && elm.value != "") {
    fetch(location.origin + "/api/addreview/" + id + "/" + escape(elm.value));
  }
  
  location.reload()
}

async function regacc() {
  nm = "";
  while (nm == "") {
    nm = prompt("Name?")
  }

  fetch(location.origin + "/api/adduser/" + nm).then(res => res.json()).then(data => {alert("Registered!\n\nYour ID is " + data.id.toString())});
}