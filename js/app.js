const dataLoad = () => {
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    .then(res => res.json())
    .then(data =>displayDataLoad(data.data.tools.slice(0,6)))
}
dataLoad()
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
                    <p>${tool.features}</p>
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
