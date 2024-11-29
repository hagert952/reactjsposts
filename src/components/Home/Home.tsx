import React, { useEffect, useState } from 'react';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { useNavigate } from "react-router-dom";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import axios from 'axios';
import { Button, ConfigProvider, Space } from 'antd';
import { createStyles } from 'antd-style';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';

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
interface getdata {
  key: string;
  id:number;
  name: string;
  age: number;
  address: string;

}



interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const Row: React.FC<Readonly<RowProps>> = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props['data-row-key'],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: 'move',
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  return <tr {...props} ref={setNodeRef} style={style} {...attributes} {...listeners} />;
};

export default function Home() {
const [post,setpostdata]=useState<getdata[]>([]);

  const columns: TableColumnsType<getdata> = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Body',
      dataIndex: 'body',
    },
    {
      title: 'edit_Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={()=>{navigate(`/updateform/${record.id}`)}}>
          <EditTwoTone />
            
            Edit {record.id}</a>
        </Space>
      ),
      
    },
    {
      title: 'Delete_Action',
      key: `${post.map((post)=>{post.id.toString()})}`,
      render: (_, record) => (
        <Space size="middle">
                <a onClick={() => {deleteitem(record.id.toString())


console.log(record.id);

                }}><DeleteTwoTone />Delete{record.id}</a>
  
  
        </Space>
        
      ),
    },
  
  ];
  const navigate = useNavigate();
  const { styles } = useStyle();


async function getposts() :Promise<void>{
 
    return await axios.get<getdata[]>(`https://jsonplaceholder.typicode.com/posts`)
   .then((res)=>{
    const getall=res.data.map((item)=>({
      ...item,key:item.id.toString()
    }))
    setpostdata(getall)

    console.log(res.data);
   
   })
 .catch((res)=>{console.log(res);
 })
}
useEffect(()=>{
  getposts();
},[])
function deletebyid(id:string){
  return   axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`,)
     .then((res)=>res
     )
     .catch((err)=>err)
 }
//  const [postsdel, setposts] = useState(null);
 async function deleteitem(id:string) {
  const
   response = await deletebyid(id);
  console.log(response);
  
  if (response.status === 200) {
  console.log(response);
   setpostdata((prev) => prev.filter((item) => item.id.toString() !== id));
  // await  setpostdata(response);
    // await getposts();
  }
}
  // const [dataSource, setDataSource] = useState([
  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     age: 32,
  //     address:
  //       'Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text',
  //   },
  //   {
  //     key: '2',
  //     name: 'Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
  //   },
  //   {
  //     key: '3',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //   },
  // ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
        distance: 1,
      },
    }),
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setpostdata((prev) => {
        const activeIndex = prev.findIndex((i) => i?.id === active.id);
        const overIndex = prev.findIndex((i) => i?.id === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  return (
    <>
    <ConfigProvider
    button={{
      className: styles.linearGradientButton,
    }}
  >
    <Space>
      <Button type="primary" size="large" onClick={()=>{navigate('/post')}} >
       go to add post
      </Button>

    </Space>
    <br />
    <br />
  </ConfigProvider>
 
  <DndContext sensors={sensors} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <SortableContext
        // rowKey array
        items={post.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <Table<getdata>
          components={{
            
            body: { row: Row },
          }}
          rowKey="key"
          columns={columns}
          dataSource={post}
          
        />
      </SortableContext>
    </DndContext>
  </>
    
  );
};


 


  // return <>
  // <div>
    
  // </div>
  //  </>
 
 

