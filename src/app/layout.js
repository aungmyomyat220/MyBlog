import './globals.css'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
})

// const store = configureStore({
//     reducer: {
//         love: loveReducer,
//         view: viewReducer,
//         post : postReducer
//     },
// });

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//         staleTime : 0,
//       refetchOnWindowFocus: false,
//     },
//   },
// })

// const ablyConfig = {
//     key: "HAJ3rA.-aJ6Gg:4AP_fA8YNIEL7OoSmMn1ZKfAb937_pDM5_7dhrON4KI",
//     clientId: "aungmyomyat874@gmail.com",
// };

// Initialize Ably Realtime
// const realtime = new Ably.Realtime.Promise(ablyConfig);
// realtime.auth.createTokenRequest({ clientId: ablyConfig.clientId }, (err, tokenRequest) => {
//     if (!err) {
//         console.log('Token Request:', tokenRequest);
//     } else {
//         console.error('Error creating token request:', err);
//     }
// });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <head>
          <title>My Blog</title>
        </head>
        <body className={roboto.className}>{children}</body>
    </html>

  )
}
