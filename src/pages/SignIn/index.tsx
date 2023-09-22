import { useRef, useCallback } from 'react'
import { Container, Content, Background, AnimationContainer } from './styles.ts'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'

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
    const navigate = useNavigate()
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

            navigate('/dashboard')
        } catch(err) {
            if(err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err as Yup.ValidationError)
                
                formRef.current?.setErrors(errors)
                return
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
                <AnimationContainer>
                    <img src={logoImg} alt="GoBarber" />

                    <Form onSubmit={handleSubmit} ref={formRef}>
                        <h1>Faça seu logon</h1>

                        <Input name='email' icon={FiMail} placeholder='E-mail' />

                        <Input name='password' icon={FiLock} type='password' placeholder='Senha' />

                        <Button type='submit'>Entrar</Button>
                
                        <a href="forgot">Esqueci minha senha</a>
                    </Form>

                    <Link to="/signup">
                        <FiLogIn />
                        Criar conta
                    </Link>
                </AnimationContainer>
            </Content>

            <Background />
        </Container>
    )
}   

export default SignIn;