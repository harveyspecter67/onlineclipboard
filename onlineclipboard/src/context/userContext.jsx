//defines auth context
import axios from 'axios';
import { createContext , useState , useEffect} from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }){
    const [user,setUser] = useState(null);

    useEffect(()=>{
        if(!user){
            axios.get('/profile')
            .then(({data}) => {
                if(data.user){
                    setUser(data.user);
                }
            })
            .catch(error=>{
                console.error("Error fetching user profile: ", error);
                setUser(null);
            });
        }
    },[user])//rerun when user state changes.

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}