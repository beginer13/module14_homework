console.log(localStorage.getItem ("savedPage"));

if (localStorage.getItem ("savedPage") != "" ){
  fetchPhoto (localStorage.getItem ("savedPage"),localStorage.getItem ("savedLimit"))
}

btn.addEventListener("click",function(event){
  const resultPlace = document.getElementById("firstDiv");
  resultPlace.innerHTML = "";
  const page = parseInt(document.querySelector('#elem1').value, 10);
  const limit = parseInt(document.querySelector('#elem2').value, 10);
  if (page < 1 || page > 10 || limit < 1 || limit >10 || Number.isNaN(page)|| Number.isNaN(limit))  {
    localStorage.setItem ("savedPage", "");
    localStorage.setItem ("savedLimit", ""); 
    resultPlace.innerHTML = analisInput(page, limit);
  }
  else {
    localStorage.setItem ("savedPage", page);
    localStorage.setItem ("savedLimit", limit);
    fetchPhoto(page, limit);
  }
})



function analisInput (page, limit) {
  let message = "";
  const checkPage = page < 1 || page > 10 || Number.isNaN(page);
  const checkLimit = limit < 1 || limit > 10 || Number.isNaN(limit);
  if ( checkPage && !checkLimit) {
    message = "<p>Page number is out of range from 1 to 10 or is not number</p>";
  }
  else if ( checkLimit && !checkPage) {
    message = "<p>Limit is out of range from 1 to 10 or is not number</p>"
  }
  else if ( checkPage && checkPage) {
    message = "<p> Page number or Limits is out of range from 1 to 10 or is not number </p>"
  };
  return message;
}

function fetchPhoto(page, limit) {
  const url = "https://picsum.photos/v2/list?page="+page+"&limit="+limit;
 console.log(url);
  // displayPhoto(url)
  const options = {};
  // // Делаем запрос за данными
  fetch(url, options)
    .then (response => response.json())
    .then (json => displayPhoto(json))
}

function displayPhoto(photoUrl) {
  let divPhotos = '';
  photoUrl.forEach (item => {
    const divPhoto = "<img class='card-image' src='" + item.download_url + "' /> <br>";
    divPhotos = divPhotos + divPhoto;
  });
  const resultPlace = document.getElementById("firstDiv");
  resultPlace.innerHTML = divPhotos;
}