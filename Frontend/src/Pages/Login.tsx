import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { z } from "zod";

const zLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

type LoginData = z.infer<typeof zLoginSchema>;

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(zLoginSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log("submit");
    handleLogin(data);
  });

  const navigate = useNavigate();

  const handleLogin = async (data: LoginData) => {
    try {
      const response = await axios.post("http://localhost:3005/api/login", {
        email: data.email,
        password: data.password,
      });

      navigate("/");
    } catch (error) {
      console.log("error occured", error);
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center h-[100vh] text-white">
      <form
        onSubmit={onSubmit}
        className="flex flex-col bg-[#000000da] w-[300px] gap-2 p-5 rounded-2xl rounded-b-none items-center"
      >
        <h1 className="font-sans text-[20px] text-center">Login</h1>
        <input
          type="text"
          placeholder="Email"
          className="border-white pl-2 py-2 text-[14px] font-light border-b-[1px] w-full bg-transparent focus:outline-none"
          {...register("email")}
        />
        <input
          type="password"
          placeholder="Password"
          className="border-white pl-2 py-2 text-[14px] font-light border-b-[1px] w-full bg-transparent focus:outline-none"
          {...register("password")}
        />
        <button
          type="submit"
          className="bg-white text-black mt-5 w-[60%] font-extralight rounded-sm py-1"
        >
          Login
        </button>
      </form>
      <NavLink to="/register">
        <button className="bg-[#000000da] text-white font-normal mt-5 w-[300px] rounded-2xl rounded-t-none py-4">
          Register
        </button>
      </NavLink>
    </div>
  );
};

export default Login;
