
import React,{useState} from 'react'
import { Avatar, Card, Modal} from 'antd';
import {Link} from 'react-router-dom'
import {deleteCard,setPlayed} from '../../actions/Card'
import {useDispatch,useSelector}  from 'react-redux'
import {deleteCards,selectToken} from '../../features/UserSlice'
import { EditOutlined, EyeOutlined, DeleteOutlined, } from '@ant-design/icons';

const { Meta } = Card;

const UICard = ({name,link,id}) => {
  const dispatch = useDispatch()
  const token = useSelector(selectToken)
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
    try{
      setPlayed(id,token)
      .then((res)=>{

      })
      .catch(err=>{
        console.log(err)
      })
    }catch(err){
      console.log(err)
    }
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setVisible(false);
  };
 
  const handleDeleteCard=()=>{
    try{
      const ids=[id]
      deleteCard(ids,token)
      .then((res)=>{
        dispatch(deleteCards(id))
      })
      .catch(err=>{
        console.log(err)
      })
    }catch(err){
      console.log(err)
    }
  }
  return (
    <>
     <Card
        style={{ width: 300, marginTop: 16 }}
        actions={[
          <EyeOutlined key="view" onClick={showModal}/>,
          <Link to={`/edit-card?id=${id}`}>
            <EditOutlined key="edit"/>
          </Link>,
          <DeleteOutlined key="delete" onClick={handleDeleteCard}/>
        ]}
      >
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={name}
          description={link}
        />
    </Card>
      <Modal
          title={name}
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
      >
        <iframe src={link} title={name}/>
      </Modal>
    </>
  )
}

export default UICard