import React,{useEffect} from 'react'
import {getAllCards} from '../../actions/Card'
import { Card } from 'antd';
import {insertCards,selectToken,selectUserDetails,selectCardDetails} from '../../features/UserSlice'
import { useDispatch,useSelector } from 'react-redux'
import classes from './History.module.css'

const { Meta } = Card

const History = () => {
    const dispatch = useDispatch()
    const user = useSelector(selectUserDetails)
    const token = useSelector(selectToken)
    const cards = useSelector(selectCardDetails)
    const fetchAllCards=(user,token)=>{
        try{
          getAllCards(user,token)
          .then((res)=>{
            dispatch(insertCards(res))
          })
          .catch(err=>{
            console.log(err)
          })
        }catch(err){
          console.log(err)
        }
      }

    useEffect(()=>{
        fetchAllCards(user._id,token)
    },[])

  return (
    <div>
        {cards.map(card=>(
            <div key={card._id} style={{padding:"40px"}}>
                {card.played && 
                  <Card
                  hoverable
                >
                  <Meta title={card.name} description={
                  <div>
                      <p>{card.link}</p>
                      <p>LastPlayed:{card.lastPlayed}</p>
                  </div>} />
                </Card>}
            </div>
        ))}
    </div>
  )
}

export default History