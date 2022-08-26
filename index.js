const showDiv = document.querySelector("#TvShows");
const showName = document.querySelector("#detail-title");
const showDesc = document.querySelector("#detail-description");
const runtime = document.querySelector("#detail-runtime");
const showStatus = document.querySelector("#detail-status");
const remove = document.querySelector("#remove");
const form = document.querySelector("#searchForm");
const modal = document.querySelector("#modal");
const closeBttn = document.querySelector("#close");
const openWatchlist = document.querySelector("#open-watchlist");
const watchList = document.querySelector("#watch-list");
const closeWatchlist = document.querySelector("#close-watchlist");
const addWatchBttn = document.querySelector("#add-watch");

//Event Listeners
form.addEventListener("submit", (e) => handleSubmit(e));
remove.addEventListener("click", (e) => handleRemove(e));
closeBttn.addEventListener("click", (e) => handleClose(e));
closeWatchlist.addEventListener("click", (e) => handleCloseList(e));
addWatchBttn.addEventListener("click", (e) => handleAddList(e));
openWatchlist.addEventListener("click", (e) => handleWatch(e));

//Fetch Functions
function getShows(search) {
return fetch(`https://api.tvmaze.com/search/shows?q=${search}`)
.then((resp) => resp.json())
.then((shows) => {
iterateShows(shows);
});
}
//Render Functions
function iterateShows(showsArray) {
showsArray.forEach((showObj) => renderImgs(showObj));
}
function renderImgs(showObj) {
if (showObj.show.image) {
const showImgs = document.createElement("img");
showImgs.classList.add("showPix");
showImgs.src = showObj.show.image.medium;
showImgs.addEventListener("click", () => renderDetails(showObj));
showDiv.appendChild(showImgs);
}
}
function renderDetails(showObj) {
modal.showModal();
let regex = /(<([^>]+)>)/gi;
let showSum = showObj.show.summary;
showName.textContent = showObj.show.name;
runtime.textContent = `Runtime: ${showObj.show.averageRuntime} min.`;
showStatus.textContent = `Status: ${showObj.show.status}`;
showDesc.textContent = `Description: ${showSum
.replace(regex, " ")
.replace("&amp;", "&")}`;
}

//Event Handlers
function handleRemove(e) {
e.preventDefault();
showName.innerHTML = "";
showDiv.innerHTML = "<br><br>";
runtime.innerHTML = "";
showStatus.innerHTML = "";
showDesc.innerHTML = "";
}
function handleWatch(e) {
e.preventDefault();
watchList.showModal();
}
function handleAddList(e) {
e.preventDefault();
const watchShow = document.createElement("h3");
watchShow.textContent += `${showName.innerHTML.replace('&amp;', '&')}`;
watchList.appendChild(watchShow);
watchShow.addEventListener("click", (e) => (watchShow.innerHTML = ""));
}

function handleCloseList(e) {
e.preventDefault();
watchList.close();
}
function handleSubmit(e) {
e.preventDefault();
const search = form.elements.query.value;
getShows(search);
form.elements.query.value = "";
}
function handleClose(e) {
e.preventDefault();
modal.close();
}

