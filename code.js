let fromInp=document.querySelector(".fromInp")
let toInp=document.querySelector(".toInp")
let moneyTextFrom=document.querySelector(".money_text_from")
let moneyTextTo=document.querySelector(".money_text_to")
let fromValue="RUB";
let toValue="USD";
let listelements=document.querySelectorAll(".list-to")
let listelementfrom=document.querySelectorAll(".list-from")

listelements.forEach(x=>x.addEventListener("click",()=>{
    listelements.forEach(x=>x.classList.remove("activeto"))
    x.classList.add("activeto")
    toValue=x.innerText;
        Convert(); 
}))

listelementfrom.forEach(x=>x.addEventListener("click",()=>{
    listelementfrom.forEach(x=>x.classList.remove("activefrom"))
    x.classList.add("activefrom")
    fromValue=x.innerText;
     Convert(); 
      
}))
fromInp.addEventListener("keyup",()=>{
    Convert();
 })
 
 toInp.addEventListener("keyup",()=>{
     Converto();
 })
  

function Convert(){
  if(fromValue==toValue){
    fromInp.value!=null?toInp.value=fromInp.value:fromInp.value=toInp.value
    moneyTextFrom.innerText=`1 ${toValue}= 1 ${fromValue}`
    moneyTextTo.innerText=`1 ${toValue}= 1 ${fromValue}`     
  }
  
  else{
    fetch(`https://api.exchangerate.host/latest?base=${fromValue}&symbols=${toValue}`).then(res=>res.json()).then(data=>{
        moneyTextFrom.innerText=` 1 ${fromValue} =${data.rates[toValue]} ${toValue}`
        toInp.value= `${(fromInp.value*data.rates[toValue]).toFixed(4)}`
        moneyTextTo.innerText=`1 ${toValue}=${1/data.rates[toValue]} ${fromValue}`

  })
  .catch((error)=>{
    console.log(error)
  })
  }

}
  function Converto(){
    if(fromValue==toValue){
      fromInp.value!=null?toInp.value=fromInp.value:fromInp.value=toInp.value
      moneyTextFrom.innerText=`1 ${toValue}= 1 ${fromValue}`
      moneyTextTo.innerText=`1 ${toValue}= 1 ${fromValue}`     
    }
    
    else{
      fetch(`https://api.exchangerate.host/latest?base=${toValue}&symbols=${fromValue}`).then(res=>res.json()).then(data=>{
          moneyTextTo.innerText=` 1 ${toValue} =${data.rates[fromValue]} ${fromValue}`
          fromInp.value= `${(toInp.value*data.rates[fromValue]).toFixed(4)}`
          moneyTextFrom.innerText=`1 ${fromValue}=${1/data.rates[fromValue]} ${toValue}`
    })
    .catch((error)=>{
      console.log(error)
    })
    }
  }