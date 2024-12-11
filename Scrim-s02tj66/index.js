import menuArray from '/data.js'

function renderMenu(menu){
    return menu.map(item => {
        const {name, ingredients ,price ,emoji ,id} = item
    return  ` <div class="item">
                <div class="item-image" >${emoji}</div>
    <div> 
                <h3 class="no-space">${name}</h3>
                <p class="no-space">${ingredients}</p>
                <h3>$${price}</h3>
            </div>
            <button class="item-btn" id="btn-${id}">+</button>
    </div>`
        
    })
    

}

document.getElementById('itemlist').innerHTML = renderMenu(menuArray)

let dishTimesArr = []
for (let dish of menuArray){
document.getElementById(`btn-${dish.id}`).addEventListener('click',function(e){
    document.getElementById('your-order').style.display = 'block'
    dishTimesArr.push(dish.id)
    document.getElementById('item-order').innerHTML = renderOrder()
    document.getElementById('total-amount').innerHTML = `<h2>Total price:</h2><h2>$${pricetoPay()}</h2`
  })}
function renderOrder(){
    return dishTimesArr.map(function(item){
        return `<div class="unique-item">
                <h2>${menuArray[item].name} <div role="button" data-remove-btn="${item}" class="remove">remove</div></h2>
                <h2>$${menuArray[item].price}</h2>
                </div>`
    }).join('')

}
document.addEventListener('click',function(e){
    if (e.target.dataset.removeBtn){
        for (let i=0; i<dishTimesArr.length;i++){
            if (dishTimesArr[i] == e.target.dataset.removeBtn){
                dishTimesArr[i] = -1
                dishTimesArr = dishTimesArr.filter(e => e !== -1)
                renderOrder()
                pricetoPay()
                break
            }
        }
        document.getElementById('total-amount').innerHTML = `<h2>Total price:</h2><h2>$${pricetoPay()}</h2`
    document.querySelector(`[data-remove-btn="${e.target.dataset.removeBtn}"]`).parentElement.parentElement.remove()
    dishTimesArr.length === 0 ? document.getElementById('your-order').style.display = 'none' : null
         
    }
})


function pricetoPay(){
    return dishTimesArr.map(e=>{
        for (let dishCost of menuArray){
          if (dishCost.id === e){
            return dishCost.price
          }
        }
    }).reduce((total,currentElement) => total+currentElement ,0)}

document.getElementById('complete-order').addEventListener('click',function(){
    document.getElementById('payment-modal').style.zIndex = 1
}) 
document.getElementById('submit-btn').addEventListener('click',function(e){
e.preventDefault()
document.getElementById('payment-modal').style.zIndex = -1
document.getElementById('your-order').style.display = 'none'
document.getElementById('payment-completed').style.display = 'flex'
})