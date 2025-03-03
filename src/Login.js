import { useState } from "react";

const Login = () => {
    const [username, setUsername]=useState('');
    const [password, setPassword]=useState('');
    const [message, setMessage]=useState('');
    const [jwtToken, setJwtToken]=useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username);
        console.log(password);
        try {
            const response = await fetch("http://localhost:8080/sign-in",{
                method:'POST',
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({username,password})
             });
             if (response.ok) {
                const data = await response.json();
                console.log(data);
                setJwtToken(data.jwtToken);
                setMessage("Login Successful.")
             } else {
                setMessage("Login Failed.")
             }
        } catch (err) {
            console.log(err);
            setMessage(err);
        }
    
    };
    return (
        <div>
            <h2> Login </h2> 
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input 
                        type="text"
                        required
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                            type="password"
                        required
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}>
                    </input>
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
            {jwtToken && <p>{jwtToken}</p>}
   
        </div>
    );
}
 
export default Login;