function HeaderFilter({setFilterOption}){
    return (
        <div className="action-bar filter">
      <span>Filter: </span>
      <button onClick={()=>setFilterOption("")}>Show All</button>
      <button onClick={()=>setFilterOption("fruit")}>Fruit</button>
      <button onClick={()=>setFilterOption("vegetable")}>Vegetable</button>
      
  </div>
    )
}

export default HeaderFilter