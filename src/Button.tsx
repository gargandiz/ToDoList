type PropsType = {
    title: string,
    onClick?: () => void
    //onClick?: () => void            //? - опциональный параметр
    disabled?: boolean
}
export const Button = ({title, onClick, disabled}: PropsType) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
        >
            {title}
        </button>
    )
}