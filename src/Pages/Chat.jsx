import React, { useState, useEffect } from 'react'
import HomeHelper from '../Components/HomeHelper'
import { useSelector, useDispatch } from 'react-redux'
import { sendMessage, getPrivateConversation, getPrivateConversation2} from '../redux/action/studentAction'
import io from 'socket.io-client';
import { useHistory } from 'react-router-dom';
import chat from '../Style/chat.css'
//Swap HelperFunction
function swap(input, value_1, value_2) {
    var temp = input[value_1];
    input[value_1] = input[value_2];
    input[value_2] = temp;
}


let socket;


const Chat = (props) => {
    
    const store = useSelector((store) => store)
    const history = useHistory()
    const dispatch = useDispatch()
    const [room1, setRoom1] = useState("")
    const [room2, setRoom2] = useState("")
    const [receiverRegistrationNumber, setReceiverRegistrationNumber] = useState("")
    const [message, setMessage] = useState("")
    const [messageArray, setMessageArray] = useState([])
    const [olderMessages, setOlderMessages] = useState([])
    const ENDPOINT = 'localhost:5000'

    useEffect(() => {
        let temp = props.match.params.room
        socket = io(ENDPOINT)
        let tempArr = temp.split(".")
        setReceiverRegistrationNumber(tempArr[0])
        setRoom1(temp)
        swap(tempArr, 0, 1)
        let tempRoom2 = tempArr[0] + '.' + tempArr[1]
        setRoom2(tempRoom2)
    }, [ENDPOINT, props.match.params.room])
    

    useEffect(() => {
        dispatch(getPrivateConversation(room1))
        dispatch(getPrivateConversation2(room2))
        socket = io(ENDPOINT)
        socket.emit('join room', {
            room1,
            room2
        })
        socket.on("new Message", (data) => {
            setMessageArray([...messageArray, data])
        })
        return () => {
            socket.emit('disconnect')
            socket.off()
        }
    }, [room1, room2])


    
    const formHandler = (e) => {
        e.preventDefault()
        if (message.trim().length > 0) {
            socket.emit("private message", {
                sender: store.student.student.student.name,
                senderId: store.student.student.student._id,
                message,
                room: room1,
                createdAt:new Date().toLocaleString(),
                image:store.student.student.student.avatar
            })
            setMessage("")
            let messageObj = {
                roomId: room1,
                senderName: store.student.student.student.name,
                senderId: store.student.student.student._id,
                message,
                senderRegistrationNumber: store.student.student.student.registrationNumber,
                receiverRegistrationNumber,
                image:store.student.student.student.avatar
            }
            dispatch(sendMessage(room1,messageObj))
        }
        else {
            alert("Can't send empty message")
        }
    }


    useEffect(() => {
        socket.on("new Message", (data) => {
            setOlderMessages(store.student.privateChat)
            setMessageArray([...messageArray, data])
        })
        
    },[messageArray,olderMessages])
   

    return (
        <div id='trail' style={{height:'110vh'}}>
            {store.student.isAuthenticated ? <>
                <HomeHelper />
                <div  className="container" style={{alignItems:'center',marginTop:'15px',width:'350vh'}}>
                    <div className="row" >
                       
                        <div className="col-md-10 " >
                        <div className="box box-primary direct-chat direct-chat-primary">
                                        <div className="box-header with-border">
                                          <h3 className="box-title">Direct Chat</h3>
                                    
                                          <div className="box-tools pull-right">
                                            <span data-toggle="tooltip" title="" className="badge bg-light-blue" data-original-title="3 New Messages">3</span>
                                            <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                                            </button>
                                            <button type="button" className="btn btn-box-tool" data-toggle="tooltip" title="Contacts" data-widget="chat-pane-toggle">
                                              <i className="fa fa-comments"></i></button>
                                            <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
                                          </div>
                                        </div>
                                        {/* <!-- /.box-header --> */}
                                        <div className="box-body" >
                                          {/* <!-- Conversations are loaded here --> */}
                                          <div className="direct-chat-messages" style={{height:'65vh'}}>
                                        
                            {
                                store.student.privateChat.map((obj,index) =>
                                {
                                    return(
                                       
                                        <div>
                                        {store.student.student.student._id != obj.senderId ?
                                            <div className="direct-chat-msg">
                                              <div className="direct-chat-info clearfix">
                                                <span className="direct-chat-name pull-left" style={{marginRight:'10px',fontSize:'14px'}}>{obj.senderName}</span>
                                                <span className="direct-chat-timestamp pull-right">{new Date(obj.createdAt).toLocaleString()}</span>
                                              </div>
                                              {/* <!-- /.direct-chat-info --> */}
                                              <img className="direct-chat-img"  src={obj.image} alt="Message User Image"/>
                                              <div className="direct-chat-text" style={{width:'60%'}}>
                                                {obj.message}
                                              </div>
                                              {/* <!-- /.direct-chat-text --> */}
                                            </div>
                                           :
                                    
                                            <div className="direct-chat-msg right">
                                              <div className="direct-chat-info clearfix ">
                                                <span className="direct-chat-name float-right" style={{marginLeft:'10px',fontSize:'14px'}}>{obj.senderName}</span>
                                                <span className="direct-chat-timestamp pull-left float-right">{new Date(obj.createdAt).toLocaleString()}</span>
                                              </div>
                                              {/* <!-- /.direct-chat-info --> */}
                                              <img className="direct-chat-img" style={{marginRight:'0px'}} src={obj.image} alt="Message User Image"/>
                                              <div className="direct-chat-text float-right"  style={{width:'60%'}}>
                                              {obj.message}
                                              </div>
                                              {/* <!-- /.direct-chat-text --> */}
                                            </div>
                                }
                                        </div>
                                           
                                    )
                                }
                                )
                            }

                            {messageArray.map((obj, index) =>
                                // <p key={index}>{obj.sender}: {obj.message}</p>
                                {
                                    return(
                                       
                                        <div>
                                        {store.student.student.student._id != obj.senderId ?
                                            <div className="direct-chat-msg">
                                            <div className="direct-chat-info clearfix">
                                              <span className="direct-chat-name pull-left" style={{marginRight:'10px',fontSize:'14px'}}>{obj.sender}</span>
                                              <span className="direct-chat-timestamp pull-right">{new Date(obj.createdAt).toLocaleString()}</span>
                                            </div>
                                            {/* <!-- /.direct-chat-info --> */}
                                            <img className="direct-chat-img"  src={obj.image} alt="Message User Image"/>
                                            <div className="direct-chat-text" style={{width:'60%'}}>
                                              {obj.message}
                                            </div>
                                            {/* <!-- /.direct-chat-text --> */}
                                          </div>
                                         :
                                  
                                          <div className="direct-chat-msg right">
                                            <div className="direct-chat-info clearfix ">
                                              <span className="direct-chat-name float-right" style={{marginLeft:'10px',fontSize:'14px'}}>{obj.sender}</span>
                                              <span className="direct-chat-timestamp pull-left float-right">{new Date(obj.createdAt).toLocaleString()}</span>
                                            </div>
                                            {/* <!-- /.direct-chat-info --> */}
                                            <img className="direct-chat-img" style={{marginRight:'0px'}} src={obj.image} alt="Message User Image"/>
                                            <div className="direct-chat-text float-right"  style={{width:'60%'}}>
                                            {obj.message}
                                            </div>
                                            {/* <!-- /.direct-chat-text --> */}
                                          </div>
                                }
                                        </div>
                                           
                                    )
                                }
                            )}
                      
                         </div>
                                        
                         <div className="col-md-12">
      {/* <!-- DIRECT CHAT PRIMARY --> */}
      <div className="box-footer">
                                          <form action="#" method="post" onSubmit={formHandler}>
                                            <div className="input-group">
                                              <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} name="message" placeholder="Type Message ..." className="form-control"/>
                                                  <span className="input-group-btn">
                                                    <button type="submit" className="btn btn-primary btn-flat">Send</button>
                                                  </span>
                                            </div>
                                          </form>
                                        </div>

    </div>
                                          
                                        </div>
                                       
                                      </div>
                        </div>
                        {/* store.student.student.student._id == obj.senderId ?
                                    <div key={index}>
                                        <p>{obj.senderName}: {obj.message}, {obj.createdAt}</p>
                                    </div>           */}
                        
                    </div>

                </div>
            </> : (history.push('/'))}
            
        </div>
    )
}

export default Chat
                        //                 <div className="col-md-5">
                        //     <form className="form-inline" onSubmit={formHandler}>
                        //         <div className="form-group ">
                        //             {/* <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type here.." type="text" className="form-control" /> */}
                        //             <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type here.." type="text" className="form-control" />
                        //         </div>
                        //         <button type="submit" className="btn btn-primary ml-1 ">Send</button>
                        //     </form>
                        // </div>
