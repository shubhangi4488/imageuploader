import React, {useState} from "react";
import "./imageuploader.css";

function Imageuploader() {

  const [loading, setLoading] = useState(false);
  const [image, setImage] =  useState("");       //this will hold url of the image

  const uploadImage = async e => {
    const files = e.target.files;   //to get the files which are selected
    const data = new FormData();

    //appends the actual file which is uploaded
    data.append('file', files[0]);  //file is located inside the files array
    data.append('upload_preset', 'geekyimages');
    setLoading(true);

    const res = await fetch("https://api.cloudinary.com/v1_1/djcxatgf7/image/upload",
    {
      method : 'POST',
      body : data
    })

    // inorder to get data
    const file = await res.json()
    console.log(file)

    setImage(file.secure_url)
    setLoading(false)
  }

  return(
    <div className="container"> 
     <div className="card">
     {
           loading?(
             <h3>Loading.........</h3>
           ):(
             <img src={image} style={{width:"300px"}} />
           )
         }
       <div className="icon">
         <i class="fa fa-upload"></i>
         
       </div>
       
       <div className="input">
         <input type="file" name="file" placeholder="Upload a file"
          onChange={uploadImage}
         />
         
       </div>
     </div>
   </div>
  )
}

export default Imageuploader;