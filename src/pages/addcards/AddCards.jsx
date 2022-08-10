import React,{useState} from 'react'
import {Form,Button,Input,Select,notification} from 'antd'
import {useDispatch,useSelector} from 'react-redux'
import {addCard,selectUserDetails,selectBucketDetails,selectToken} from '../../features/UserSlice'
import {addBucket} from '../../actions/Bucket'
import {createCard} from '../../actions/Card'
import classes from './Addcards.module.css'

const { Option } = Select;

const AddCards = () => {
  const dispatch = useDispatch()
  const bucketList = useSelector(selectBucketDetails)
  const user = useSelector(selectUserDetails)
  const token = useSelector(selectToken)
  const [form] = Form.useForm();
  const [bucket,setBucket] = useState('')

  const openNotification = () => {
    const args = {
      message: 'Successfull added card',
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
        if(values.other!==undefined && values.other!==null){
            addBucket(values.other)
            .then((res)=>{
                createCard(values.name,values.link,res._id,user._id,token)
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
            createCard(values.name,values.link,values.bucket,user._id,token)
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

  return (
    <div className={classes.main__container}>
        <h2>Add card</h2>
        <Form
        form={form}
        name="basic"
        initialValues={{
            remember: true,
        }}
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
            <Select onChange={handleChange}>
                {bucketList.length>0 && bucketList.map((bucket)=>(
                    <Option value={bucket._id} key={bucket._id}>
                        {bucket.name}
                    </Option>
                ))}
            </Select>
        </Form.Item>
        {console.log(bucket)}
        {bucket===1 &&
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