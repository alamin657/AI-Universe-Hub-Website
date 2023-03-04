const dataLoad = () => {
    const loaderSection = document.getElementById('loader');
    loaderSection.classList.remove('d-none')
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    .then(res => res.json())
    .then(data =>displayDataLoad(data.data.tools.slice(0,6)))
}

const displayDataLoad = (tools) => {
    // console.log(tools)
    const cardContainer = document.getElementById('card-container')
    tools.forEach(tool => {
        // console.log(tool)
        const toolDiv = document.createElement('div')
        toolDiv.classList.add('col')
        toolDiv.innerHTML = `
                 <div class="card">
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
                    <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-primary"> <i onclick="fetchModalclick('${tool.id}')" class="fas fa-arrow-right"></i></button>
                   
                    </div>
                    <div class="d-flex" >
                    <i class="fa-solid fa-calendar-days gap-4 p-2"></i>
                    <p>${tool.published_in}</p>
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
document.getElementById('btn-see-more').addEventListener('click',function(){
    const loaderSection = document.getElementById('loader');
    loaderSection.classList.remove('d-none')
    const seeMoredataLoad = () => {
        fetch(`https://openapi.programming-hero.com/api/ai/tools`)
        .then(res => res.json())
        .then(data => displayseeMoredataLoad(data.data.tools))
   }
   const displayseeMoredataLoad = tools => {
    // console.log(tools);
    const seeMoreContainer = document.getElementById('card-container')
    seeMoreContainer.innerText = '';
    tools.forEach(tool => {
        // console.log(tool);
    const seeMoreDiv = document.createElement('div')
    seeMoreDiv.classList.add('col')
    seeMoreDiv.innerHTML = `
        <div class="card ">
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
                    <p>${tool.published_in}</p>
                    </div>
                    </div>
                  </div>`
                  seeMoreContainer.appendChild(seeMoreDiv);

    })
    const loaderSection = document.getElementById('loader');
    loaderSection.classList.add('d-none') 
}
seeMoredataLoad()

})
// modal click
const fetchModalclick = (id) => {
    fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    .then(res => res.json())
    .then(data => displayfecthModal(data.data))
}
const displayfecthModal = data => {
    console.log(data.id)
    document.getElementById('modal-body').innerHTML = `
    <div class="row row-cols-1 row-cols-md-2 g-4">
        <div class="border border-danger">
        <p class="card-text">${data.description}</p>
        <div class="d-flex gap-2 ">
        <p  class="shadow p-3 text-success ">${data.pricing[0].price}
        ${data.pricing[0].plan}</p>
        <p class="shadow p-3 text-danger-emphasis">${data.pricing[1].price} ${data.pricing[1].plan}</p>
        <p class="shadow p-3 text-danger">${data.pricing[2].price} <br>
        ${data.pricing[2].plan}</p>
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
        <li>${data.integrations[0]}</li>
        <li>${data.integrations[1] ? data.integrations[1] : "No data found" }</li>
        <li>${data.integrations[2] ? data.integrations[2] : "No data found"}</li>
        </ul>
        </div>
        </div>
        </div>
        <div>
        <img src="${data.image_link[0]}" class="card-img-top" alt="...">
        <button  class="badge bg-danger mx-auto p-2 position-absolute">${data.accuracy.score*100 ? data.accuracy.score*100 : ''} % accuracy</button>
         
        <h4 class="mt-2 text-center">${data.input_output_examples[0].input}</h4>
        <p class="mt-2 text-center">${data.input_output_examples[0].output}</p>
        </div>
    </div>
    
    `
    let featuresList = Object.values(data.features)
    // console.log(featuresList);
    featuresList.forEach(features=>{
        const listContainer = document.getElementById('1'+ data.id)
        const listItem = document.createElement('li');
        listItem.innerText = features.feature_name;
        // console.log(listItem);
        listContainer.appendChild(listItem);
       
    })
    
}
fetchModalclick()



