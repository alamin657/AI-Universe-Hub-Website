const dataLoad = () => {
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    .then(res => res.json())
    .then(data =>displayDataLoad(data.data.tools.slice(0,6)))
}

const displayDataLoad = (tools) => {
    // console.log(tools)
    const cardContainer = document.getElementById('card-container')
    tools.forEach(tool => {
        console.log(tool)
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
                    <i class="fas fa-arrow-right"></i>
                    </div>
                    <div class="d-flex" >
                    <p>${tool.published_in}</p>
                    </div>
                    </div>
                  </div>
                  
        `
        cardContainer.appendChild(toolDiv);
    })
}
dataLoad();

document.getElementById('btn-see-more').addEventListener('click',function(){
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
        console.log(tool);
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
                    <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-primary"> <i onclick="fetchModalclick()" class="fas fa-arrow-right"></i></button>
                   
                    </div>
                    <div class="d-flex" >
                    <i class="fa-solid fa-calendar-days gap-4 p-2"></i>
                    <p>${tool.published_in}</p>
                    
                    </div>
                    </div>
                  </div>`
                  seeMoreContainer.appendChild(seeMoreDiv);

    })
}
seeMoredataLoad()

})

// modal click
const fetchModalclick = () => {
    fetch(`https://openapi.programming-hero.com/api/ai/tool/01`)
    .then(res => res.json())
    .then(data => displayfecthModal(data.data))
}
const displayfecthModal = data => {
    console.log(data)
    document.getElementById('modal-body').innerHTML = `
    <div class="row row-cols-1 row-cols-md-3 g-4">
    <div class="col">
      <div class="card h-100">
        <div class="card-body">
          <p class="card-text">${data.description}</p>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card h-100">
        <img src="${data.image_link[0]}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This is a short card.</p>
        </div>
      </div>
    </div>
  </div>
    `
    
}
fetchModalclick()



