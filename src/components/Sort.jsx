// Lets the user sort the table by description or category
function Sort({onSort}){
    return(
        <select onChange={(e)=>{
            onSort(e.target.value)
        }}>
            <option value={"description"}>Description</option>
            <option value={"category"}>Category</option>
        </select>
    )
}
export default Sort