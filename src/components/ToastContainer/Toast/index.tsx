import { FiAlertCircle, FiXCircle, FiCheckCircle, FiInfo } from "react-icons/fi"
import { Container } from "./styles"

import { useToast } from '../../../hooks/ToastContext'

import { ToastMessage } from "../../../hooks/ToastContext"
import { useEffect } from "react"

interface ToastProps {
    message: ToastMessage
    style: object
}

const icons = {
    info: <FiInfo size={24} />,
    error: <FiAlertCircle size={24} />,
    success: <FiCheckCircle size={24} />,
}

const Toast = ({ message, style }: ToastProps) => {
    const { removeToast } = useToast()

    useEffect(() => {
        const timer = setTimeout(() => {
            removeToast(message.id)
        }, 3000)

        return () => {
            clearTimeout(timer)
        }
    }, [removeToast, message.id])

    return (
        <Container hasDescription={Number(!!message.description)} type={message.type} style={style}>
            {icons[message.type || 'info']}

            <div>
                <strong>{message.title}</strong>
                {message.description && <p>{message.description}</p>}
            </div>

            <button onClick={() => removeToast(message.id)}>
                <FiXCircle size={18} />
            </button>
        </Container>
    )
}

export default Toast