

type Props = {
  title: string
  onClick?: () => void   //так описывем что тип это функция, которая на данном этапе не принимает и возвращает void - пустоту
  //но намерена в дальнейшем возвращать и может пинимать
  disabled?: boolean
}

export const Button = ({ title, onClick, disabled }: Props) => {
  return (
    <button 
      disabled={disabled}
      onClick={onClick}>{title}
    </button>   //здесь у нас стандартный тег баттон, который имеет такое свойство онклик, и мы вешаем на это свойство наш самописный онклик для нашего самописного тега Баттон


  )
}
