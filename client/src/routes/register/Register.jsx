import React, {useState, useEffect} from 'react'
import {Form, Input, Button, message} from 'antd'
import axios from 'axios'

const layout = {
  labelCol: {span: 6},
  wrapperCol: {span: 16}
}

const tailLayout = {
  wrapperCol: {offset: 6, span: 16}
}

export default function Register() {
  const onFinish = () => {
    axios
      .post('http://localhost:3000/users', registerData)
      .then(function (response) {
        console.log(response)
        message.info('stworzono nowe konto')
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const onFinishFailed = errorInfo => {
    message.error('Formularz zawiera błędy!')
    console.log('Failed:', errorInfo)
  }

  const [registerData, setRegisterData] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    console.log(registerData)
  }, [registerData])

  return (
    <>
      <h1>Rejestrowanie</h1>
      <Form {...layout} name={'signin'} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item
          label={'E-mail'}
          name="email"
          onChange={e => setRegisterData({...registerData, email: e.target.value})}
          value={registerData.email}
          rules={[{required: true, message: 'Podaj swój adres email!'}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={'Hasło'}
          name="password"
          onChange={e => setRegisterData({...registerData, password: e.target.value})}
          value={registerData.password}
          rules={[{required: true, message: 'Podaj swoje hasło dostępu!'}]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type={'primary'} htmlType={'submit'}>
            Zarejestruj
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
