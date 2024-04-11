document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("container-txt");
    const name = document.getElementById("input-1");
    const date = document.getElementById("input-2");
    const message = document.getElementById("text-message");
    const submit = document.getElementById("button-submit");

    const listItems = document.getElementById("nail-list");
    fetch("http://localhost:3000/nailStyles")
    .then((response) => (response.json()))
    .then(data =>  (data.forEach((item) =>{
        const li = document.createElement("li");
        li.innerHTML = `
        <p class="style-js">name: ${item.name}</p>
        <p class="style-js">description: ${item.description}</p>
        <p class="style-js">price: ${item.price}</p>
        <img src="${item.image}"/>
        `
        listItems.appendChild(li);
    })))

    form.addEventListener("submit", (event)=> {
        event.preventDefault();
        fetch("http://localhost:3000/appointments")
        .then((response) => (response.json()))
        .then(data =>  {
        const bookedAppoinments = data.filter((btnA) =>{
        
           return date.value == btnA.date 

    })
    // console.log(bookedAppoinments)
    if(bookedAppoinments.length > 3){
        alert("The day is fully booked!Kindly check another date!");
    }else {
        fetch("http://localhost:3000/appointments", {
       
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name.value,
            date: date.value,
            message: message.value
        })
     }).then((response) => (response.json()))
     .then(() => {
        alert("You have been successfully booked!")});
        form.reset()
    }
})
        

    });

});