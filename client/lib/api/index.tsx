import { IEmailPasswordSiginIn } from "../type/IEmailPasswordSignIn"
import { IEmailPasswordSiginUp } from "../type/IEmailPasswordSignUp"
import { ITimezonesResponse } from "../type/api/response/timezones"
import { supabase } from "../utils"

export const getClockList = async () => {
    // Instead of the file system,
    // fetch post data from an external API endpoint
    try {
        let { data: timezones, error } = await supabase
        .from('timezones')
        .select('*')
        
    
        if (error) {
          throw error
        }
        return timezones
      } catch (error) {
        throw error
    }
}

export const deleteClockList = async () => {
    // Instead of the file system,
    // fetch post data from an external API endpoint
    const res = await fetch('http://127.0.0.1:8000/api/location/')
    if (!res.ok) {
        throw new Error('Network response was not ok')
    }
    return res.json()
}


export async function signUpNewUser(req: IEmailPasswordSiginUp) {
    const { email, password, username } = req
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
              emailRedirectTo: 'http://localhost:3000/',
              data: {
                username: username,
              }
            }
        })
        if (error) {
            throw error
        }
        return data
    } catch (error) {
        console.log(error);
        throw error
    }
    
  }
  
  export async function signInUser(req: IEmailPasswordSiginIn) {
    const { email, password } = req
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
              emailRedirectTo: 'http://localhost:3000/',
            }
        })
        if (error) {
            throw error
        }
        return data
    } catch (error) {
        console.log(error);
        throw error
    }
    
  }
  