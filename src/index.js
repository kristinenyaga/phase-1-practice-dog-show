let dogForm = document.getElementById('dog-form')
let dogName = document.getElementById('dog-name')
let dogBreed = document.getElementById('dog-breed')
let dogSex = document.getElementById('dog-sex')
  
document.addEventListener('DOMContentLoaded', () => {
  
  fetchDogs()
  

})

let fetchDogs=()=>{
  fetch("http://localhost:3000/dogs")
  .then(response =>response.json())
  .then(dogs =>appendDog(dogs))
  
}

function appendDog(dogs){
  dogs.map(dog =>{
   
    let tableBody=document.querySelector("#table-body")
    let tableRow=document.createElement("tr")
    tableRow.setAttribute("id",`${dog.id}`)
    tableRow.innerHTML=`
   
      <td>${dog.name}</td>
      <td>${dog.breed}</td>
      <td>${dog.sex}</td>
      <td ><button id="button">Edit</button></td>
    
    `
    tableBody.append(tableRow)
    tableRow.querySelector("#button").addEventListener("click",()=>{
      handleEdit(dog)
    })
    
    
  })
  
}

function handleEdit(dog){
  console.log(dog.id, dog.name)
  

  dogName.setAttribute('value',dog.name)
  dogBreed.setAttribute('value',dog.breed)
  dogSex.setAttribute('value',dog.sex)
  dogForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    handleSubmit(dog.id)
  })

}

let handleSubmit=(dogId)=>{
  
  let obj={
    "name":dogName.value,
    "breed":dogBreed.value,
    "sex":dogSex.value
  }
  console.log(obj,dogId)

  updateDb(obj,dogId)
}


 function updateDb(obj,dogId){
  fetch(`http://localhost:3000/dogs/${dogId}`,{
    method:"PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(obj)
    
  })
  fetchDogs()
 }