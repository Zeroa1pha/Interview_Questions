import { Outlet, Link } from 'react-router-dom';
import { Card, Space } from 'antd';
import '../style/layout.css'

const LayoutForm = () => {
    return (
        <div className='pageContainer'>
            <Card className='loginCard' style={{ width: 400, height: 400 }}>
            <Outlet />
            </Card>
        </div>)
}

export default LayoutForm