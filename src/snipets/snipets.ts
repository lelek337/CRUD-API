export const idValid = (id: string): boolean => {
  // console.log('id.length:', id);
  const rezult =id && id.length === 36 ? true : false;
  return rezult;
}