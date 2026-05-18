
type PropsType = {
    title: string,
    onClick?: () => void
    //onClick?: () => void            //? - опциональный параметр
}
export const Button = ({title, onClick}: PropsType) => {
    return (
        <button onClick={onClick}>
            {title}
        </button>
    )
}