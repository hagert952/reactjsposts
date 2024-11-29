import { Button, ConfigProvider, Flex, Input } from 'antd';
import { createStyles } from 'antd-style';
import axios from 'axios';
import { useFormik } from 'formik';

import { notification, Space } from 'antd';


export default function Posts() {
    
  
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (message: string) => {
    api.info({
      message: 'Error',
      description: message,
      placement: 'topRight',
     
    });
  };

interface postvalues{
  title:'',
  body:'',
  userId:1
}

  function addpost(values:postvalues){
    
  axios.post('https://jsonplaceholder.typicode.com/posts'
  
  ,values
  ).then((res)=>{

    console.log(res.data)}
  ).catch((res)=>{

   

  
   
    console.log(res.message);
    openNotification(res.message)
  }
  )
  
  }
  
  const formik= useFormik<postvalues>({
    initialValues:{
      title:"",
      body:"",
      userId:1
      
    },
    onSubmit:addpost
   });
  const useStyle = createStyles(({ prefixCls, css }) => ({
    linearGradientButton: css`
      &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
        border-width: 0;
  
        > span {
          position: relative;
        }
  
        &::before {
          content: '';
          background: linear-gradient(135deg, #6253e1, #04befe);
          position: absolute;
          inset: 0;
          opacity: 1;
          transition: all 0.3s;
          border-radius: inherit;
        }
  
        &:hover::before {
          opacity: 0;
        }
      }
    `,
  }));
  const { styles } = useStyle();

const { TextArea } = Input;



  return (<>
  {contextHolder}
 <Flex vertical gap={32}>
    {/* <Input showCount maxLength={20} onChange={onChange} /> */}
    <TextArea   showCount maxLength={100} onChange={formik.handleChange} placeholder="can resize" id="title" name='title' value={formik.values.title} />
    <TextArea
    id="body" name='body' value={formik.values.body}
      showCount
      maxLength={100}
      onChange={formik.handleChange}
      placeholder="disable resize"
      style={{ height: 120, resize: 'none' }}
    />
  </Flex>
  <br/>
  <ConfigProvider
    button={{
      className: styles.linearGradientButton,
    }}
  >
    <Space>
      <Button type="primary"  size="large" onClick={()=>formik.handleSubmit()} >
       add post
      </Button>
    </Space>
  </ConfigProvider>
  </>
  )
}

