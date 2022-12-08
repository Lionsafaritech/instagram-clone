
import React, { useState, useEffect,useContext } from "react"
import {UserContext} from "../../App"
import { Link } from "react-router-dom"


const Home = () => {
    const [data, setData] = useState([])
    const {state,dispatch}=useContext(UserContext)
    useEffect(() => {
        fetch('/getFollowingPost', {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('jwt')
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setData(result.posts)
            })
    }, [])

    const likePost=(id)=>{
        fetch("/like",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result)
            const newData=data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(error=>{
            console.log(error)
        })

    }
    const unlikePost=(id)=>{
        fetch("/unlike",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result)
            const newData=data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(error=>{
            console.log(error)
        })
    }
        const makeComment=(text,postId)=>{
            fetch('/comment',{
                method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
                body:JSON.stringify({
                    postId,
                    text
                })
            }).then(res=>res.json())
            .then(result=>{
                console.log(result)
                const newData=data.map(item=>{
                    if(item._id===result._id){
                        return result
                    }else{
                        return item
                    }
                })
                setData(newData)

            }).catch(error=>{
                console.log(error)
            })
        }

        const deletePost=(postid)=>{
            fetch(`/deletepost/${postid}`,{
                method:"delete",
                headers:{
                    // "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
            }).then(res=>res.json())
            .then(result=>{
                console.log(result)
                const newData=data.filter(item=>{
                    return item._id !==result._id
                })
                setData(newData)
            })
        }


    
    return (
        <div className="home">
            {
                data.map(item => {
                    return (
                        <div className="card home-card" key={item._id}>
                            <h5 style={{padding:" 5px"}}><Link to={item.postedBy._id !== state._id ? "/profile/"+item.postedBy._id : "/profile"}>{item.postedBy.name}</Link> {item.postedBy._id===state._id
                            && <i className="material-icons" style={{float:"right"}} onClick={()=>deletePost(item._id)}>delete</i>}</h5>
                            <div className="card-image">
                                <img alt="" src={item.photo} />
                            </div>
                            <div className="card-content">
                                <i className="material-icons" style={{ color: "red" }}>favorite</i>
                                {item.likes.includes(state._id)
                                ? <i className="material-icons" onClick={()=>{unlikePost(item._id)}}>thumb_down</i>
                            :<i className="material-icons" onClick={()=>{likePost(item._id)}}>thumb_up</i> }
                                
                               
                                <h6>{item.likes.length} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                {
                                item.comments.map(record=>{
                                    return(
                                        <h6  key={record._id}><span style={{fontWeight:"500"}}>👨‍⚕️{record.postedBy.name}</span>.... {record.text}</h6>
                                    )
                                })
                                }
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id)
                                }}>
                                    <input type="text" placeholder="comment" />
                                </form>
                                
                            </div>

                        </div>

                    )
                })
            }

   {/* </div>
            <div className="card home-card">
                <h5>User Name</h5>
                <div className="card-image">
                    <img alt="" src="https://images.unsplash.com/photo-1531747056595-07f6cbbe10ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y291cGxlfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60"/>
                </div>
                <div className="card-content">
                    <i className="material-icons" style={{color:"red"}}>favorite</i>
                    <h6>title</h6>
                    
                    <p>this is amazing post</p>
                    <input type="text" placeholder="comment"/>
                </div>

            </div>
            <div className="card home-card">
                <h5>User Name</h5>
                <div className="card-image">
                    <img alt="" src="https://images.unsplash.com/photo-1503516459261-40c66117780a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNvdXBsZXxlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60"/>
                </div>
                <div className="card-content">
                    <i className="material-icons" style={{color:"red"}}>favorite</i>
                    <h6>title</h6>
                    <p>this is amazing post</p>
                    <input type="text" placeholder="comment"/>
                </div>

            </div>
            <div className="card home-card">
                <h5>User Name</h5>
                <div className="card-image">
                    <img alt="" src="https://images.unsplash.com/photo-1524638431109-93d95c968f03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGZlbWFsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"/>
                </div>
                <div className="card-content">
                    <i className="material-icons" style={{color:"red"}}>favorite</i>
                    <h6>title</h6>
                    <p>this is amazing post</p>
                    <input type="text" placeholder="comment"/>
                </div>

            </div>
            <div className="card home-card">
                <h5>User Name</h5>
                <div className="card-image">
                    <img alt="" src="https://images.unsplash.com/photo-1481841580057-e2b9927a05c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"/>
                </div>
                <div className="card-content">
                    <i className="material-icons" style={{color:"red"}}>favorite</i>
                    <h6>title</h6>
                    <p>this is amazing post</p>
                    <input type="text" placeholder="comment"/>
                </div>

            </div>
            <div className="card home-card">
                <h5>User Name</h5>
                <div className="card-image">
                    <img alt="" src="https://images.unsplash.com/photo-1531747056595-07f6cbbe10ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGNvdXBsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"/>
                </div>
                <div className="card-content">
                    <i className="material-icons" style={{color:"red"}}>favorite</i>
                    <h6>title</h6>
                    <p>this is amazing post</p>
                    <input type="text" placeholder="comment"/>
                </div>

            </div>
            <div className="card home-card">
                <h5>User Name</h5>
                <div className="card-image">
                    <img alt="" src="https://plus.unsplash.com/premium_photo-1661475871391-cc7652c61b4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fHdvbWFufGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60"/>
                </div>
                <div className="card-content">
                    <i className="material-icons" style={{color:"red"}}>favorite</i>
                    <h6>title</h6>
                    <p>this is amazing post</p>
                    <input type="text" placeholder="comment"/>
                </div>

            </div>
            <div className="card home-card">
                <h5>User Name</h5>
                <div className="card-image">
                    <img alt="" src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbnxlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60"/>
                </div>
                <div className="card-content">
                    <i className="material-icons" style={{color:"red"}}>favorite</i>
                    <h6>title</h6>
                    <p>this is amazing post</p>
                    <input type="text" placeholder="comment"/>
                </div>

            </div>
            v
            <div className="card home-card">
                <h5>User Name</h5>
                <div className="card-image">
                    <img alt="" src="https://images.unsplash.com/photo-1587053213559-c0511c50be8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjB8fGNvdXBsZXxlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60"/>
                </div>
                <div className="card-content">
                    <i className="material-icons" style={{color:"red"}}>favorite</i>
                    <h6>title</h6>
                    <p>this is amazing post</p>
                    <input type="text" placeholder="comment"/>
                </div>

            </div>
            <div className="card home-card">
                <h5>User Name</h5>
                <div className="card-image">
                    <img alt="" src="https://images.unsplash.com/photo-1587053170222-6d3e76bcef85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fGNvdXBsZXxlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60"/>
                </div>
                <div className="card-content">
                    <i className="material-icons" style={{color:"red"}}>favorite</i>
                    <h6>title</h6>
                    <p>this is amazing post</p>
                    <input type="text" placeholder="comment"/>
                </div>

            </div>
            <div className="card home-card"> */}
                {/* <h5>User Name</h5>
                <div className="card-image">
                    <img alt="" src="https://images.unsplash.com/photo-1490723186985-6d7672633c86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNvdXBsZXxlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60"/>
                </div>
                <div className="card-content">
                    <i className="material-icons" style={{color:"red"}}>favorite</i>
                    <h6>title</h6>
                    <p>this is amazing post</p>
                    <input type="text" placeholder="comment"/>
                </div> */}

        </div>
    )
}

export default Home