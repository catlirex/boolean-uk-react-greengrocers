function AddForm ({addNewStoreItem}){
    return(
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
    )
}

export default AddForm