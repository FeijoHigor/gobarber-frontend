import { Container } from './styles'

interface TootipProps {
    title: string
    className?: string
}

const Tooltip = ({ title, className, children }: React.PropsWithChildren<TootipProps>) => {
    return (
        <Container className={className}>
            {children}
            <span>{title}</span>
        </Container>
    )
} 

export default Tooltip