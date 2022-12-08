import React,{useEffect,useState,useContext} from "react"
import {UserContext} from "../../App"
const Profile=()=>{
    const [mypics,setMypics]=useState([])
    const {state,dispatch}=useContext(UserContext)
    const [image,setImage]=useState("")
    // const [url,setUrl]=useState(undefined)

    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setMypics(result.mypost)
        })
    },[])

    useEffect(()=>{
        if(image){
            const data=new FormData()
            data.append("file",image)
            data.append("upload_preset","instagram")
            data.append("cloud_name","dhzpdgpyg")
            fetch('https://api.cloudinary.com/v1_1/dhzpdgpyg/image/upload',{
                method:"post",
                body:data
            })
            .then(res=>res.json())
            .then(data=>{
                // console.log(data)
                // setUrl(data.url)
                // localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
                // dispatch({type:"UPDATEPIC",payload:data.url})
                fetch("/updatepic",{
                    method:"put",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":"Bearer "+localStorage.getItem("jwt")
                    },
                    body:JSON.stringify({
                        pic:data.url
                    })
                }).then(res=>res.json())
                .then(result=>{
                    console.log(result)
                    localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
                    dispatch({type:"UPDATEPIC",payload:result.pic})
                // window.location.reload()



                })
            })
            .catch(error=>{
                console.log(error)
            })
        }
    },[image])
    const updatePhoto=(file)=>{
        setImage(file)
    
    }
    return(
        
        <div style={{maxWidth:"650px", margin:"0px auto"}}>
            <div style={{
                 margin:"18px 0px",borderBottom:"1px solid grey"
            }}>
            <div style={{
                display:"flex", justifyContent:"space-around"
            }}>
                <div>
                    <img alt="" style={{width:"160px", height:"160px", borderRadius:"80px"}} src={state ? state.pic : "loading..."}></img>
                    
                </div>
                <div>
                    <h4>{state?state.name:"loading"}</h4>
                    <h5>{state?state.email:"loading"}</h5>

                    <div style={{display:"flex",justifyContent:"space-between", width:"108%"}}>
                        <h6>{mypics.length} posts</h6>
                        <h6>{state ? state.followers.length :"0" } followers</h6>
                        <h6>{state ? state.following.length :"0" } following</h6>
                    </div>
                </div>
            </div>
           
             <div className="file-field input-field" style={{margin:"10px"}}>
                <div className="btn #64b5f6 blue darken-1">
                    <span>Update Profile Pic</span>
                    <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            </div>
            <div className="gallery">
                {
                    mypics.map(item=>{
                        return(
                            <img key={item._id} alt={item.title} className="gallery-pic" src={item.photo}/>
                        )
                    })
                }
                {/* <img alt="" className="gallery-pic" src="https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"/>
                <img alt="" className="gallery-pic" src="https://images.unsplash.com/photo-1542206395-9feb3edaa68d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"/>
                <img alt="" className="gallery-pic" src="https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjF8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"/>
                <img alt="" className="gallery-pic" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"/>
                <img alt="" className="gallery-pic" src="https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjR8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"/>
                <img alt="" className="gallery-pic" src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njh8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"/>
                <img alt="" className="gallery-pic" src="https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzJ8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"/>
                <img alt="" className="gallery-pic" src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODN8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"/>
                <img alt="" className="gallery-pic" src="https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODl8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"/>
                <img alt="" className="gallery-pic" src="https://images.unsplash.com/photo-1618835962148-cf177563c6c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTAyfHxwZXJzb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"/>
                <img alt="" className="gallery-pic" src="https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTU5fHxwZXJzb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"/>
                <img alt="" className="gallery-pic" src="https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"/> */}
            </div>


        </div>
    )
}

export default Profile