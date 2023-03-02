import React,{ useState } from "react";
export const Login =()=>{
    const [username,setuserName]=useState('');
    const [userid,setid]=useState(''); //updates email
    const[password,SetPass] = useState(''); 

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(username)
    }
    return(
        <>
        <form onSubmit={handleSubmit}>
            
            <label for ="username">userName</label>
            <input value = {username} onChange={(e)=>setuserName(e.target.value)} type = "username" placeholder="yourusername" />
            <label for ="userid">userName</label>
            <input value = {userid} onChange={(e)=>setid(e.target.value)} type = "userid" placeholder="youruserid" />
            <label for ="password">password</label>
            <input value = {password} onChange={(e)=>SetPass(e.target.value)} type = "username" placeholder="*******" />
            <button type ="submit">Log In</button>
        </form>
        <button> New User?</button>
        </>
    )
}