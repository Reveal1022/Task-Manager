import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const zRegisterSchema = z.object({
  username: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(4),
});

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(zRegisterSchema),
  });

  type registerData = z.infer<typeof zRegisterSchema>;

  const navigate = useNavigate();

  const handleRegister = async (data: registerData) => {
    console.log(data);
    try {
      console.log("calling axio");
      const response = await axios.post("http://localhost:3005/api/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.log("couldnot register ", error);
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center h-[100vh] text-white">
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="flex flex-col bg-[#000000da] w-[300px] gap-2 p-5 rounded-2xl items-center"
      >
        <h1 className="font-sans text-[20px] text-center">Register</h1>
        <input
          type="text"
          placeholder="Username"
          className="border-white pl-2 py-2 text-[14px] font-light border-b-[1px] w-full bg-transparent focus:outline-none"
          {...register("username")}
        />
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
          className="bg-white text-black mt-10 w-[60%] font-extralight rounded-sm py-1"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
