fetch("/templates/nav.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("nav-container").innerHTML = data;
    })


fetch("/templates/footer.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data
    })