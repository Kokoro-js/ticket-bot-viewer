export function ThemeSelector() {
  return (
    <select class='gradientselect' data-choose-theme=''>
      <option disabled value=''>
        Pick a theme
      </option>
      <option value=''>默认</option>
      <option value='light'>明亮</option>
      <option value='cupcake'>暖色</option>
      <option value='dark'>黑暗</option>
    </select>
  )
}
