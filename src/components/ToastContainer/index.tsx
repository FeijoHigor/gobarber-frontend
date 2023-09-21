import { ToastMessage } from "../../hooks/ToastContext"
import Toast from "./Toast"
import { Container } from "./styles"
import { useTransition, animated } from "@react-spring/web"

interface ToastContainerProps {
    messages: ToastMessage[]
}

const ToastContainer = ({ messages }: ToastContainerProps) => {
    const messagesWithTransitions = useTransition(
        messages, 
        {
            from: { right: '-120%', opacity: 0 },
            enter: { right: '0%', opacity: 1 },
            leave: { right: '-120%', opacity: 0 },
        }
    )

    return (
        <Container>
            {messagesWithTransitions((style, item) => (
                <Toast message={item} key={item.id} style={style} />
            ))}
        </Container>
    )
}

export default ToastContainer