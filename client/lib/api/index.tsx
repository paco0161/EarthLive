import { IEmailPasswordSiginIn } from "../type/IEmailPasswordSignIn"
import { IEmailPasswordSiginUp } from "../type/IEmailPasswordSignUp"
import { IUpdateUserClockListRequest } from "../type/IUpdateUserClockListRequest"
import { supabase } from "../utils"

export const getUserClockList = async (userUuid: string) => {
    try {
        let { data: clocks, error } = await supabase
        .from('user_clocks')
        .select('clocks')
        .eq('uuid', userUuid)
    
        if (error) {
          throw error
        }

        return clocks
      } catch (error) {
        throw error
    }
}

export const getTimeZoneList = async () => {
  try {
      let { data: timezones, error } = await supabase
      .from('timezones')
      .select('*')

      console.log(timezones)
  
      if (error) {
        throw error
      }
      return timezones
    } catch (error) {
      throw error
  }
}

export const updateClockList = async (req: IUpdateUserClockListRequest) => {
  try {
    let { data: clocks, error } = await supabase
    .from('user_clocks')
    .update({
      clocks : req.clocks
    })
    .eq('uuid', req.userUUID)

    if (error) {
      throw error
    }

    return clocks
  } catch (error) {
    throw error
  }
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
  