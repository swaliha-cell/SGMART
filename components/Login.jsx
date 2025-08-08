import React from 'react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Login = () => {
  const { setShowUserLogin, setUser, axios, navigate } = useAppContext()

  const [state, setState] = React.useState("login")
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post(`/api/user/${state}`, { name, email, password })
      if (data.success) {
        navigate('/')
        setUser(data.user)
        setShowUserLogin(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="w-[90%] max-w-md bg-white rounded-xl shadow-2xl px-8 py-10 space-y-5 border border-gray-100"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          <span className="text-primary">{state === "login" ? "Login" : "Register"}</span>
        </h2>

        {state === "register" && (
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
              className="p-3 rounded-md border border-gray-300 focus:outline-primary"
            />
          </div>
        )}

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="p-3 rounded-md border border-gray-300 focus:outline-primary"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="p-3 rounded-md border border-gray-300 focus:outline-primary"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-md bg-primary hover:bg-primary-dull text-white text-sm font-medium transition-all"
        >
          {state === "login" ? "Login" : "Create Account"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-2">
          {state === "login" ? (
            <>
              Don’t have an account?{" "}
              <span
                onClick={() => setState("register")}
                className="text-primary hover:underline cursor-pointer"
              >
                Register
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("login")}
                className="text-primary hover:underline cursor-pointer"
              >
                Login
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  )
}

export default Login

