// API config
export const APIconfig = {
  baseUrl: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json'
  }
}

// Types of ingredients
export const ingredientsTypes = {
  'bun': 'Булки',
  'sauce': 'Соусы',
  'main': 'Начинки',
};

export const orderStatuses = {
  created: {
    text: 'Создан',
    color: '#fff',
  },
  pending: {
    text: 'Готовится',
    color: '#fff',
  },
  done: {
    text: 'Выполнен',
    color: '#0CC',
  },
  canceled: {
    text: 'Отменён',
    color: '#CE3D2A',
  },
}
