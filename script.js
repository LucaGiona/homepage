fetch("/templates/nav.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("nav-container").innerHTML = data;
    })