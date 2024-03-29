import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import axios from 'axios'

const Profile = () => {
   //context
   const [auth,setAuth] = useAuth()
   //STATE

   const[name,setName] = useState("")
   const[email,setEmail] = useState("")
   const[password,setPassword] = useState("")
   const[phone,setPhone] = useState("")
   const[address,setAddress] = useState("")

   //GET USER DATA
   useEffect(() => {
     const {email,name,phone,address} = auth?.user
     setName(name)
     setPhone(phone)
     setEmail(email)
     setAddress(address)
   },[auth?.user])

   //form function
   const handleSubmit = async (e) => {
      e.preventDefault()
     try{
       const {data} = await axios.put('/api/v1/auth/profile',{
         name,
         email,
         password,
         phone,
         address,
          
       })
      if(data?.error){
         toast.error(data?.error)
      }else{
         setAuth({...auth,user:data?.updatedUser})
         let ls = localStorage.getItem('auth')
         ls = JSON.parse(ls)
         ls.user = data.updatedUser;
         localStorage.setItem('auth',JSON.stringify(ls))
         toast.success('Profile Updated Successfully')
      }
     } catch (error){
       console.log(error);
       toast.error('Something went wrong')
     }
    }
 
  return (
     <Layout title={'Your Profile'}>
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
           <div className='col-md-3'>
            <UserMenu/>
           </div>
           <div className='col-md-9'>
           <div className="form-container ">
           <form onSubmit={handleSubmit}>
            <h4>USER PROFILE</h4>
  <div className="mb-3">
    
    <input type="text" className="form-control" id="exampleInputEmail1" placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)}   />
     
  </div>
  <div className="mb-3">
     
    <input type="email" className="form-control" id="exampleInputEmail1" placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)}  disabled  />
     
  </div>
  <div className="mb-3">
  
    <input type="password" className="form-control" id="exampleInputEmail1" placeholder='Enter Your Password' value={password} onChange={(e) => setPassword(e.target.value)}   />
     
  </div>
  <div className="mb-3">
     
    <input type="text" className="form-control" id="exampleInputEmail1" placeholder='Enter Your Phone' value={phone} onChange={(e) => setPhone(e.target.value)}   />
     
  </div>
  <div className="mb-3">
    
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder=' Enter Your Address' value={address} onChange={(e) => setAddress(e.target.value)}   />
  </div>
   
  <button type="submit" className="btn btn-primary">Update</button>
</form>
           </div>
            </div>
            </div>
        </div>
     </Layout>
  )
}

export default Profile
