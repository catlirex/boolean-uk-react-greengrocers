function HeaderSort ({setSortOption}){
    return(
        <div className="action-bar sorting">
        <span>Sorting: </span>
        <button onClick={()=> setSortOption("low")}>Price(from low)</button>
        <button onClick={()=> setSortOption("high")}>Price(from high)</button>
        <button onClick={()=> setSortOption("name")}>Name</button>
        <button onClick={()=> setSortOption("")}>Default</button>
    </div>
    )
}

export default HeaderSort