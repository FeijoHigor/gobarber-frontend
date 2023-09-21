import { useRef, useCallback, useContext } from 'react'
import { Container, Content, Background } from './styles.ts'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import { useToast } from '../../hooks/ToastContext.tsx'
import { useAuth } from '../../hooks/AuthContext.tsx'

import getValidationErrors from '../../utils/getValidationErrors.ts'

import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

interface SignInFormData {
    email: string
    password: string
}

const SignIn = () => {
    const formRef = useRef<FormHandles>(null)

    const { user, signIn } = useAuth()
    const { addToast } = useToast()
    console.log(user)                                   

    const handleSubmit = useCallback(async (data: SignInFormData) => {
        try {
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().required('Senha obrigatória'),
            })

            await schema.validate(data, {
                abortEarly: false,
            })

            await signIn({
                email: data.email,
                password: data.password
            })
        } catch(err) {
            if(err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err as Yup.ValidationError)
                
                formRef.current?.setErrors(errors)
            }
            
            addToast({
                type: 'error',
                title: 'Erro na autenticação',
                description: 'Ocorreu um erro ao fazer login, cheque as credenciais.'
            })
        }
    }, [signIn, addToast])

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