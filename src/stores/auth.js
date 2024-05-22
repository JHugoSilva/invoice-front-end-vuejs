import { defineStore } from "pinia";
import axiosClient from "@/axiosClient";

export const useAuthStore = defineStore('auth', {

    state: () => ({
        token: null,
        user: null,
        errors: ''
    }),
    getters: {
        authenticated() {
            return !!this.token && !!this.user
        },
        getToken() {
            return this.token
        },
        getUser() {
            return this.user
        },
        getErrors() {
            return this.errors
        }
    },
    actions: {

        setToken(token) {
            this.token = token
        },
        setUser(user) {
            this.user = user
        },
        async attempt(token) {
            this.setToken(token)
            try {
                await axiosClient.get("/user").then((response) => {
                    this.setUser(response.data.user);
                    return response
                }).catch((e) => {
                    this.setToken(null)
                    localStorage.removeItem('token')
                })
            } catch (e) {
                this.setToken(null)
                this.setUser(null)
                localStorage.removeItem('token')
                throw e
            }
        },
        async login(credentials) {
            try {
                const response = await axiosClient.post("/login", credentials.value)
                await this.attempt(response.data.token)
               
            } catch (e) {
                if (e.response.status === 422) {
                    this.errors = e.response.data.errors
                }

                if (e.response.status === 401) {
                    this.errors = {"email": e.response.data.msg}
                    console.log( e.response.data.msg);
                }
                // throw e
            }
        },
        async logout() {
             try {
                
                axiosClient.delete('/logout').then((response) => {
                    this.setToken(null)
                    this.setUser(null)
                    localStorage.removeItem('token')
                    return response
                }).catch((e) => {
                    console.log(e);
                    this.setToken(null)
                    this.setUser(null)
                    localStorage.removeItem('token')
                })

             } catch (error) {
                this.setToken(null)
                this.setUser(null)
                localStorage.removeItem('token')
                throw error
             }
        }
    }
})