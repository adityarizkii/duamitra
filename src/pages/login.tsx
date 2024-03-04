import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { CgSpinner } from "react-icons/cg";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { push } = useRouter();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const Form = e.target as HTMLFormElement;
    const formData = new FormData(Form);
    const formDataObject = Object.fromEntries(formData.entries()) as {
      username: string;
      password: string;
    };
    try {
      const res = await signIn("credentials", {
        username: formDataObject.username,
        password: formDataObject.password,
        redirect: false,
      });

      setIsLoading(false);
      if (res?.error) {
        setError("Username atau Password salah");
      } else {
        push("/");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Username atau Password salah");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="border border-white px-10 py-6">
        <h1 className="text-xl font-bold">Dua Mitra</h1>
        <form onSubmit={submitHandler} className="mt-4 flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="px-2 py-1 text-black"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="px-2 py-1 text-black"
            />
          </div>
          {error && <p className="text-sm">{error}</p>}
          <button
            type="submit"
            className="mt-3 flex justify-center bg-white py-2 font-medium text-black hover:bg-gray-600 hover:text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <CgSpinner className="animate-spin text-2xl" />
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
