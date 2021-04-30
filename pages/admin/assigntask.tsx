import { type } from "os"
import type { NextApiRequest, NextApiResponse } from 'next'
import React, {Component, SyntheticEvent, useState} from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import jwtDecode from "jwt-decode";
import { withIronSession } from "next-iron-session";
import axios from "axios";
import AssignTask from "../../components/assigntask";
import {userCookieOptions} from "../../config/helpers";

const AssignTasks = ({email, role, tasks}: any)  => {

    const router = useRouter()
    useEffect(() => {
        if (role !== 'admin') {
        router.push('/login')
        }
    }, [email, role])

    return ( 
    <div>
      <AssignTask email = {email} role = {role} tasks = {tasks}/>
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
      return {
        props: {email, role}
      };
    },
    userCookieOptions
  );

export default AssignTasks;
