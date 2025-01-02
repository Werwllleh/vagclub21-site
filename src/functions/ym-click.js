export const ymClick = (e) => {
  const button = e.currentTarget;
  const attribute = button.getAttribute('data-ym');

  if (window.ym && attribute) {
    ym(process.env.NEXT_PUBLIC_YM_ID,'reachGoal',attribute)
  }

}
