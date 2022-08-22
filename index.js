const showDiv = document.querySelector('#TvShows');
const showName = document.querySelector('#detail-title');
const showDesc = document.querySelector('#detail-description');
const runtime = document.querySelector('#detail-runtime');
const showStatus = document.querySelector('#detail-status');
const remove = document.querySelector('#remove');
const form = document.querySelector('#searchForm');
const modal = document.querySelector('#modal');
const closeBttn = document.querySelector('#close');

form.addEventListener('submit', (e) => handleSubmit(e))
remove.addEventListener('click', (e) => handleRemove(e));
closeBttn.addEventListener('click', (e) => handleClose(e));

function getShows(search){
    return fetch(`https://api.tvmaze.com/search/shows?q=${search}`)
    .then(resp => resp.json())
    .then(shows => {
        //console.log(shows)
        iterateShows(shows)
    })
}

function iterateShows(showsArray){
    showsArray.forEach(showObj => renderImgs(showObj));
}

function renderImgs(showObj){
    if(showObj.show.image){
    //console.log(showObj);
    const showImgs = document.createElement('img');
    showImgs.src = showObj.show.image.medium;
    showImgs.addEventListener('click', () => renderDetails(showObj));
    showDiv.appendChild(showImgs);
}
}

function renderDetails(showObj){
    console.log(showObj);
    modal.showModal()
    let regex = /(<([^>]+)>)/ig
    let showSum = showObj.show.summary;
    showName.textContent = showObj.show.name;
    runtime.textContent = `runtime: ${showObj.show.averageRuntime} min;`;
    showStatus.textContent = `status: ${showObj.show.status};`;
    showDesc.textContent = `description: ${showSum.replace(regex, ' ')}`;
}



function handleRemove(e){
    e.preventDefault();
    showName.innerHTML = '';
    showDiv.innerHTML = '';
    runtime.innerHTML = '';
    showStatus.innerHTML = '';
    showDesc.innerHTML = '';
}




function handleSubmit(e) {
    e.preventDefault();
    const search = form.elements.query.value;
    getShows(search)
    form.elements.query.value = '';
}

function handleClose(e){
    e.preventDefault();
    modal.close();
}