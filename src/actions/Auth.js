import { API } from "../backend";

export const postUserData=async(name,email,password)=>{
    // console.log(API)
    return await fetch(`${API}/signup/`,{
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method:"POST",
        body:JSON.stringify({full_name:name,
            email:email,
            password:password,
            name:name})
    }).then((res)=>{
        return res.json()
    }).catch((err)=>{
        throw err
    })
}

export const userLogin=async(name,password)=>{
    return await fetch(`${API}/signin/`,{
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method:"POST",
        body:JSON.stringify({
            password:password,
            email:name})
    }).then((res)=>{
        return res.json()
    }).catch((err)=>{
        throw err
    })
}