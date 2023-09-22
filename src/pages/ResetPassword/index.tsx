import { useRef, useCallback } from 'react'
import { Container, Content, Background, AnimationContainer } from './styles.ts'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'

import { useToast } from '../../hooks/ToastContext.tsx'
import { useAuth } from '../../hooks/AuthContext.tsx'

import getValidationErrors from '../../utils/getValidationErrors.ts'

import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'
import api from '../../services/api.ts'

interface ResetPasswordFormData {
    password: string
    password_confirmation: string
}

const ResetPassword = () => {
    const formRef = useRef<FormHandles>(null)

    const { addToast } = useToast()
    const navigate = useNavigate()                
    const { search } = useLocation()

    const handleSubmit = useCallback(async (data: ResetPasswordFormData) => {
        try {
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                password: Yup.string().min(6, 'No minímo 6 caracteres'),
                password_confirmation: Yup.string().oneOf([Yup.ref('password')], 'Confirmação incorreta.'),
            })

            await schema.validate(data, {
                abortEarly: false,
            })

            const { password, password_confirmation } = data
            const token = search.replace('?token=', '')

            if(!token) {
                throw new Error()
            }

            await api.post('/password/reset', {
                password,
                password_confirmation,
                token
            })

            navigate('/')
        } catch(err) {
            if(err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err as Yup.ValidationError)
                
                formRef.current?.setErrors(errors)
                return
            }
            
            addToast({
                type: 'error',
                title: 'Erro ao resetar senha',
                description: 'Ocorreu um erro ao resetar sua senha, tente novamente.'
            })
        }
    }, [addToast])

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="GoBarber" />

                    <Form onSubmit={handleSubmit} ref={formRef}>
                        <h1>Resetar senha</h1>

                        <Input name='password' icon={FiLock} type='password' placeholder='Nova senha' />

                        <Input name='password_confirmation' icon={FiLock} type='password' placeholder='Confirmação da senha' />

                        <Button type='submit'>Alterar senha</Button>
                    </Form>
                </AnimationContainer>
            </Content>

            <Background />
        </Container>
    )
}   

export default ResetPassword;