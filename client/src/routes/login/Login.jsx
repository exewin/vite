import React, {useEffect, useState} from 'react'
import {Form, Input, Button, message} from 'antd'
import axios from 'axios'

const layout = {
  labelCol: {span: 6},
  wrapperCol: {span: 16}
}

const tailLayout = {
  wrapperCol: {offset: 6, span: 16}
}

export default function Login() {
  const onFinish = ({email, password}) => {
    console.log(email, password)
    getUser()
  }

  const onFinishFailed = errorInfo => {
    message.error('Formularz zawiera błędy!')
    console.log('Failed:', errorInfo)
  }

  const [data, setData] = useState('')
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users')
        console.log(response)
        setData(response.data)
      } catch (err) {
        console.log(err)
        setData(null)
      } finally {
        console.log('done')
      }
    }
    getData()
  }, [])

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users?filter[where][email]=${loginData.email}`)
      if (response.data.length === 0) return message.error('nie ma takiego usera')
      if (response.data[0].password != loginData.password) return message.error('złe hasło')
      return message.info('ok')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <h1>Logowanie</h1>
      <Form {...layout} name={'signin'} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item
          label={'E-mail'}
          name="email"
          onChange={e => setLoginData({...loginData, email: e.target.value})}
          value={loginData.email}
          rules={[{required: true, message: 'Podaj swój adres email!'}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={'Hasło'}
          name="password"
          onChange={e => setLoginData({...loginData, password: e.target.value})}
          value={loginData.password}
          rules={[{required: true, message: 'Podaj swoje hasło dostępu!'}]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type={'primary'} htmlType={'submit'}>
            Zaloguj
          </Button>
        </Form.Item>
      </Form>
      {JSON.stringify(data)}
    </>
  )
}
