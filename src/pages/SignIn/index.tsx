import { useRef, useCallback } from 'react'
import { Container, Content, Background } from './styles.ts'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import getValidationErrors from '../../utils/getValidationErrors.ts'

import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

const SignIn = () => {
    const formRef = useRef<FormHandles>(null)

    const handleSubmit = useCallback(async (data: object) => {
        try {
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().required('Senha obrigatória'),
            })

            await schema.validate(data, {
                abortEarly: false,
            })

        } catch(err) {
            const errors = getValidationErrors(err as Yup.ValidationError)
            
            formRef.current?.setErrors(errors)
        }
    }, [])

    return (
        <Container>
            <Content>
                <img src={logoImg} alt="GoBarber" />

                <Form onSubmit={handleSubmit} ref={formRef}>
                    <h1>Faça seu logon</h1>

                    <Input name='email' icon={FiMail} placeholder='E-mail' />

                    <Input name='password' icon={FiLock} type='password' placeholder='Senha' />

                    <Button type='submit'>Entrar</Button>
            
                    <a href="forgot">Esqueci minha senha</a>
                </Form>

                <a href="">
                    <FiLogIn />
                    Criar conta
                </a>
            </Content>

            <Background />
        </Container>
    )
}   

export default SignIn;