const FilterInput = ({filter, text, onFilterChange}) => {

    return (
        <div>
            <label style={{paddingRight: 5}}>find countries</label>
            <input type="text" disabled={filter} defaultValue={text} onChange={onFilterChange} />
        </div>
    )
}

export default FilterInput