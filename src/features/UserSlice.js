import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userDetail:{},
    cards:[],
    buckets:[],
    token:""
}

const TodoSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUserDetails:(state,action)=>{
            state.userDetail=action.payload.user
            state.token=action.payload.token
        },
        addBuckets:(state,action)=>{
            state.buckets=action.payload
        },
        addCard:(state,action)=>{
            state.cards.push(action.payload)
        },
        insertCards:(state,action)=>{
            state.cards=action.payload
        },
        deleteCards:(state,action)=>{
            let updatedCards = [...state.cards]
            const idx = updatedCards.findIndex(card=>card._id===action.payload)
            console.log(idx)
            updatedCards.splice(idx,1)
            state.cards=updatedCards
        },
        signOut:(state,action)=>{
            state.token=""
        }
    }
});

export const {
    addBuckets,
    addCard,
    addUserDetails,
    insertCards,
    deleteCards,
    signOut
} = TodoSlice.actions

export const selectUserDetails=state=>state.user.userDetail
export const selectBucketDetails=state=>state.user.buckets
export const selectCardDetails=state=>state.user.cards
export const selectToken=state=>state.user.token
export default TodoSlice.reducer