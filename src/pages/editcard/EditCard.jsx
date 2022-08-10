import React,{useState,useEffect} from 'react'
import { useSearchParams } from 'react-router-dom'
import {Form,Button,Input,Select,notification} from 'antd'
import {useDispatch,useSelector} from 'react-redux'
import {addCard,selectUserDetails,selectBucketDetails,selectToken,selectCardDetails} from '../../features/UserSlice'
import {addBucket} from '../../actions/Bucket'
import {updateCard} from '../../actions/Card'
import classes from './Editcard.module.css'

const { Option } = Select;

const AddCards = () => {
  const dispatch = useDispatch()
  const bucketList = useSelector(selectBucketDetails)
  const user = useSelector(selectUserDetails)
  const token = useSelector(selectToken)
  const cards = useSelector(selectCardDetails)
  const [form] = Form.useForm();
  const [bucket,setBucket] = useState('')
  const [initDetail,setInitDetail]=useState({})
  const [searchParams, setSearchParams] = useSearchParams();

  const openNotification = () => {
    const args = {
      message: 'Successfull Edited card',
      description:"",
      duration: 0,
    };
    notification.open(args);
  };

  const handleChange=(value)=>{
      setBucket(value)
  }

  const onFinish = (values) => {
    try{
        if(values.bucket==='other'){
            addBucket(values.other)
            .then((res)=>{
                updateCard(values.name,values.link,res.name,user._id,token,searchParams.get("id"))
                .then((r)=>{
                    dispatch(addCard(r))
                    openNotification()
                    form.resetFields();
                })
                .catch(err=>{
                    console.log(err)
                })
            })
            .catch(err=>{
                console.log(err)
            })
        }else{
            console.log(initDetail)
            updateCard(values.name,values.link,values.bucket,user._id,token,searchParams.get("id"))
            .then((r)=>{
                dispatch(addCard(r))
                openNotification()
                form.resetFields();
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }catch(err){
        console.log(err)
    }
  };
    
  const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
  };

  useEffect(()=>{
    const id=searchParams.get("id")
    const init = cards.filter((card)=>card._id===id)
    setInitDetail({...init[0]})
    form.setFieldsValue({name:init[0].name,
        link:init[0].link,
        bucket:init[0].bucket.name})
  },[])
  
  return (
    <div className={classes.main__container}>
        <h2>Edit card</h2>
        <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        >
        <Form.Item
        label="Name"
            name="name"
            rules={[
            {
                type: "text",
                required: true,
                message: 'Please input card name!',
            },
            ]}
        >
            <Input/>
        </Form.Item>

        <Form.Item
            label="Link"
            name="link"
            rules={[
            {
                type: "text",
                required: true,
                message: 'Please input card Link!',
            },
            ]}
        >
            <Input/>
        </Form.Item>

        <Form.Item label="Bucket" name="bucket"
        rules={[
            {
                required: true,
                message: 'Please select a bucket',
            },
            ]}
        >
            <Select initialvalues="education" onChange={handleChange}>
                {bucketList.length>0 && bucketList.map((bucket)=>(
                    <Option value={bucket.name} key={bucket._id}>
                        {bucket.name}
                    </Option>
                ))}
            </Select>
        </Form.Item>
        {bucket==='other' &&
            <Form.Item
            label="Other"
            name="other"
            rules={[
            {
                required: true,
                message: 'Please input bucket name!',
            },
            ]}
        >
            <Input/>
        </Form.Item>}
        <Form.Item>
            <Button type="primary" htmlType="submit">
            Submit
            </Button>
        </Form.Item>
        </Form>
    </div>
  )
}

export default AddCards