import React from 'react';
import {} from 'antd'
import AdminMenu from './../components/AdminMenu'
class Admin extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <AdminMenu/>

            </div>
         );
    }
}
 
export default Admin;