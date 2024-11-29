// import React from "react";
// import { useParams } from "react-router-dom";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import axios from "axios";

// const Updateform = () => {
//   const { postId } = useParams(); // Get the postId from the URL

//   const handleSubmit = async (values) => {
//     const updatedData = {
//       id: Number(postId),
//       title: values.title || "Default Title",
//       body: values.body || "Default Body",
//       userId: Number(values.userId) || 1,
//     };

//     try {
//       const response = await axios.put(
//         `https://jsonplaceholder.typicode.com/posts/${postId}`,
//         updatedData
//       );
//       console.log("Post Updated:", response.data);
//       alert("Post updated successfully!");
//     } catch (error) {
//       console.error("Error updating post:", error);
//     }
//   };

//   return (
//     <Formik
//       initialValues={{
//         title: "",
//         body: "",
//         userId: "",
//       }}
//       onSubmit={handleSubmit}
//     >
//       {({ isSubmitting }) => (
//         <Form>
//           <div>
//             <label htmlFor="title">Title:</label>
//             <Field type="text" name="title" placeholder="Enter title" />
//             <ErrorMessage name="title" component="div" />
//           </div>
//           <div>
//             <label htmlFor="body">Body:</label>
//             <Field as="textarea" name="body" placeholder="Enter body content" />
//             <ErrorMessage name="body" component="div" />
//           </div>
//           <div>
//             <label htmlFor="userId">User ID:</label>
//             <Field type="text" name="userId" placeholder="Enter user ID" />
//             <ErrorMessage name="userId" component="div" />
//           </div>
//           <button type="submit" disabled={isSubmitting}>
//             {isSubmitting ? "Updating..." : "Update Post"}
//           </button>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default Updateform;
import { Button, ConfigProvider, Flex, Input } from 'antd';
import { createStyles } from 'antd-style';
import axios from 'axios';
import { useFormik } from 'formik';

import { notification, Space } from 'antd';
import { useParams } from 'react-router-dom';


export default function Updateform() {
    
  const {postId}=useParams()
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
    
  axios.put(`https://jsonplaceholder.typicode.com/posts/${postId}`
  
  ,values
  ).then((res)=>{

    console.log(res)}
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
       update
      </Button>
    </Space>
  </ConfigProvider>
  </>
  )
}

