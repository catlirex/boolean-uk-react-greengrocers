function AddForm ({addNewStoreItem, userType}){
    function displayStoreForm(){
        document.getElementById("addStoreItem").style.display === "grid"
        ? document.getElementById("addStoreItem").style.display = "none"
        : document.getElementById("addStoreItem").style.display = "grid"
      }
    return(
        <div>
        <button className="display-store-form" style={userType==="staff"? {visibility:"visible"}:{visibility:"hidden"}} onClick={()=>displayStoreForm()} >Add Store Item</button>
        <form id="addStoreItem" name="addStoreItem" onSubmit={(e)=>{
            e.preventDefault()
            addNewStoreItem()
        }}>
            <input id="name" name="name" type="text" placeholder="Item Name" required></input>
            <input id="price" name="price" type="number" placeholder="Price"  min="0" step=".01"></input>
            <input id="image" name="image" type="text" placeholder="Image link" ></input>
            <div>
            <input type="radio" id="fruit" name="type" value="fruit"/>
            <label htmlFor="fruit"> Fruit</label>
            </div>
            <div>
            <input type="radio" id="vegetable" name="type" value="vegetable"/>
            <label htmlFor="vegetable"> Vegetable</label>
            </div>
            <button>Add</button>
        </form>
        </div>
    )
}

export default AddForm