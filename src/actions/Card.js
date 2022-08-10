import { API } from "../backend";

export const createCard=async(name,link,bucket,user,token)=>{
    return await fetch(`${API}/cards`,{
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        method:"POST",
        body:JSON.stringify({name:name,
        link:link,
        user:user,
        bucket:bucket
    })
    }).then((res)=>{
        return res.json()
    }).catch((err)=>{
        throw err
    })
}

export const updateCard=async(name,link,bucket,user,token,id)=>{
    return await fetch(`${API}/cards`,{
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        method:"PUT",
        body:JSON.stringify({_id:id,
        name:name,
        link:link,
        user:user,
        bucket:bucket
    })
    }).then((res)=>{
        return res.json()
    }).catch((err)=>{
        throw err
    })
}

export const setPlayed=async(id,token)=>{
    return await fetch(`${API}/cards`,{
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        method:"PUT",
        body:JSON.stringify({_id:id,
        lastPlayed:Date.now().toString(),
        played:true
    })
    }).then((res)=>{
        return res.json()
    }).catch((err)=>{
        throw err
    })
}

export const getAllCards=async(user,token)=>{
    return await fetch(`${API}/cards?user=${user}`,{
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        method:'GET'
    })
    .then((res)=>{
        return res.json()
    })
    .catch(err=>{
        throw err
    })
}

export const deleteCard=async(cardIds,token)=>{
    return await fetch(`${API}/cards`,{
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        method:"DELETE",
        body:JSON.stringify({cardIds:cardIds})
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>{
        throw err
    })
}