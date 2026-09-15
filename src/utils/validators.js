export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validateAngkaPositif = (angka) => {
  return typeof angka === 'number' && angka > 0
}

export const validateSkor = (skor) => {
  return skor >= 1 && skor <= 10
}