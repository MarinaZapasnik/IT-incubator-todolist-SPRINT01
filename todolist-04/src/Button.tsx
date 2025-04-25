type Props = {
  title: string
  onClick?: () => void
  classes?: string
}

export const Button = ({ title, onClick, classes }: Props) => {
  return (
    <button 
      className={classes} 
      onClick={onClick}>
        {title}
    </button>
  )
}
