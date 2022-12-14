import { useEffect, useState } from "react"
import axios from 'axios'

const useFetch=(url)=>{
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(false)

    useEffect(()=>{
        let fetchData=async ()=>{
            setLoading(true)
            try {
                let res=await axios.get(url)  
                setData(res.data)
            } catch (error) {
                setError(error)
            }
            setLoading(false)
        }
        fetchData()
    },[url])

    let reFetchData=async ()=>{
        setLoading(true)
        try {
            let res=await axios.get(url)  
            setData(res.data)
        } catch (error) {
            setError(error)
        }
        setLoading(false)
    }
    return {data,loading ,error,reFetchData}
}

export default useFetch;