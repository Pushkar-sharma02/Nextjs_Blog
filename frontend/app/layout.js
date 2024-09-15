// app/layout.js
import Header from '@/app/comp/Header';
import './globals.css'
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <footer>
          <p>© 2024 Blog Platform by Pushkar</p>
        </footer>
      </body>
    </html>
  );
}
