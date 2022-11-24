import React, {useEffect, useState} from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios'

export default function CountriesData() {
  const [countries, setCountries] = useState([])
  const [filterCountries, setFilterCountries] = useState([])
  const [search, setSearch] = useState('')
  const fetchCountries = async () => {
    const response = await axios.get('https://restcountries.com/v2/all')
    setCountries(response.data)
    setFilterCountries(response.data)
  }
  const columns = [
    {
      name: "Country Name",
      selector: row => row.name,
      sortable: true
    },
    {
      name: "Native Name",
      selector: row => row.nativeName,
      sortable: true
    },
    {
      name: "Capital",
      selector: row => row.capital,
      sortable: true
    },
    {
      name: "Country Flag",
      selector: (row) => <img width={50} height={50} src={row.flag} />,
      sortable: true
    },
    {
      name: "Action",
      selector: row => <button className='btn btn-primary' onClick={() => alert(row.name)}>Edit</button>
    }
  ]

  useEffect(() => {
    fetchCountries()
  }, [])
  useEffect(() => {
    const result = countries.filter(country => {
        return country.name.toLowerCase().match(search.toLowerCase())
    })
    setFilterCountries(result)
  }, [search])

  return (
    <DataTable 
      title="Countries Collection"
      columns={columns} 
      data={filterCountries}
      selectableRows
      selectableRowsHighlight
      highlightOnHover
      fixedHeader
      pagination  
      actions={<button 
        className='btn btn-info'
        onClick={() => alert('hi export')}
        >Export</button>}
      subHeader
      subHeaderComponent={
        <input type="text" 
        placeholder='search here' 
        className='form-control'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
      }
      />
  )
}

