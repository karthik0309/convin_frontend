import React,{useEffect} from 'react'
import {getAllCards} from '../../actions/Card'
import {useDispatch,useSelector} from 'react-redux'
import {addBuckets,insertCards,selectToken,selectUserDetails,selectCardDetails} from '../../features/UserSlice'
import {Button,Row,Col} from 'antd'
import {getAllBuckets} from '../../actions/Bucket'
import {Link} from 'react-router-dom'
import Card from '../../components/card/Card'
import BG from '../../assets/study.png'
import classes from './Home.module.css'

const Home = () => {
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

  const fetchBukcetList=()=>{
    try{
      getAllBuckets()
      .then((res)=>{
          res.push({_id:1,name:"other"})
          dispatch(addBuckets(res))
      }).catch(er=>{
          console.log(er)
      })
    }catch(err){
        console.log(err)
    }
  }
  useEffect(()=>{
    fetchBukcetList()
    fetchAllCards(user._id,token)
  },[])
  return (
    <div>
        <div className={classes.img}>
            <img src={BG} alt="Background" />
        </div>
        <Link to="/add-cards" className={classes.button}>
            <Button type="primary">
                Add cards
            </Button>
        </Link>
        <Row style={{padding:"40px"}}>
          {cards.length>0 && cards.map((card)=>(
            <Col xs={24} xl={8} key={card._id}>
              <Card name={card.name} link={card.link} id={card._id}/>
            </Col>
          ))}
        </Row>
    </div>
  )
}

export default Home