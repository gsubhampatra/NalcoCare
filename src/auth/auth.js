import axios from "axios"

const registerUser = async (user) => {
    try {
      const response = await axios.post("https://nalco-care-api.vercel.app/api/v1/auth/register", { ...user });
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
      return error.message;
    }
  };
  


const loginUser = async(user) => {
    
try {
       const response = await axios.post("/api/auth/login", 
        {...user})
        console.log(response)
        return response
} catch (error) {
    console.log(error)
    return error.massage
}
}

export {loginUser,registerUser}

