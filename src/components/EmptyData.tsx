import React from 'react'
import { Empty } from 'antd'


interface EmptyDataProps {
    content?: string
    style?: {[key: string] : any}
}

const EmptyData: React.FC<EmptyDataProps> = ({content, style}) => {
    return <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{
      height: 60,
    }}
    description={
      <span style={{color: '#c7c7c7', fontSize: 12}}>
        {content}
      </span>
    }
    style={{...style}}
    />
}
export default EmptyData