let apiUrl = '';

if (process.env.NODE_ENV === 'development') {
  apiUrl = '/api';
} else {
  apiUrl = '';
}

export {
  apiUrl
}
