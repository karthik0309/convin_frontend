import { API } from "../backend";

export const addBucket=async(name)=>{
    return await fetch(`${API}/bucket`,{
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method:"POST",
        body:JSON.stringify({name:name})
    }).then((res)=>{
        return res.json()
    }).catch((err)=>{
        throw err
    })
}


export const getAllBuckets=async()=>{
    return await fetch(`${API}/bucket`,{
        method: 'GET',
    })
    .then((res)=>{
        return res.json()
    })
}