import Loading from './loading'

const CountryNameList = ({names, onShowButtonClick}) => {
    
    if (names == null) return <Loading />;

    return (
        <div>
        {names.length === 0
            ? (<p style={{color: "red"}}>no matching values</p>)
            : names.map(
                n => 
                    <p key={n}>{n}<button style={{marginLeft: 5}} onClick={() => onShowButtonClick(n)}>Show</button></p>
              )
        }
        </div>
    )
}

export default CountryNameList