    import { createSlice } from "@reduxjs/toolkit";
    

    const initialState = {
        currentuser:null,
        error:null,
        loadstate:false,
    }

    export const userSlice=createSlice({
        name:'user',
        initialState,
        reducers:{
            signInStart:(state)=>{
                
                state.loadstate=true;
            },
            signInSuccess:(state,action)=>{
                state.currentuser=action.payload
                state.loadstate=false
                state.error=null
                

            },
            SignInFail:(state,action)=>{
                state.error=action.payload
                state.loadstate=false
            },
            updateStart:(state)=>{
                state.loadstate=true;
            },
            updateSuccess:(state,action)=>{
                state.currentuser=action.payload
                state.loadstate=false
                state.error=null                                                       
            },
            updateFail:(state,action)=>{
                state.error=action.payload
                state.loadstate=false
            },
            deleteStart:(state)=>{
                state.loadstate=true
            },
            deleteSuccess:(state)=>{
                state.currentuser=null
                state.loadstate=false
                state.error=null
            },
            deleteFail:(state,action)=>{
                state.error=action.payload
                state.loadstate=false
            },
            signOutStart:(state)=>{
                state.loadstate=true
            },
            signOutSuccess:(state)=>{
                state.currentuser=null
                state.loadstate=false
                state.error=null
            },
            signOutFail:(state,action)=>{
                state.error=action.payload
                state.loadstate=false
            }




        }
    })
    
    export const {signInStart,signInSuccess,SignInFail,updateFail,updateStart,updateSuccess,deleteFail,deleteStart,deleteSuccess,signOutFail,signOutStart,signOutSuccess}=userSlice.actions
    export default userSlice.reducer