import { message } from 'antd'
import React from 'react'
import {getToken, onMessageListener} from '../../firebaseInit'

interface view2Props {}

const View2: React.FC<view2Props> = ({}) => {
    // const [isTokenFound, setTokenFound] = React.useState(false);
	// const [show, setShow] = React.useState(false);
	// const [notification, setNotification] = React.useState({ title: "", body: "" });
	// // console.log("Token found", isTokenFound);

	// React.useEffect(() => {
	// 	let data;
	
	// 	async function tokenFunc() {
	// 	  data = await getToken(setTokenFound);
	// 	  console.log('data', data)
	// 	  if (data) {
	// 		console.log("Token is", data);
	// 	  }
	// 	  return data;
	// 	}
	
	// 	tokenFunc();
	// }, [setTokenFound]);


    // onMessageListener()
    // .then((payload) => {
    //   setShow(true);
    //   setNotification({
    //     title: payload.notification.title,
    //     body: payload.notification.body,
    //   });
	// 	console.log('hiiiiiiiiiiiiiiiiii')
    //   console.log(payload);
	//   message.success(payload.notification.title)
    // })
    // .catch((err) => console.log("failed: ", err));
    

    return (

		<>
			<h1>View 2</h1>
           {/* <Notifications /> */}
		</>
	)
}
export default View2
