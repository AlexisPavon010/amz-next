import '../styles/globals.css'
import { Provider as AuthProvider } from 'next-auth/client'
import { Provider } from 'react-redux'
import { store } from '.././App/store'


function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </AuthProvider>
  )
}

export default MyApp
