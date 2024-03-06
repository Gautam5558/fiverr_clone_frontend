import react from "react"
import "./app.scss"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/layout/Layout"
import Home from "./pages/home/Home"
import Gigs from "./pages/gigs/Gigs"
import Gig from "./pages/gig/Gig"
import MyGigs from "./pages/mygigs/MyGigs"
import Orders from "./pages/orders/Orders"
import Messages from "./pages/messages/Messages"
import Message from "./pages/message/Message"
import Add from "./pages/add/Add"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Pay from "./pages/pay/Pay"
import Success from "./pages/success/Success"
import BecomeSeller from "./pages/becomeaseller/BecomeSeller"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/gigs",
        element: <Gigs />
      },
      {
        path: "/gig/:gigId",
        element: <Gig />
      },
      {
        path: "/mygigs",
        element: <MyGigs />
      },
      {
        path: "/orders",
        element: <Orders />
      },
      {
        path: "/messages",
        element: <Messages />
      },
      {
        path: "/add",
        element: <Add />
      },
      {
        path: "/message/:conversationId",
        element: <Message />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/pay/:gigId",
        element: <Pay />
      },
      {
        path: "/success",
        element: <Success />
      },
      {
        path: "/becomeaseller",
        element: <BecomeSeller />
      }
    ]
  },

])


function App() {


  // Create a client
  const queryClient = new QueryClient()

  return (

    <div className="app">
      <QueryClientProvider client={queryClient} >
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>

  )
}

export default App
