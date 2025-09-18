import { useState, useEffect } from 'react'

import countriesInfoService from './services/countryInfo'
import CountryDetails from './components/countryDetails'
import FilterInput from './components/filterInput'
import CountryNameList from './components/countryNameList'
import './index.css'

const App = () => {
  const [content, setContent] = useState(null)
  const [names, setNames] = useState(null)
  const [filterText, setFilterText] = useState(null)
  const [filteredNames, setFilteredNames] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [disableFilter, setDisableFilter] = useState(false)  

  useEffect(() => {
    countriesInfoService.getAll()
      .then(data => setContent(data))
  }, [])

  useEffect(() => {
    if (content == null) return
    
    const allNames = content.map(country => country.name.common)
    setNames(allNames)
    setFilteredNames(filterNames(allNames))
  }, [content])

  useEffect(() => {
    if (filterText == null || filterText === '') {
      setFilteredNames(names)
      setSelectedCountry(null)
      return
    }

    const filteredNames = filterNames(names) 

    setFilteredNames(filteredNames)

    if (filteredNames?.length === 1){
      const countryName = filteredNames[0]
      if(selectedCountry == null || 
        selectedCountry?.name?.common != countryName){
        setSelectedCountry(getCountryByName(countryName))
      }
    } else {
      setSelectedCountry(null)
    }
  }, [filterText])

  const handleFilterChange = (e) => {
    setFilterText(e.target.value)
  }

  const filterNames = (names) => {
      if (filterText == null || filterText === '') return names
    
      const filterTextLower = filterText.toLowerCase()
      return names.filter(n => n.toLowerCase().includes(filterTextLower))
    }

  const getCountryByName = (countryName) => {
    return content.find(country => country.name.common === countryName)
  }

  const handleShowButtonClick = (countryName) => {
    setSelectedCountry(getCountryByName(countryName))
    setDisableFilter(true)
  }

  const getResetSelectedCountryHandler = () => {

    if (filteredNames.length === 1) return null

    return () => {
      setSelectedCountry(null)
      setDisableFilter(false)
    }
  }

  const countrySelected = selectedCountry != null; 

  return <>
    <FilterInput disable={disableFilter} text={filterText} onFilterChange={handleFilterChange} />
    {
      countrySelected
      ? <CountryDetails country={selectedCountry} resetCountry={getResetSelectedCountryHandler()} />
      : <CountryNameList names={filteredNames} onShowButtonClick={handleShowButtonClick} />
    }
  </>
}

export default App
