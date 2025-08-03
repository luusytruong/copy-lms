"use client";

import { useState, ChangeEvent } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import Image from "next/image";
import Loading from "../common/Loading";
import nProgress from "nprogress";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useUser } from "@/context/UserContext";
import { Key } from "lucide-react";

const Login = () => {
  const router = useRouter();
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data?.user?.name) {
          setUser(data?.user);
          nProgress.start();
          router.push("/dashboard");
        } else toast.error(data?.message || "Unknown error");
      });
  };

  return (
    <div className="relative flex flex-1 max-h-svh">
      <Image
        src="/login.png"
        alt="Login"
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/55 backdrop-blur-[10px]" />
      <Loading isShow={loading} />
      <div className="relative overflow-y-auto w-full h-screen flex md:py-10">
        <form
          action="#"
          className="fixed md:relative inset-0 md:m-auto flex bg-white md:rounded-xl md:max-w-110 w-full md:h-fit overflow-y-auto"
          onSubmit={handleLogin}
        >
          <div className="flex flex-col justify-center gap-4 p-10 m-auto w-full">
            <div className="flex justify-center">
              <Image
                src="/ictu.png"
                alt="Logo"
                width={200}
                height={200}
                priority
                className="aspect-square object-contain !w-[100px]"
              />
            </div>
            <p className="text-2xl text-center font-bold mb-4">Đăng nhập</p>

            <Input
              text="Tài khoản"
              placeholder="Mã sinh viên hoặc email"
              required
              name="username"
              value={account.username}
              onChange={handleChange}
            />

            <Input
              text="Mật khẩu"
              type="password"
              placeholder="Nhập mật khẩu"
              required
              name="password"
              value={account.password}
              onChange={handleChange}
            />

            <div className="flex items-center justify-between">
              <label htmlFor="remember" className="flex items-center p-3">
                <input
                  type="checkbox"
                  name="remember"
                  id="remember"
                  checked
                  onChange={() => {}}
                  className="mr-3 !h-4.5 !w-4.5"
                />
                <span className="text-sm">Ghi nhớ đăng nhập</span>
              </label>
              <a
                target="_blank"
                href="https://dangkytinchi.ictu.edu.vn/kcntt/LostPassword.aspx"
                className="flex items-center gap-2 text-sm hover:text-[#0081ff]"
              >
                <Key size={16} />
                Quên mật khẩu?
              </a>
            </div>

            <Button
              text="Đăng nhập"
              iconClassName="animate-spin"
              textClassName="font-medium"
              className="bg-[#0081ff] text-white h-12 text-sm rounded-4xl justify-center"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
