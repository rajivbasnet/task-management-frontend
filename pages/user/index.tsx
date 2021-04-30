import { type } from "os"
import type { NextApiRequest, NextApiResponse } from 'next'
import React, {Component, SyntheticEvent, useState} from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import jwtDecode from "jwt-decode";
import { withIronSession } from "next-iron-session";
import axios from "axios";
import DashBoard from "../../components/dashboard";
import {userCookieOptions} from "../../config/helpers"

const User = ({email, role, tasks}: any)  => {

    const router = useRouter()
    useEffect(() => {
        if (role !== 'user') {
        router.push('/login')
        }
    }, [email, role])

    return ( 
    <div>
      <DashBoard email = {email} role = {role} tasks = {tasks}/>
    </div>
    )
}

export const getServerSideProps = withIronSession(
    async ({ req, res }) => {
      const user = req.session.get("user");
  
      if (!user) {
        res.statusCode = 404;
        res.end();
        return { props: {} };
      }

      const {email, role} = user;

      let tasks = {}
      
      await axios
                .get('http://localhost:3900/api/tasks/mytasks', 
                {
                    data: {assignedto: email}
                })
                .then(
                    async (res ) => {
                        if (res.status === 200) {
                            tasks = res.data
                        }
                    })
                .catch(
                    (err) => {
                        console.log("Sorry, an unexpected error occurred")
                    }
                )
      return {
        props: {email, role, tasks}
      };
    },
    userCookieOptions
  );
  
export default User;