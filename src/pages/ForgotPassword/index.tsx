import { useRef, useCallback, useState } from 'react'
import { Container, Content, Background, AnimationContainer } from './styles.ts'
import { FiLogIn, FiMail } from 'react-icons/fi'
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
import api from '../../services/api.ts'

interface ForgotPasswordFormData {
    email: string
}

const ForgotPassword = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const formRef = useRef<FormHandles>(null)

    const { addToast } = useToast()
    const navigate = useNavigate()                     

    const handleSubmit = useCallback(async (data: ForgotPasswordFormData) => {
        try {
            setLoading(true)
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido')
            })

            await schema.validate(data, {
                abortEarly: false,
            })

            await api.post('/password/forgot', {
                email: data.email
            })

            addToast({
                type:'success',
                title: 'E-mail de recuperação enviado!',
                description: 'Verifique seu e-mail para recuperar sua senha!'
            })
            //navigate('/dashboard')
        } catch(err) {
            if(err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err as Yup.ValidationError)
                
                formRef.current?.setErrors(errors)
                return
            }
            
            addToast({
                type: 'error',
                title: 'Erro na recuperação de senha',
                description: 'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente.'
            })
        } finally {
            setLoading(false)
        }
    }, [addToast])

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="GoBarber" />

                    <Form onSubmit={handleSubmit} ref={formRef}>
                        <h1>Recuperar senha</h1>

                        <Input name='email' icon={FiMail} placeholder='E-mail' />

                        <Button loading={loading} type='submit'>Recuperar</Button>
                    </Form>

                    <Link to="/signin">
                        <FiLogIn />
                        Voltar ao login
                    </Link>
                </AnimationContainer>
            </Content>

            <Background />
        </Container>
    )
}   

export default ForgotPassword;