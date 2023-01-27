import {Button} from 'antd'
import React from 'react'
import {Outlet} from 'react-router-dom'
export default function Root() {
  return (
    <>
      <h1>vite test</h1>
      <Button href={`/login`}>Login</Button>
      <Button href={`/register`}>Rejestracja</Button>
      <br />
      <Outlet />
    </>
  )
}
