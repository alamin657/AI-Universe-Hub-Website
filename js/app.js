let fetchData = [];
const dataLoad = () => {
    const loaderSection = document.getElementById('loader');
    loaderSection.classList.remove('d-none')
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
        .then(res => res.json())
        .then(data => {
            fetchData = data.data.tools;
            displayDataLoad(data.data.tools.slice(0, 6))
        });
}
const displayDataLoad = (tools) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    tools.forEach(tool => {
        const toolDiv = document.createElement('div')
        toolDiv.classList.add('col')
        toolDiv.innerHTML = `
                 <div class="card h-100">
                    <img class=p-4 src="${tool.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h2>Features</h2>
                    <ol>
                    <li>${tool.features[0]}</li>
                    <li>${tool.features[1]}</li>
                    <li>${tool.features[2]}</li>
                    </ol>
                    <hr>
                    <h5 class="card-title">${tool.name}</h5>
                   
                    <div class="d-flex justify-content-end">
                    <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-danger"> <i onclick="fetchModalclick('${tool.id}')" class="fas fa-arrow-right"></i></button>
                   
                    </div>
                    <div class="d-flex" >
                    <i class="fa-solid fa-calendar-days gap-4 p-2"></i>
                    <p class="mt-1">${tool.published_in}</p>
                    </div>
                    </div>
                  </div>
                  
        `
        cardContainer.appendChild(toolDiv);
    })

    const loaderSection = document.getElementById('loader');
    loaderSection.classList.add('d-none')
}
dataLoad();
document.getElementById('btn-see-more').addEventListener('click', function () {
    const loaderSection = document.getElementById('loader');
    loaderSection.classList.remove('d-none')
    const seeMoredataLoad = () => {
        fetch(`https://openapi.programming-hero.com/api/ai/tools`)
            .then(res => res.json())
            .then(data => {
                displayseeMoredataLoad(data.data.tools)
            })
    }
    const displayseeMoredataLoad = tools => {
        const seeMoreContainer = document.getElementById('card-container')
        seeMoreContainer.innerText = '';
        tools.forEach(tool => {
            const seeMoreDiv = document.createElement('div')
            seeMoreDiv.classList.add('col')
            seeMoreDiv.innerHTML = `
        <div class="card h-100 ">
                    <img  class=p-4 src="${tool.image}" w-100" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h2>Features</h2>
                    <ol>
                    <li>${tool.features[0]}</li>
                    <li>${tool.features[1]}</li>
                    <li>${tool.features[2]}</li>
                    </ol>
                    <hr>
                    <h5 class="card-title">${tool.name}</h5>
                   
                    <div class="d-flex justify-content-end">
                    <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-primary"> <i onclick="fetchModalclick('${tool.id}')" class="fas fa-arrow-right"></i></button>
                   
                    </div>
                    <div class="d-flex" >
                    <i class="fa-solid fa-calendar-days gap-4 p-2"></i>
                    <p class="mt-1">${tool.published_in}</p>
                    </div>
                    </div>
                  </div>`
            seeMoreContainer.appendChild(seeMoreDiv);

        })
        const loaderSection = document.getElementById('loader');
        loaderSection.classList.add('d-none')
    }
    seeMoredataLoad()
    const seeMoreButton = document.getElementById('btn-see-more');
    seeMoreButton.classList.add('d-none'); 
});


// modal section
const fetchModalclick = async(id) => {
    console.log(id)
    try {
        const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
        const res = await fetch(url);
        const data = await res.json();
        displayfecthModal(data.data);
    }
    catch (error) {
        console.log(error);
    }

}
const displayfecthModal = data => {
    document.getElementById('modal-body').innerHTML = "";
    document.getElementById('modal-body').innerHTML = `
    <div class="row row-cols-1 row-cols-md-2">
        <div class="border border-danger bg-warning-subtle">
        <p class="card-text">${data.description}</p>
        <div class="d-flex gap-2 ">
        <p class="shadow p-1 text-success ">${data.pricing? data.pricing[0].price : "Free of Cost"} <br> ${data.pricing? data.pricing[0].plan : "/Basic"}</p>
        <p class="shadow p-1 text-danger-emphasis">${data.pricing? data.pricing[1].price : "Free Of Cost"} <br> ${data.pricing? data.pricing[1].plan : "/Pro"}</p>
        <p class="shadow p-1 text-danger">${data.pricing? data.pricing[2].price : "Free of Cost "} <br> ${data.pricing? data.pricing[2].plan : "/Enterprise"}</p>
        </div>
        <div class="d-flex gap-3">
        <div>
        <h2>Features</h2>
        <ul id="1${data.id}">

        </ul>
        </div>
        <div>
        <h2>Integrations</h2> 
        <ul>
        <li>${data.integrations ? data.integrations[0] : "data not found"}</li>
        <li>${data.integrations ? data.integrations[1] : "data not found"}</li>
        <li>${data.integrations? data.integrations[2] : "data not found"}</li>
        </ul>
        </div>
        </div>
        </div>
        <div class="position-relative mt-2">
        <div id="2${data.id}" class="position-absolute top-0 end-0 bg-danger rounded">${data.accuracy.score * 100 ? data.accuracy.score * 100 :''}% accuracy</div>
        <img src="${data.image_link[0]}" class="card-img-top" alt="...">
         
        <h4 class="mt-2 text-center">${data.input_output_examples ? data.input_output_examples[0].input : "Can you give any example?"}</h4>
        <p class="mt-2 text-center">${data.input_output_examples ? data.input_output_examples[1].output : "No! Not Yet! Take a break!!!"}</p>
        </div>
    </div>
    
    `
    if(data.accuracy.score=== null){
        document.getElementById('2'+data.id).classList.add('d-none');
    }
    let featuresList = Object.values(data.features)
    featuresList.forEach(features => {
        const listContainer = document.getElementById('1' + data.id)
        const listItem = document.createElement('li');
        listItem.innerText = features.feature_name;
        listContainer.appendChild(listItem);

    })

}

document.getElementById('sort-by-date').addEventListener('click', function () {
    const dataFormat = fetchData.sort((a, b) => new Date(a.published_in) - new Date(b.published_in));
    displayDataLoad(dataFormat);
});
